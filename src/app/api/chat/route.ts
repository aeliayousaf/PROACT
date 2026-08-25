import OpenAI from "openai";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { buildKnowledgeContext, chatSystemPrompt } from "@/lib/ai/system-prompt";
import { chatMessageSchema } from "@/lib/validation";

export const runtime = "nodejs";

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

  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "The AI assistant is offline. Please use the contact form, phone, or email.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
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

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
      },
    });
  } catch (error) {
    console.error("Chat failed", error instanceof Error ? error.message : "unknown");
    return new Response(
      JSON.stringify({
        error:
          "The AI assistant could not respond. Please try again or contact the firm.",
      }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }
}
