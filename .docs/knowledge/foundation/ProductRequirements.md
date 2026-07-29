# Product Requirements

## Core sections (site map)
1. **Hero** — identity statement, role, immediate signature-element teaser.
2. **About** — narrative bio, technical identity, values.
3. **Skills** — DS/ML/AI/Data Viz/MLOps/Backend/Cloud, grouped and weighted, not a flat tag cloud.
4. **Projects** — case-study format (problem → approach → impact), backed by Supabase `projects` table.
5. **Contact** — form backed by Supabase `contacts` table + validation + spam protection.
6. **Footer** — social links, secondary nav, credits.

Detailed content and interaction spec for each section lives in `docs/playbooks/`.

## Functional requirements
- **Contact form**: client + server-side validation, writes to Supabase `contacts` (RLS enforced), success/error states are motion-appropriate (see `motion/MicroInteractions.md`), no exposed service keys client-side.
- **Projects data**: sourced from Supabase `projects` table; supports images (Cloudflare R2), tags/skills, links (repo/live demo), and case-study body content.
- **Signature element**: exactly one flagship interactive moment (see Open Decisions below) — must not be purely decorative; must reinforce the Data Science identity.
- **Navigation**: sticky/scroll-aware nav with active-section indicator; smooth in-page scrolling.
- **Responsive**: mobile, tablet, desktop breakpoints; motion and interaction patterns adapt (not just resize) per device input (touch vs pointer).

## Internationalization (i18n)
- **Phase 1 (v1 launch): English only.** All copy, all metadata, all Supabase content in English.
- **Phase 2 (post-launch): Vietnamese.** Architecture must not block this — use a routing/content structure (e.g. `next-intl` or App Router locale segments) that allows adding `vi` without restructuring components. Do not hardcode English strings directly in JSX; centralize copy.
- Vietnamese-language internal docs live in `docs/prompt_vn/` — mirrors `docs/knowledge/` structure for the team's/owner's own reference, not for site content.

## Non-functional requirements
- Performance, accessibility, and SEO budgets — see `engineering/` folder.
- Motion must degrade gracefully under `prefers-reduced-motion`.
- No layout shift from animation (CLS-safe).

## Open decisions (track and resolve before `/plan` locks scope)
- **Signature element**: candidate A) interactive D3/Observable-Plot data visualization, B) live Supabase-fed site metrics, C) scroll-driven personal data storytelling. Not yet finalized — do not hardcode dependencies (e.g. `react-three-fiber` usage) until this is chosen.
- **Exact color palette**: current direction is dark theme + single accent (green under discussion) — flagged as a common AI-generated default; needs a deliberate pass before lock-in (see `design/ColorSystem.md`).
