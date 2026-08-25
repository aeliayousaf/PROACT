"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { site } from "../../../content/site";

type Msg = { role: "user" | "assistant"; content: string };

function SpeechIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M12 3C7.03 3 3 6.58 3 11c0 2.4 1.19 4.56 3.11 6.06L5 21l4.19-1.24C10.4 19.89 11.17 20 12 20c4.97 0 9-3.58 9-8s-4.03-8-9-8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 10.5h7M8.5 13.5h4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChatWidget() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: `Hello — I’m the ${site.name} AI assistant. I can share general information about our practice areas. I don’t give legal advice, and chatting here doesn’t create a professional relationship. Please don’t share confidential details.`,
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) listRef.current?.lastElementChild?.scrollIntoView({ block: "end" });
  }, [messages, open]);

  async function send(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Assistant unavailable.");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream.");

      const decoder = new TextDecoder();
      let assistant = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistant += decoder.decode(value, { stream: true });
        const snapshot = assistant;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: snapshot };
          return copy;
        });
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or contact the firm.",
      );
      setMessages((prev) => {
        if (prev.at(-1)?.role === "assistant" && prev.at(-1)?.content === "") {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setMessages([
      {
        role: "assistant",
        content: `Conversation reset. I’m an AI assistant for ${site.name}. I share general firm information only — not legal advice.`,
      },
    ]);
    setError("");
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <section
          id={panelId}
          aria-label="AI assistant chat"
          className="flex h-[min(32rem,70vh)] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-ink shadow-2xl"
        >
          <header className="flex items-start justify-between gap-3 border-b border-line bg-surface px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-warm-white">
                AI assistant
              </p>
              <p className="text-xs text-text-muted">
                General information only — not legal advice
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-full border border-line px-2 py-1 text-[0.65rem] tracking-wide text-text-muted uppercase"
                onClick={reset}
              >
                Reset
              </button>
              <button
                type="button"
                className="rounded-full border border-line px-2 py-1 text-[0.65rem] tracking-wide text-text-muted uppercase"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </header>

          <div
            ref={listRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
            aria-live="polite"
          >
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`max-w-[90%] rounded-xl px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-navy text-warm-white"
                    : "bg-surface-elevated text-text-muted"
                }`}
              >
                {msg.content || (loading ? "…" : "")}
              </div>
            ))}
            {error && (
              <p className="text-sm text-[var(--danger)]" role="alert">
                {error}
              </p>
            )}
          </div>

          <form onSubmit={send} className="border-t border-line p-3">
            <label htmlFor={`${panelId}-input`} className="sr-only">
              Message the AI assistant
            </label>
            <div className="flex gap-2">
              <input
                id={`${panelId}-input`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our practice areas…"
                className="min-h-11 flex-1 rounded-full border border-line bg-surface px-4 text-sm text-warm-white"
                disabled={loading}
              />
              <button
                type="submit"
                className="btn btn-primary !min-h-11 !px-4"
                disabled={loading || !input.trim()}
              >
                Send
              </button>
            </div>
          </form>
        </section>
      )}

      <button
        type="button"
        className="btn btn-primary !inline-flex !h-14 !w-14 !min-h-0 !items-center !justify-center !rounded-full !p-0 shadow-lg"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close chat" : "Ask AI assistant"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <CloseIcon /> : <SpeechIcon />}
      </button>
    </div>
  );
}
