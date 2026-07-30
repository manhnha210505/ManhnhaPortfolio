# ADR-0006: Content Storage Strategy (Supabase over static content)

## Status
Accepted

## Context
`docs/sources/PersonalProfile.md` holds ManhNha's profile data (personal info, education, skills, projects, certificates, activities, awards, hobbies) as the current source of truth. The owner wants to edit this data later without redeploying code.

## Decision
Store all editable personal/portfolio content in Supabase Postgres tables (`profile`, `education`, `skills`, `projects`, `certificates`, `activities`, `awards`), in addition to the already-planned `contacts` table. The Next.js frontend fetches this data read-only. Editing happens directly through the **Supabase Table Editor** (project owner logs into the Supabase Dashboard) — no custom admin UI or admin auth flow is built into the site itself.

## Consequences
- **No admin route/page needed in the app** — removes a chunk of scope that would otherwise require Supabase Auth wiring, protected routes, and form UI (see `governance/DefinitionOfDone.md` — this scope is explicitly *not* part of v1).
- **RLS is simple**: every content table gets a public `SELECT` policy only. No `INSERT`/`UPDATE`/`DELETE` policies for the `anon` role — edits only happen via the Dashboard, which operates with owner privileges and isn't subject to `anon`-role RLS policies.
- **`contacts` table is the exception**: needs a public `INSERT` policy (so the contact form can write) but no `SELECT` policy (visitors should never read other people's submitted messages).
- Content still needs a first-time **seed** — see `.docs/knowledge/architecture/DatabaseSchema.md` for the schema; seeding from `PersonalProfile.md` happens once, manually, via the Table Editor or a one-off seed script.
- `foundation/ProductRequirements.md`'s i18n plan (Phase 2 Vietnamese) should be revisited once this is in place — likely needs a `locale` column or a parallel translated table rather than duplicating the whole schema; not required for v1 (English-only).
- This does **not** reopen the "no CMS/blog" non-goal in `foundation/ProjectVision.md` — this is single-owner profile data with dashboard-only editing, not a multi-post authoring workflow.

## Alternatives considered
- **Static content files (`content/*.ts` or `.json`)** — simplest to implement, but requires a code change + redeploy for every edit. Rejected per the owner's explicit requirement for easy, code-free edits.
- **Custom admin UI with Supabase Auth** — more convenient long-term (structured forms, validation) but adds meaningful v1 scope (auth flow, protected routes, admin components) for a single-editor use case where the Supabase Dashboard already does the job. Revisit in v2 if the raw Table Editor becomes annoying to use (e.g. editing long bio/case-study text in a plain grid).
