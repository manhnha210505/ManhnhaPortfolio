# Research: Portfolio Site — Phase 0

**Branch**: `001-portfolio-site` | **Date**: 2026-07-31 | **Spec**: [spec.md](spec.md)

All NEEDS CLARIFICATION items from Technical Context are resolved here. This file is the Phase 0 output; do not modify spec.md based on implementation details found here.

---

## R-001: Framework & Rendering Strategy

**Decision**: Next.js 15 (App Router) + React + TypeScript.

**Rationale**: Documented in `ADR-0002`. App Router enables per-section rendering strategies — ISR for stable content (Hero, About, Skills copy), SSR/server-fetch for Projects and dynamic content. i18n Phase 2 is accommodated via `[locale]/` route group reservation in the folder structure (`architecture/FolderStructure.md`).

**Alternatives considered**: Vite + React SPA (no SSR/SEO advantage), Remix (no Cloudflare R2 ecosystem precedent here), Astro (less React ecosystem compatibility for motion library).

---

## R-002: Styling & Design System

**Decision**: Tailwind CSS + shadcn/ui + CSS custom properties for design tokens.

**Rationale**: `TechStack.md` specifies Tailwind + shadcn/ui. Design tokens defined as CSS variables at `:root`, mapped to Tailwind theme extension — never hardcoded in components. Token categories: color, typography, spacing, radius, shadow/elevation, motion durations (`DesignTokens.md`).

**Mecha Typography visual system** is binding (`DesignPhilosophy.md`, `MechaTypographySystem.md`):
- Shared primitives to build: `PanelFrame`, `SectionIndex`, `StatusTag`, `SchematicConnector`.
- Applied at **medium** level — HUD motifs on structural elements only, not every element.
- Section index numbers + status tags rendered in monospace font; body copy in clean readable sans.

**Color system**: Dark background, cyan/blue-toned technical accent. Three background elevation layers to avoid flatness. Cyan accent tested for WCAG AA contrast before token lock (`ColorSystem.md`).

**Typeface choices** (to be locked during token pass):
- Display/accent: angular industrial face (mecha-influenced) — only for section numbers, status tags, Hero headline.
- Body/UI: clean legible sans (e.g. Inter or equivalent).
- Mono: for status tags, data values, technical labels.

---

## R-003: Animation Library

**Decision**: `motion` npm package (unified Motion library, successor to Framer Motion + Motion One).

**Rationale**: `TechStack.md` explicitly names `motion` — do NOT install `framer-motion` alongside it. Motion variants centralized in `components/motion/`, not declared per component. All scroll-triggered animations MUST be CLS-safe (no layout-affecting transforms before hydration). `prefers-reduced-motion` disables decorative animations.

**React Three Fiber**: NOT added as a baseline dependency. Only if the signature element requires 3D (open decision, deferred).

---

## R-004: Database & Data Access Pattern

**Decision**: Supabase Postgres — anon key + RLS, server-side queries only. Schema already finalized in `schema.sql`.

**Tables in scope for v1**:
- `profile` — singleton row (name, bio, links, career goals, hobbies)
- `education` — one row per degree
- `skills` — grouped by `category`, `is_core` flag for core 4 areas
- `projects` — `problem` / `approach` / `impact` as separate text columns (confirmed in spec clarification Q3)
- `contacts` — insert-only from server action

**Tables out of scope for v1 site display** (exist in schema but not surfaced as site sections):
- `certificates`, `activities`, `awards` — stored but not displayed in v1 UI.

**Access pattern**: `lib/supabase/` server-side Supabase client with anon key. Fetch at server component level (ISR preferred). Never expose service role key client-side. No client-side waterfalls for primary content.

**Editing workflow**: Owner edits directly in Supabase Dashboard Table Editor (ADR-0006). No admin UI in-app.

---

## R-005: Contact Form — Server Action & Spam Defense

**Decision**: Next.js Server Action (or Vercel Edge Function) + three-layer spam defense (ADR-0007, locked in spec clarification Q1):
1. **Honeypot field** — hidden input, bot fills it → server silently rejects before any DB write.
2. **Rate limiting** — per-IP cap over rolling window, enforced server-side via Upstash Redis (persistent across serverless instances/regions, replacing unreliable in-memory approach).
3. **Cloudflare Turnstile** — challenge widget verified server-side before insert.

