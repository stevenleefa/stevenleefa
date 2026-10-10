import { RESUME_TEXT } from "@/lib/resume";

// Provider config — all overridable via .env.local. Defaults point at
// OpenRouter's free tier (https://openrouter.ai/keys — no credit card needed).
// The API below is the OpenAI chat-completions format, which most providers
// speak (OpenRouter, Groq, Together, Ollama, vLLM...), so switching providers
// later is just a config change, not a rewrite.
const BASE_URL = process.env.LLM_BASE_URL ?? "https://openrouter.ai/api/v1";
const API_KEY = process.env.LLM_API_KEY ?? process.env.OPENROUTER_API_KEY;

// Primary model first, fallbacks after. Free model IDs get retired without
// warning, so a fallback chain keeps the app alive when one disappears.
// "openrouter/free" auto-routes to whatever free model is healthiest.
const MODELS = (process.env.LLM_MODEL ?? "openrouter/free,meta-llama/llama-3.3-70b-instruct:free")
  .split(",")
  .map((m) => m.trim())
  .filter(Boolean);

const SYSTEM_PROMPT = `You are a friendly assistant that answers questions about Steven Lee's professional background.

RULES:
- Answer ONLY from the resume below. Do not use outside knowledge about him.
- If the answer isn't in the resume, say so plainly (e.g. "That's not in his resume — his email is on the page if you want to ask him directly").
- Keep answers short and conversational, like a person texting. Use bullet points only when listing skills or jobs.
- Never invent job titles, dates, or numbers. When in doubt, quote the resume.

RESUME:
${RESUME_TEXT}`;

type IncomingMessage = { role: string; content: string };

// A model is worth retrying with a *different* model when the failure is about
// the model or capacity — not when our request itself is bad.
function isFallbackable(status: number, body: string) {
  return (
    status === 404 || // model retired / unknown
    status === 429 || // rate limited (free tiers queue aggressively)
    status >= 500 || // provider hiccup
    /model_not_found|no endpoints|overloaded/i.test(body)
  );
}

async function streamChatCompletion(
  model: string,
  messages: { role: "user" | "assistant"; content: string }[],
  onText: (text: string) => void
): Promise<void> {
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
      "HTTP-Referer": "http://localhost:3000", // OpenRouter asks for an app URL
      "X-Title": "Ask My Resume", // shown on OpenRouter's dashboard
    },
    body: JSON.stringify({
      model,
      stream: true,
      temperature: 0.2, // low = factual, consistent answers (see Week 1 notes)
      max_tokens: 1024,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    }),
  });

  if (!res.ok || !res.body) {
    const body = await res.text().catch(() => "");
    const err = new Error(`LLM request failed (${res.status}): ${body.slice(0, 200)}`);
    (err as Error & { status?: number }).status = res.status;
    (err as Error & { body?: string }).body = body;
    throw err;
  }

  // Parse Server-Sent Events: chunks look like `data: {"choices":[{"delta":{"content":"hi"}}]}`
  // and the stream ends with `data: [DONE]`.
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";
    for (const event of events) {
      for (const line of event.split("\n")) {
        const data = line.replace(/^data:\s*/, "").trim();
        if (!data || data === "[DONE]") continue;
        try {
          const json = JSON.parse(data);
          const text: string | undefined = json.choices?.[0]?.delta?.content;
          if (text) onText(text);
        } catch {
          // A truncated JSON chunk — ignore, the rest will arrive next read.
        }
      }
    }
  }
}

export async function POST(request: Request) {
  if (!API_KEY) {
    return Response.json(
      {
        error:
          "Server is missing an LLM API key. Get a free one at https://openrouter.ai/keys, " +
          "put it in .env.local as OPENROUTER_API_KEY, and restart.",
      },
      { status: 500 }
    );
  }

  let body: { messages?: IncomingMessage[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be JSON." }, { status: 400 });
  }

  // Only pass through well-formed user/assistant messages. Never let the client
  // smuggle in its own system prompt — the system prompt is ours.
  const messages = (body.messages ?? []).filter(
    (m): m is { role: "user" | "assistant"; content: string } =>
      (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
  );
  if (messages.length === 0) {
    return Response.json({ error: "No messages provided." }, { status: 400 });
  }

  // Newline-delimited JSON to the browser: {"type":"text","text":"..."} chunks,
  // then {"type":"done"}. Errors arrive as {"type":"error","message":"..."} so the
  // client can always parse them, unlike a raw text stream.
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: unknown) =>
        controller.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));
      let lastError: unknown = null;
      for (const model of MODELS) {
        try {
          await streamChatCompletion(model, messages, (text) => send({ type: "text", text }));
          send({ type: "done", model });
          controller.close();
          return;
        } catch (err) {
          const status = (err as Error & { status?: number }).status ?? 0;
          const errBody = (err as Error & { body?: string }).body ?? "";
          lastError = err;
          if (!isFallbackable(status, errBody)) break; // our bug — don't try more models
          // Otherwise: model retired, rate-limited, or provider hiccup — try next.
        }
      }
      send({
        type: "error",
        message: lastError instanceof Error ? lastError.message : "Unknown error",
      });
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8" },
  });
}
