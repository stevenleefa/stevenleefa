"use client";

import { useRef, useState } from "react";
import styles from "./page.module.css";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What did Steven do at NELSON?",
  "What's his experience with Next.js?",
  "Has he worked with AI tools?",
];

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    const next: ChatMessage[] = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    setLoading(true);

    // Empty assistant message that we fill in as tokens stream in.
    setMessages([...next, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok || !res.body) throw new Error(`Request failed (${res.status})`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let answer = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line);
          if (event.type === "text") {
            answer += event.text;
            const content = answer;
            setMessages((prev) => {
              const copy = [...prev];
              copy[copy.length - 1] = { role: "assistant", content };
              return copy;
            });
          } else if (event.type === "error") {
            throw new Error(event.message);
          }
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "assistant", content: `⚠️ ${message}` };
        return copy;
      });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.chat}>
        <header className={styles.header}>
          <h1>Ask about Steven Lee</h1>
          <p>A tiny RAG-style demo: answers come from his resume, streamed token by token.</p>
        </header>

        <div className={styles.messages}>
          {messages.length === 0 && (
            <div className={styles.empty}>
              <p>Try one of these:</p>
              <div className={styles.suggestions}>
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} disabled={loading}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`${styles.bubble} ${m.role === "user" ? styles.user : styles.assistant}`}
            >
              {m.content || <span className={styles.typing}>…</span>}
            </div>
          ))}
        </div>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Steven's background…"
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            {loading ? "…" : "Send"}
          </button>
        </form>
      </div>
    </main>
  );
}
