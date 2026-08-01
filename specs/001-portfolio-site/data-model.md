# Data Model: Portfolio Site

**Branch**: `001-portfolio-site` | **Date**: 2026-07-31

Derived from `schema.sql` (source of truth for SQL), `spec.md` (entity definitions), and `ADR-0006` (storage strategy). This document describes the logical data model and validation rules; the authoritative runnable SQL is `architecture/schema.sql`.

---

## Entity: Profile (singleton)

**Purpose**: The single owner row. One row exists; all other content references back to this identity.

| Field | Type | Nullable | Notes |
|---|---|---|---|
| `id` | UUID | No | PK, auto-generated |
| `full_name` | text | No | Display name: "Trần Đăng Mạnh" |
| `display_name` | text | Yes | Alias: "manhnha" |
| `tagline` | text | Yes | Hero section one-liner |
| `bio` | text | Yes | About section narrative |
| `email` | text | Yes | Public contact email |
| `github_url` | text | Yes | GitHub profile URL |
| `linkedin_url` | text | Yes | LinkedIn URL (nullable — not yet available) |
| `location` | text | Yes | e.g., "Ho Chi Minh City, Vietnam" |
| `career_goal` | text | Yes | General career direction |
| `short_term_goal` | text | Yes | Near-term role target |
| `long_term_goal` | text | Yes | Multi-year aspiration |
| `target_company_type` | text | Yes | Type of company/role sought |
| `hobbies` | text | Yes | One-liner hobbies for About section |
| `show_hobbies` | boolean | No | Toggle hobbies visibility (default: true) |
| `avatar_url` | text | Yes | Cloudflare R2 URL for profile photo |
| `resume_url` | text | Yes | Cloudflare R2 URL for downloadable CV |
| `updated_at` | timestamptz | No | Auto-set to now() on update |

**RLS**: `SELECT` for `anon` only. No public `INSERT`/`UPDATE`/`DELETE`.

**Validation rules**:
- `full_name` MUST NOT be empty.
- `email` MUST be a valid email format (enforced at application layer, not DB constraint).
- Exactly one row expected — application must handle the case where 0 rows exist gracefully (e.g., fallback to static defaults).

---

## Entity: Education

**Purpose**: One row per degree/qualification.

| Field | Type | Nullable | Notes |
|---|---|---|---|
| `id` | UUID | No | PK |
| `school` | text | No | Institution name |
| `major` | text | Yes | Field of study |
| `start_date` | date | Yes | Enrollment start |
| `end_date` | date | Yes | `null` = ongoing |
| `gpa` | text | Yes | Stored as text (e.g., "3.4/4.0") |
| `highlights` | text[] | Yes | Notable courses, thesis, capstone |
| `sort_order` | int | No | Display order (ascending), default 0 |

**RLS**: `SELECT` for `anon` only.

**Seed data**: HUFLIT, Data Science, 2023–present, GPA 3.4/4.0.

---

## Entity: Skill

**Purpose**: One row per individual skill. Grouped by category; `is_core` flags the 4 primary competency areas.

| Field | Type | Nullable | Notes |
|---|---|---|---|
| `id` | UUID | No | PK |
| `category` | text (enum) | No | Must be one of: `data_science`, `machine_learning`, `data_visualization`, `mlops`, `backend`, `cloud`, `languages`, `frameworks`, `tools` |
| `name` | text | No | Skill name (e.g., "k-NN", "PyTorch") |
| `is_core` | boolean | No | `true` for DS/ML/DataViz/MLOps categories — drives "Core" vs "Secondary" visual weight |
| `sort_order` | int | No | Within-category display order |

**RLS**: `SELECT` for `anon` only.

**Category grouping for UI** (from `SkillsSection.md`):

| Display group | Categories included | Visual weight |
|---|---|---|
| **Core** | `data_science`, `machine_learning`, `data_visualization`, `mlops` | Primary / Large |
| **Backend & Cloud** | `backend`, `cloud` | Secondary / Compact |
| **Languages & Tools** | `languages`, `frameworks`, `tools` | Secondary / Compact |

*Note: This mapping lives purely in the frontend presentation layer (e.g. a constant mapping in `components/sections/SkillsSection.tsx` or `lib/utils/`), NOT as a database column — `category` remains the atomic column in the `skills` table.*

**Constraint**: `category` must match the allowed enum values — enforced by DB `CHECK` constraint in `schema.sql`.

---

## Entity: Project

**Purpose**: One row per portfolio project. Case-study body stored as three independent text columns (Q3 clarification).

