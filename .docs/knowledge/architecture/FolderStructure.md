# Folder Structure

This describes the intended **application source** structure (`/app`, `/src`), separate from the repo-root tooling/docs structure already established (`.agents/`, `.specify/`, `docs/`). Finalize exact naming during `/plan` (`speckit-plan`), but use this as the default unless a concrete reason emerges to deviate.

```
src/
├── app/                      # Next.js App Router
│   ├── (marketing)/           # route group for the public site
│   │   ├── page.tsx           # Hero + section composition
│   │   └── layout.tsx
│   ├── api/                   # route handlers (contact form, etc.)
│   └── [locale]/               # reserved for Phase 2 i18n (see ProductRequirements.md)
├── components/
│   ├── sections/               # Hero, About, Skills, Projects, Contact, Footer
│   ├── ui/                     # shadcn/ui-based primitives
│   └── motion/                 # shared motion wrappers/variants
├── lib/
│   ├── supabase/                # client + typed queries
│   └── utils/
├── content/                    # centralized copy (i18n-ready, see ProductRequirements.md)
├── styles/                      # tailwind config, design tokens
└── types/
```

## Principles
- Section components stay in `components/sections/` 1:1 with the sitemap in `foundation/ProductRequirements.md` — no ad hoc extra sections without updating that spec first.
- Motion variants are centralized in `components/motion/`, not re-declared per component (keeps `motion/MotionSystem.md` rules enforceable in one place).
- Copy never lives inline in JSX — always sourced from `content/` to keep i18n Phase 2 low-risk.
