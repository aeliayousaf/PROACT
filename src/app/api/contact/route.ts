import { NextResponse } from "next/server";
import { Resend } from "resend";
import { practiceAreas } from "../../../../content/practice-areas";
import { site } from "../../../../content/site";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`contact:${ip}`, 5, 15 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      {
        error: "Too many requests. Please try again later.",
        retryAfterSec: limited.retryAfterSec,
      },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fields = parsed.error.flatten().fieldErrors;
    const firstMessage =
      Object.values(fields).flat().find(Boolean) ?? "Validation failed.";
    return NextResponse.json(
      {
        error: firstMessage,
        fields,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const areaLabel =
    practiceAreas.find((a) => a.slug === data.practiceArea)?.title ??
    data.practiceArea;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "ProAct Website <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json(
      {
        error:
          "The contact form is temporarily unavailable. Please email or call the firm directly.",
      },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: `Website inquiry — ${data.name} — ${areaLabel}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Preferred contact: ${data.preferredContact}`,
        `Practice area: ${areaLabel}`,
        "",
        "Message:",
        data.message,
        "",
        "Note: Website submission — no paralegal-client relationship created.",
      ].join("\n"),
    });
  } catch (error) {
    console.error("Contact email failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      {
        error:
          "We could not send your message. Please try again or contact the firm directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
