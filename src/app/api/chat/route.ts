import OpenAI from "openai";
import { answerFromSiteKnowledge, streamTextResponse } from "@/lib/ai/local-chat";
import { buildKnowledgeContext, chatSystemPrompt } from "@/lib/ai/system-prompt";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { chatMessageSchema } from "@/lib/validation";

export const runtime = "nodejs";

function plainStreamResponse(stream: ReadableStream<Uint8Array>) {
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Chat-Mode": "local",
    },
  });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`chat:${ip}`, 20, 60 * 60 * 1000);
  if (!limited.ok) {
    return new Response(
      JSON.stringify({
        error: "Too many chat requests. Please try again later.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(limited.retryAfterSec),
        },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const parsed = chatMessageSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: "Invalid chat payload." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim();

  // Fallback: answer from published site content when OpenAI is not configured.
  if (!apiKey) {
    const reply = answerFromSiteKnowledge(parsed.data.messages);
    return plainStreamResponse(streamTextResponse(reply));
  }

  const openai = new OpenAI({ apiKey });

  try {
    const stream = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      stream: true,
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: `${chatSystemPrompt}\n\n${buildKnowledgeContext()}`,
        },
        ...parsed.data.messages,
      ],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch {
          controller.error(new Error("Stream failed"));
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Chat-Mode": "openai",
      },
    });
  } catch (error) {
    console.error("Chat failed", error instanceof Error ? error.message : "unknown");
    // If OpenAI errors, fall back to the local site guide instead of failing hard.
    const reply = answerFromSiteKnowledge(parsed.data.messages);
    return plainStreamResponse(streamTextResponse(reply));
  }
}