**Turnstile flow**: Client renders Turnstile widget → on submit, Turnstile token included in request → server action calls Turnstile verification API → if pass, proceed to DB insert; if fail or widget fails to load, show user-friendly error + surface direct email fallback (`manhnha210505@gmail.com`).

**Implementation note**: Turnstile site key goes in `NEXT_PUBLIC_TURNSTILE_SITE_KEY` env var (safe to expose). Turnstile secret key goes in `TURNSTILE_SECRET_KEY` server-only env var (never client-side).

---

## R-006: Infrastructure — Vercel + Cloudflare

**Decision**: Vercel for deployment, Cloudflare for DNS/CDN/SSL/WAF (TechStack.md).

**Critical config**: When Cloudflare proxies (orange-cloud) in front of Vercel, SSL mode MUST be set to **Full (strict)** in Cloudflare — not Flexible or Full — to avoid redirect loops. Document in `engineering/Deployment.md`.

**Asset storage**: Cloudflare R2 for images (cover photos, avatars, certificates). Assets served as AVIF/WebP where supported. URLs stored as text columns in Supabase (`profile.avatar_url`, `projects.cover_image_url`).

---

## R-007: SEO & Structured Data

**Decision**: JSON-LD `Person` schema in `<head>`, Next.js Metadata API for title/description/OG tags.

**JSON-LD fields to include**: `@type: Person`, `name`, `jobTitle`, `url`, `sameAs` (GitHub, LinkedIn when available), `knowsAbout` (mapped from skills), `alumniOf`.

**OG tags**: `og:title`, `og:description`, `og:image` (a static OG image at `/og.png`, generated or designed), `og:type: website`, `og:url`.

**Canonical URL**: Set explicitly — especially important because Cloudflare + Vercel can produce two domains in preview.

---

## R-008: i18n Architecture (Phase 1 English-only, Phase 2 Vietnamese-ready)

**Decision**: All copy centralized in `src/content/` as typed objects (not hardcoded JSX strings). The `src/content/` abstraction is the primary Phase 1 preparation; the `[locale]/` route group will be introduced in Phase 2 when multi-locale routing is activated, rather than keeping an empty or non-functional folder in Next.js App Router during Phase 1. Do NOT install `next-intl` or other i18n library in Phase 1 — copy sourced from `content/` flat files is sufficient for English-only and keeps the bundle lean.

**Phase 2 path**: Introduce `next-intl` or App Router `[locale]/` segment in Phase 2, point `content/` to locale-keyed files (`content/en/`, `content/vi/`). No component restructuring needed since all string literals are already extracted into `src/content/`.

---

## R-009: Accessibility Standards

**Decision**: WCAG 2.1 AA minimum. Lighthouse Accessibility 90+.

**Specific requirements**:
- Focus-visible rings on all interactive elements — do not remove without visible replacement.
- All images: meaningful `alt` text; decorative images: `alt=""`.
- Contact form: error messages associated via `aria-describedby`, not color alone.
- Screen reader: logical heading hierarchy (single `<h1>`, `<h2>` per section, `<h3>` for subsections), semantic landmark elements (`<main>`, `<nav>`, `<section>`, `<footer>`).
- `prefers-reduced-motion`: disable all decorative animations, reduce to opacity-fade at most. No layout shift from any animation.

---

## R-010: Performance Budget

**Decision**: Core Web Vitals "Good" on both mobile and desktop.

**Targets**:
- LCP < 2.5s (desktop), < 4.0s (mobile)
- CLS = 0 (animations must not cause layout shift)
- INP < 200ms
- No layout shift from scroll-triggered reveals (use `opacity`/`transform` only, pre-reserve space).

**Strategy**: ISR for stable content, image optimization via Next.js `<Image>` (serving AVIF/WebP from R2), code-split motion library to avoid main-bundle bloat.

---

## R-011: Signature Element (Open Decision — Deferred)

**Status**: Intentionally deferred per spec Assumptions. Three options remain open (D3 data viz, live Supabase metrics, scroll-driven storytelling). This plan does NOT lock this decision — implementing it is a separate task once chosen.

**What NOT to do**: Do not add `react-three-fiber`, `d3`, or `@observablehq/plot` as baseline dependencies. Add only when the signature element option is locked and scoped.
