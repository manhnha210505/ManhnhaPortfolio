# System Architecture

## High-level shape
```
Visitor
  │
  ▼
Cloudflare (DNS, WAF, CDN, SSL termination, HTTP/3, Brotli)
  │
  ▼
Vercel (Next.js App Router — SSR/SSG hybrid)
  │
  ├── Static/ISR content (marketing sections, copy, layout)
  │
  ├── Supabase (Postgres + RLS + Edge Functions)
  │     ├── projects table  → Projects section content
  │     └── contacts table  → Contact form submissions
  │
  └── Cloudflare R2 (object storage)
        └── images, thumbnails, certificates, downloadables
```

## Rendering strategy
- Prefer **static generation / ISR** for content that changes rarely (About, Skills, Hero copy) — best performance, best SEO.
- **Server-side or client fetch** only where content is genuinely dynamic (Projects list, any live-metrics signature element).
- Avoid client-side waterfalls: fetch Supabase content at the server/edge where possible, hydrate client components only for interactivity.

## Security boundaries
- Supabase RLS is the source of truth for what's readable/writable — never rely on the client to enforce access rules.
- No Supabase service-role key ever ships to the client; only the anon key with RLS-scoped policies.
- Contact form writes go through an Edge Function or server action, not a direct client insert, to allow rate limiting / spam checks.

## Where this can change
This document reflects `ADR-0002` (Frontend Architecture) and `ADR-0003` (Backend Architecture). If those ADRs change, update this file in the same PR.
