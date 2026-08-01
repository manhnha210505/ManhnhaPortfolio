# Tech Stack

Full rationale for each choice lives in `docs/decisions/ADR-0001` through `ADR-0005`. This file is the authoritative current-state summary — keep it in sync with the ADRs.

## AI-assisted development tooling
- **Antigravity IDE** — primary agentic dev environment.
- **github/spec-kit** — constitution → spec → plan → tasks → implement workflow (see `governance/SpecKitRules.md`).
- **Leonxlnx/taste-skill** — visual/interaction/motion quality layer, applied on top of spec-kit output, never in place of it.
- ESLint + Prettier, Husky + lint-staged, GitHub Actions (CI), Dependabot **or** Renovate (pick one — running both is redundant and will fight over the same PRs), Playwright (E2E testing), Vitest (unit/component testing — see `docs/decisions/ADR-0008-Unit-Testing-Vitest.md`).

## Frontend
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- shadcn/ui
- **`motion`** — the unified Motion library (successor/merge of the old Framer Motion + Motion One packages). Use the single `motion` npm package; do not install `framer-motion` and `motion` side by side — they are the same lineage and will cause duplicate bundle weight and API drift.
- React Three Fiber — **only if** the chosen signature element (see `foundation/ProductRequirements.md` open decisions) requires 3D. Do not add as a baseline dependency.

## Backend — Supabase
- PostgreSQL database — `profile`, `education`, `skills`, `projects`, `certificates`, `activities`, `awards`, `contacts`. Full schema in `architecture/schema.sql` / `architecture/DatabaseSchema.md`.
- Row Level Security (RLS) on all tables — public read-only on content tables, insert-only on `contacts`, no public write access anywhere else.
- **Auth is NOT used for a site admin flow.** Content is edited directly via the Supabase Dashboard Table Editor (owner's own Supabase login), not through a custom authenticated route in the app. See `docs/decisions/ADR-0006-Content-Storage-Strategy.md`.
- Edge Functions where server-side logic is needed (e.g. contact form spam checks)

## Infrastructure
- **Deployment**: Vercel (automatic preview deployments, production deployment, CI-friendly config)
- **DNS / CDN / Security**: Cloudflare (DNS, CDN, SSL, HTTP/3, Brotli, edge caching, WAF, DDoS protection, security headers)
  - ⚠️ **Caveat**: when Cloudflare proxies (orange-clouds) a domain in front of Vercel, SSL mode must be set to **Full (strict)** in Cloudflare, otherwise redirect loops or certificate errors occur. Document this explicitly in `engineering/Deployment.md`.
- **Asset storage**: Cloudflare R2 — images, portfolio thumbnails, blog images, certificates, static downloadables. Serve modern formats (AVIF/WebP) where supported.
