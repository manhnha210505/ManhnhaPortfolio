# Data Flow

## Projects content
1. Project rows authored/edited in Supabase `projects` table (or a lightweight internal admin, future scope).
2. Images referenced by URL point to Cloudflare R2.
3. Next.js fetches project data at build/ISR time (preferred) or via server component fetch on request.
4. Rendered as case-study cards → detail view, per `docs/playbooks/ProjectsSection.md`.

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
