# Hi, I'm Steven — Full-Stack Developer

I build AI-powered websites for small and large businesses alike — websites that don't just look good, they answer customers, take bookings, and turn visits into enquiries.

Open to roles and client work building AI-powered websites.

## What I build

- AI-powered business websites with grounded chatbots that answer only from the business's own services, prices, and hours — no guessing, no hallucinating.
- Booking and lead forms wired to real back ends, so enquiries don't get lost.
- Fast, modern front ends and API routes with Next.js, React, and TypeScript, deployed on Vercel.
- Evals that test the chatbot against real questions, including out-of-scope ones it should refuse.

## Featured projects

- **Lumen Hair Studio** — AI chatbot website for a salon. Live demo: https://ai-chatbot-site-tawny.vercel.app/ · Code: https://github.com/stevenleefa/ai-chatbot-site
- **SwiftFix Plumbing** — The same reusable AI website pattern, rebuilt for a plumbing business. Code: https://github.com/stevenleefa/ai-chatbot-site-plumbing
- **Ask My Resume** — A grounded chatbot that answers questions about my background from my actual resume. See below.

## Stack

Next.js (App Router) · React · TypeScript · Git · GitHub · Vercel · OpenAI-compatible LLM APIs

## Currently focused on

AI product engineering: grounding, retrieval, prompt design, streaming, and evals — turning AI demos into production features businesses can rely on.

---

## Ask My Resume

Week 1 project from my AI product engineering plan: a chatbot that answers questions
about my professional background, grounded in my actual resume.

**How it works:** the resume text (`lib/resume.ts`) is pasted into the system prompt,
so the model answers from real facts instead of hallucinating. Responses stream
token-by-token to the chat UI. Temperature is set low (0.2) for factual, consistent answers.

**Stack:** Next.js (App Router), TypeScript, and any OpenAI-compatible LLM API —
defaults to OpenRouter's free tier, so it costs nothing to run.

## Run it (free)

1. Get a free API key at https://openrouter.ai/keys — no credit card required
   (free tier: ~20 req/min, ~50 req/day — plenty for learning).
2. Copy `.env.local.example` to `.env.local` and paste the key as `OPENROUTER_API_KEY`.
3. `npm install`
4. `npm run dev`
5. Open http://localhost:3000

## What I learned (Week 1)

- **Tokens** are the unit of everything: cost, speed, and context all trace back to them.
- **Context window** = the model's working memory. "RAG" just means retrieving the
  right documents and stuffing them into it before asking the question.
- **Temperature** controls randomness: ~0 for facts, higher for creativity.
- **System prompt** = the job description; **user message** = the task. Getting the
  system prompt right is most of "prompt engineering."
- **Streaming** is a UX trick (tokens arrive as generated) that makes answers feel
  2–3x faster.
- The API speaks the **OpenAI chat-completions format** (the lingua franca of LLM APIs),
  so the provider is just config: OpenRouter today, Groq/Together/Ollama tomorrow.
- **Fallback chain:** free model IDs get retired without warning, so the route tries
  each model in `LLM_MODEL` in order, falling through on 404s, rate limits, and
  provider hiccups. A real production pattern, not just a demo trick.
- Grounding rule: the API route validates messages and never lets the client
  override the system prompt.

## Deploy

Deploys cleanly to Vercel — just add `OPENROUTER_API_KEY` (and optionally
`LLM_MODEL`) as environment variables.
