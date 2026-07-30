# Database Schema (Supabase)

Full runnable SQL: `schema.sql` in this same folder — paste into Supabase SQL Editor and run once. See `docs/decisions/ADR-0006-Content-Storage-Strategy.md` for the reasoning behind this approach.

## Tables

| Table | Purpose | Maps to `PersonalProfile.md` |
|---|---|---|
| `profile` | Singleton row — name, tagline, bio, contact links, career goals, hobbies | Mục 1, 2, 10 |
| `education` | One row per degree | Mục 3 |
| `skills` | One row per skill, grouped by `category`, flagged `is_core` for the 4 lead areas (DS/ML/DataViz/MLOps) | Mục 4 |
| `projects` | One row per project, case-study fields (`problem`/`approach`/`impact`), honesty fields (`is_team_project`, `role`, `team_size`) | Mục 6 |
| `certificates` | One row per certificate | Mục 7 |
| `activities` | One row per club/organization activity | Mục 8 |
| `awards` | One row per award | Mục 9 |
| `contacts` | Contact form submissions (write-only from the public site) | — |

## Editing workflow
1. Log into the Supabase Dashboard for this project.
2. Go to **Table Editor**.
3. Edit rows directly — no site code changes, no redeploy needed.
4. Changes appear on the live site on next page load/ISR revalidation (see `DataFlow.md`).

No admin page, no admin auth flow, no custom forms are part of the app itself — this was an explicit scope decision (ADR-0006).

## Seeding from `PersonalProfile.md`
The first population of these tables is manual: copy the data already gathered in `docs/sources/PersonalProfile.md` into the Table Editor row by row (or via the SQL Editor with `insert` statements, if preferred for the initial seed). Once seeded, `PersonalProfile.md` becomes a historical reference / backup rather than the live source of truth — the database is live source of truth from that point on. Keep `PersonalProfile.md` updated in parallel anyway as a plain-text backup outside the database.

## Open field — not yet filled
`projects.slug` must be unique and URL-safe (e.g. `image-captioning`, `spam-classification-knn`) — assign these during seeding.
