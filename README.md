# Ask My Resume

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
