# ADR-0007: Contact Form Spam Protection — Layered Defense

## Status
Accepted (locked via `speckit-clarify`, spec.md session 2026-07-31)

## Context
The contact form performs a public, unauthenticated `INSERT` into the Supabase `contacts` table. Left unprotected, this is an easy target for bot-submitted junk data. `foundation/ProductRequirements.md` and `ProjectVision.md`'s originating brief mentioned "spam protection" without specifying a mechanism, which `/clarify` correctly flagged as a gap.

## Decision
Implement three layers together, all required before a submission is persisted:
1. **Honeypot field** — a hidden form field real users never see/fill; any submission with it populated is silently rejected (or discarded without a Supabase write).
2. **Server-side rate limiting (Upstash Redis)** — per-IP submission cap over a rolling window, enforced in the server action/Edge Function. Uses Upstash Redis for persistent state across Vercel serverless functions/regions, avoiding the unreliability of purely in-memory limiters.
3. **Cloudflare Turnstile** — challenge/verification widget on the form, checked server-side before insert.

## Why layered, and why Turnstile specifically
- A single layer (honeypot alone, or rate-limiting alone) is trivially defeated by slightly more sophisticated bots; layering costs little extra engineering effort for meaningfully better coverage.
- Turnstile was chosen over reCAPTCHA specifically because **Cloudflare is already the project's DNS/CDN/WAF provider** (`architecture/TechStack.md`) — this is not a new third-party vendor relationship, just an additional Cloudflare product already covered by the existing account, keeping the "avoid unnecessary dependencies" principle (`governance/AgentRules.md`) intact.

## Consequences
- Requires a Cloudflare Turnstile site key/secret configured for the domain, plus Upstash Redis credentials (`UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`) — add to environment variable setup during `/plan` and deployment docs (`engineering/Deployment.md`).
- Must handle graceful degradation: if Turnstile fails to load/verify (network issue, ad-blocker, etc.), the form must not become unusable — surface the direct email address as a fallback (see `playbooks/ContactSection.md`, and the corresponding edge case now captured in `spec.md`).
- Honeypot and rate-limit logic live server-side (Edge Function or server action) — never trust client-side-only spam checks.
