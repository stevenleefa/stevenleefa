# Full-Stack Engineer

I'm a full-stack engineer building AI-powered websites for small and large businesses alike — a hybrid of engineering and AI product work. My sites don't just look good: they answer customers, take bookings, and turn visits into enquiries, and enquiries into profits.

Open to roles and client work building AI-powered websites — and to purist full-stack or front-end work that isn't heavily dependent on AI.

## What I build

- AI-powered business websites with grounded chatbots that answer only from the business's own services, prices, and hours — no guessing, no hallucinating.
- Chat that does things, not just answers: it checks real availability and books appointments through the conversation, with server-side validation — and a free mode that needs no API key.
- Booking and lead forms that save to Supabase, with an owner leads list (statuses, repeat-customer counts), CSV export, and duplicate protection — proven end to end on a live demo.
- Owner areas with real auth (invite-only staff, admin/staff roles): dashboards, customers, appointments, employees, orders — plus customer self-service, so customers sign up, see their own bookings and orders, and can't reach owner pages even by typing the URL.
- A sample-data Test Admin Mode, so recruiters can explore the full owner area without touching real customer data or making real changes.
- Shops with real payments (Stripe Checkout), product photos, deals with scannable QR coupons, and moderated customer reviews.
- Fast, modern front ends and API routes with Next.js, React, and TypeScript, deployed on Vercel.
- Evals that test the chatbot against real questions, including out-of-scope ones it should refuse.

## Featured Project

- **Lumen Hair Studio** — AI chatbot website for a salon: grounded chat that books, Supabase leads, owner dashboard, invite-only auth, customer accounts, Test Admin Mode, shop with Stripe and QR coupons, reviews, dark mode, CI/CD, Docker, Kubernetes, and n8n automations. Details below. Live demo: https://ai-chatbot-site-tawny.vercel.app/ · Code: https://github.com/stevenleefa/ai-chatbot-site

## Stack

Next.js (App Router) · React · TypeScript · Supabase (Postgres, Auth) · Stripe · Jest + React Testing Library · GitHub Actions · Docker · Kubernetes (kind) · Terraform · n8n · Git · GitHub · Vercel · Jira (Scrum) · OpenAI-compatible LLM APIs

## Currently focused on

AI product engineering and AI workflow/automation: grounding, retrieval, tool use, prompt management, evals, and observability — turning AI demos into production features businesses can rely on.

## Recently shipped — November 2026

- **AI engineering:** chat books through tools with server-side validation (11 eval cases, versioned prompt `lumen-chat-v1`); free deterministic mode and OpenAI function-calling mode share the same tools.
- **Backend:** customer accounts with a `customer` role in Supabase Auth — own bookings/orders only, owner routes blocked by middleware and re-checked on every page and API route; password strength checker on sign-up and password reset.
- **DevOps / CI/CD:** GitHub Actions CI runs build, tests, and evals on every push/PR to `main` and `dev`; `main` is branch-protected (PR + 1 approval + CI green); GitFlow-lite with Jira Scrum, Sprint 1; live on Vercel since 12 Nov 2026.
- **Product:** hamburger menu with search, 4 locations, deals with working QR coupons, product photos, dark mode with per-theme header colours, and full keyboard navigation (WCAG 2.1 AA).

---

## Lumen Hair Studio — what it does

A complete AI-powered website for a salon, built in the open. The code is the full project; the live demo runs the public site.

**AI chat that books**
- Answers only from the salon's own services, prices, and hours; refuses out-of-scope questions instead of guessing.
- Checks the diary for free slots per stylist and books through the conversation — tools with server-side validation (known service, reachable contact, open day, free slot).
- Works free with no API key (deterministic tools) or with OpenAI function calling; prompts are versioned code, and 11 eval cases cover bookings, availability, and refusals.

**Leads and bookings**
- Booking and lead forms save to Supabase, with an owner list (statuses, repeat-customer counts), CSV export, and 60-second duplicate protection.

**Owner area (invite-only auth, admin/staff roles)**
- Dashboard: sales, forecast, P&L, payroll, taxes, inventory, payables, receivables — every figure computed from one sample dataset (1,377 sales, $72,070), so totals tie out.
- Customers with visit history, procedures, and due-date nudges; appointments calendar with month/week/day views and stylist filters; employees with per-person sales and pay.
- Customer accounts: customers sign up and see only their own bookings (email-matched) and orders; a `customer` role is enforced in middleware and on every owner page and API route.
- Test Admin Mode: a signed-out visitor can explore the owner area with sample data only (9 leads, 4 orders, 4 profiles, 3 pending reviews) — no real data shown, no real mutations allowed.

**Shop and reviews**
- Full product range with photos, cart, and Stripe Checkout (test mode) with an owner orders page; deals with QR coupons that open the offer on a phone.
- Review pop-ups, a star-rating form, and admin moderation — new reviews wait for approval.

**Engineering**
- 196 Jest tests in 25 suites; GitHub Actions CI runs build, tests, and the eval on every push/PR to `main` and `dev`; Docker and docker-compose; Kubernetes on kind with Terraform; n8n automations draft personalised lead follow-ups, appointment reminders, and review thank-yous — drafts for owner review, nothing sent automatically.
- Security hardened and pen-tested (19/19 probes; an open redirect found and fixed); WCAG 2.1 AA with proper keyboard navigation; dark mode.
