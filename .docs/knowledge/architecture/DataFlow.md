# Data Flow

## Profile & content data (profile, education, skills, projects, certificates, activities, awards)
1. All editable content lives in Supabase tables — schema in `architecture/DatabaseSchema.md`.
2. **Editing path**: owner logs into the Supabase Dashboard → Table Editor → edits rows directly. No route in the app performs writes to these tables (see ADR-0006). This is a deliberate simplification, not a gap.
3. **Read path**: Next.js fetches via `lib/supabase/` (server-side, using the anon key — RLS restricts it to read-only) at build/ISR time, preferred over client-side fetch for performance and SEO.
4. Images referenced by URL (`profile.avatar_url`, `projects.cover_image_url`, etc.) point to Cloudflare R2.
5. Content changes appear on next ISR revalidation — no deploy needed.

## Projects content (specific case)
1. Project rows in the `projects` table — see profile/content flow above for the general editing pattern.
2. Rendered as case-study cards → detail view, per `docs/playbooks/ProjectsSection.md`.

## Contact form
1. Visitor submits form (client-side validation first — required fields, email format).
2. Submission goes to a server action / Edge Function, not a direct client Supabase insert.
3. Server-side validation + basic spam/rate-limit check.
4. Insert into Supabase `contacts` table (RLS: insert-only from server context, no public read).
5. Success/error state surfaces via a motion-appropriate micro-interaction (see `motion/MicroInteractions.md`).

## Signature element (pending choice — see `foundation/ProductRequirements.md`)
- If **live Supabase-fed metrics**: read-only aggregate query (e.g., visit counts, project counts) exposed via a safe, rate-limited endpoint — never expose raw table data.
- If **D3/Observable Plot visualization**: data can be static/generated at build time — no live Supabase dependency required.
- If **scroll-driven personal data storytelling**: content-driven (from `content/`), not a live data dependency.

Resolve this before finalizing this section of the doc — the data-flow shape differs materially between options.