| Field | Type | Nullable | Notes |
|---|---|---|---|
| `id` | UUID | No | PK |
| `title` | text | No | Project display name |
| `slug` | text | No | Unique, URL-safe (e.g., `image-captioning`) — used as data key, NOT as a URL segment (no per-project route in v1) |
| `summary` | text | Yes | Short card/preview description (≤ 2 sentences) |
| `problem` | text | Yes | Case-study section 1 — rendered as distinct labeled block |
| `approach` | text | Yes | Case-study section 2 — rendered as distinct labeled block |
| `impact` | text | Yes | Case-study section 3 — rendered as distinct labeled block |
| `role` | text | Yes | e.g., "Team Lead" |
| `is_team_project` | boolean | No | Honesty field — drives `[TEAM PROJECT]` status tag |
| `team_size` | int | Yes | Number of members |
| `repo_url` | text | Yes | GitHub repository link |
| `demo_url` | text | Yes | Live demo link (nullable if none) |
| `cover_image_url` | text | Yes | Cloudflare R2 URL for project thumbnail |
| `tags` | text[] | Yes | Skill/technology tags for filtering |
| `sort_order` | int | No | Display order (ascending) |
| `published` | boolean | No | `true` = visible, `false` = draft (hidden from public query) |
| `created_at` | timestamptz | No | Auto-set |

**RLS**: `SELECT` for `anon` where `published = true`. No public writes.

**Key constraints**:
- `slug` must be unique and URL-safe — set during seeding.
- Application renders `problem`/`approach`/`impact` as independently labeled blocks (no Markdown parser needed).
- `is_team_project = true` must always show `team_size` and `role` — application validation rule (not DB constraint).

**Seed data for v1**:
1. Image Captioning (slug: `image-captioning`, team: 4, role: Team Lead, is_team_project: true)
2. Spam Classification (slug: `spam-classification-knn`, team: 3, role: Team Lead, is_team_project: true)

---

## Entity: Contact Submission

**Purpose**: Inbound contact messages from site visitors. Write-only from public site.

| Field | Type | Nullable | Notes |
|---|---|---|---|
| `id` | UUID | No | PK |
| `name` | text | No | Sender's name |
| `email` | text | No | Sender's email — MUST be valid format |
| `message` | text | No | Message body — MUST NOT be empty |
| `created_at` | timestamptz | No | Auto-set |

**RLS**: `INSERT` for `anon` (via server action only, never direct client insert). No `SELECT` policy for `anon` — submissions are private.

**Spam defense** (layered, ADR-0007 — enforced at server action layer, not DB layer):
- Honeypot field: presence of value → silent reject, no DB write.
- Rate limiting: per-IP cap in server action.
- Cloudflare Turnstile token: verified before DB write.

**Validation rules** (client-side first, server-side second):
- `name`: required, ≥ 1 character, ≤ 100 characters.
- `email`: required, valid email format (RFC 5322-compatible pattern).
- `message`: required, ≥ 10 characters, ≤ 5000 characters.

---

## Deferred Entities (schema exists, not displayed in v1 UI)

The following tables are created in `schema.sql` and seeded for completeness, but have no corresponding UI section in v1:
- `certificates`
- `activities`
- `awards`

These are available for Phase 2 expansion without schema changes.

---

## Content Layer: `src/content/`

Not a DB entity — a TypeScript module layer for all static UI copy (i18n Phase 2 preparation).

| File | Purpose |
|---|---|
| `content/en/hero.ts` | Hero section copy (headline, sub-headline, CTA labels) |
| `content/en/about.ts` | About section narrative scaffold (bio loaded from DB, this holds UI labels) |
| `content/en/nav.ts` | Navbar labels and section anchors |
| `content/en/contact.ts` | Contact form labels, error messages, success copy |
| `content/en/footer.ts` | Footer links, copyright text |
| `content/en/meta.ts` | Page title, meta description, OG fields |

**Rule**: No string literal in JSX — all copy sourced from `content/en/*.ts`. Phase 2 adds `content/vi/*.ts` alongside.

---

## Design Token Reference

Token categories (values locked during design pass, not in this data model — see `DesignTokens.md`):

| Category | Token prefix |
|---|---|
| Color — background layers | `--color-bg-*` |
| Color — foreground/text | `--color-fg-*` |
| Color — accent (cyan) | `--color-accent-*` |
| Color — border | `--color-border-*` |
| Color — semantic | `--color-semantic-*` |
| Color — data-viz palette | `--color-data-*` |
| Spacing | `--space-*` (4px base scale) |
| Typography — family | `--font-display`, `--font-body`, `--font-mono` |
| Typography — scale | `--text-*` |
| Radius | `--radius-sm`, `--radius-md`, `--radius-lg` |
| Shadow/elevation | `--shadow-*` |
| Motion durations | `--duration-fast`, `--duration-base`, `--duration-slow` |
| Motion easing | `--ease-*` |
