# Implementation Plan: Premium Data Science Portfolio Site

**Branch**: `001-portfolio-site` | **Date**: 2026-07-31 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-portfolio-site/spec.md`

## Summary

Build a single-page, Awwwards-tier personal portfolio website for ManhNha, establishing his identity as a **Data Science Engineer**. The application is structured as a Next.js 15 (App Router) project deployed on Vercel with Cloudflare proxying DNS/CDN. Content is stored in Supabase PostgreSQL (`profile`, `education`, `skills`, `projects`, `contacts`) and edited via Supabase Dashboard Table Editor. Visual language uses the **Mecha Typography** system (medium application level) with dark background and cyan technical accent. Contact form uses a 3-layer spam defense (honeypot + server-side rate limiting + Cloudflare Turnstile).

## Technical Context

**Language/Version**: TypeScript / Node.js 18+ (LTS)

**Primary Dependencies**: Next.js 15 (App Router), React 19, Tailwind CSS v3, shadcn/ui primitives, `motion` (unified Motion library), `@supabase/supabase-js`

**Storage**: Supabase PostgreSQL (data & schema in `architecture/schema.sql`), Cloudflare R2 (images & static assets), Upstash Redis (rate limiting)

**Testing**: Playwright (E2E & visual validation), Vitest (unit/component testing)

**Target Platform**: Vercel (Next.js serverless/ISR), Cloudflare (DNS/WAF/CDN/Turnstile)

**Project Type**: Single-page Web Application (SSR/ISR hybrid)

**Performance Goals**: Core Web Vitals "Good" band (LCP < 2.5s desktop / < 4.0s mobile, CLS = 0, INP < 200ms), Lighthouse Performance ≥ 90

**Constraints**: WCAG 2.1 AA compliance, Lighthouse Accessibility ≥ 90, `prefers-reduced-motion` support, zero-expose of backend secrets, English-first with `src/content/` abstraction ready for Vietnamese i18n (Phase 2)

**Scale/Scope**: Single-tenant personal portfolio site, 6 main sections (Hero, About, Skills, Projects, Contact, Footer)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

1. **Functional Correctness (Priority 1 - Highest)**
   - *Status*: PASS
   - *Verification*: Contact form client + server validation, 3-layer spam defense with Turnstile fallback, working section scrolling, verified GitHub repo links, Supabase RLS isolation.

2. **Maintainability (Priority 2)**
   - *Status*: PASS
   - *Verification*: Mecha Typography visual language abstracted into shared reusable components (`PanelFrame`, `SectionIndex`, `StatusTag`, `SchematicConnector`), centralized copy in `src/content/en/`, direct Supabase Dashboard editing (ADR-0006) avoiding in-app admin bloat.

3. **Accessibility (Priority 3)**
   - *Status*: PASS
   - *Verification*: Keyboard navigation focus rings, `aria-describedby` for form validation errors, semantic HTML heading hierarchy (`h1` -> `h2` -> `h3`), full `prefers-reduced-motion` support disabling layout-affecting motion.

4. **Performance (Priority 4)**
   - *Status*: PASS
   - *Verification*: ISR for static sections, CLS-safe motion (opacity/transform only), AVIF/WebP image optimization from Cloudflare R2, code-split `motion` package.

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-site/
├── spec.md              # Feature specification
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 validation guide (/speckit-plan command)
├── contracts/           # Phase 1 interface contracts
│   └── api-contracts.md # Supabase queries & Contact Server Action contract
└── checklists/
    └── requirements.md  # Quality validation checklist
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx             # Root layout, fonts, metadata, JSON-LD
│   ├── page.tsx               # Main page section composition
│   ├── actions/
│   │   └── contact.ts         # Contact form server action (honeypot + Turnstile + DB insert)
│   └── api/                   # Reserved for helper route handlers
├── components/
│   ├── sections/              # Section composition components
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   ├── ui/                    # shadcn/ui primitives & Mecha primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── panel-frame.tsx    # Mecha primitive: corner brackets
│   │   ├── section-index.tsx  # Mecha primitive: 01 / 06 index label
│   │   ├── status-tag.tsx     # Mecha primitive: [TEAM PROJECT] bracket tag
│   │   └── schematic-connector.tsx
│   ├── motion/                # Centralized Motion wrappers & variants
│   │   ├── FadeIn.tsx
│   │   ├── StaggerReveal.tsx
│   │   └── motion-variants.ts
│   └── navbar.tsx             # Sticky navbar with section observer
├── lib/
│   ├── supabase/              # Supabase server & browser clients
│   │   ├── client.ts
│   │   └── server.ts
│   └── utils/
│       ├── rate-limit.ts      # Upstash Redis rate limiter for contact form
│       └── cn.ts
├── content/                   # Centralized copy (i18n Phase 2 ready)
│   └── en/
│       ├── hero.ts
│       ├── about.ts
│       ├── skills.ts
│       ├── projects.ts
│       ├── contact.ts
│       ├── footer.ts
│       └── meta.ts
├── styles/
│   └── globals.css            # Tailwind directives + design token CSS variables
└── types/
    ├── database.ts            # Generated Supabase DB types
    └── portfolio.ts           # Domain entities (Profile, Project, Skill, etc.)
```

**Structure Decision**: Single Next.js web application under `src/` following `architecture/FolderStructure.md`. Section components live 1:1 in `components/sections/`. Copy is isolated in `content/en/`. Mecha visual primitives live in `components/ui/`.

## Complexity Tracking

*No constitution violations detected. Complexity tracking table not required.*
