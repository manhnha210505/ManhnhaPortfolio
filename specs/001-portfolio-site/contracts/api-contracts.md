# API Contracts: Portfolio Site

**Branch**: `001-portfolio-site` | **Date**: 2026-07-31

This project exposes two interface types: (1) server-side data queries to Supabase (internal), and (2) one server action endpoint for the contact form (public-facing). No external REST API is built — the site is a consumer of Supabase, not a provider.

---

## Contract 1: Supabase Read Queries (Server-Side Only)

These are internal contracts — Next.js server components call Supabase via `lib/supabase/` using the anon key. Not exposed as public REST endpoints.

### GET Profile (singleton)

```
Table: profile
Filter: none (single row expected)
Fields: full_name, display_name, tagline, bio, email, github_url,
        linkedin_url, location, career_goal, hobbies, show_hobbies,
        avatar_url, resume_url
Returns: single object or null
Used by: Hero, About, Footer, JSON-LD Person schema, meta tags
```

### GET Education (ordered list)

```
Table: education
Filter: none
Order: sort_order ASC
Fields: school, major, start_date, end_date, gpa, highlights
Returns: array (currently 1 row)
Used by: About section
```

### GET Skills (grouped)

```
Table: skills
Filter: none
Order: sort_order ASC
Fields: category, name, is_core, sort_order
Returns: array, grouped client-side by category
Used by: Skills section — is_core drives Core vs Secondary visual weight
```

### GET Projects (published only)

```
Table: projects
Filter: published = true
Order: sort_order ASC
Fields: title, slug, summary, problem, approach, impact, role,
        is_team_project, team_size, repo_url, demo_url,
        cover_image_url, tags
Returns: array (currently 2 rows)
Used by: Projects section — card preview + inline-expand case study
```

---

## Contract 2: Contact Form Submission (Server Action)

This is the only public write path. Implemented as a Next.js Server Action, NOT a direct client Supabase insert.

### POST Contact Submission

**Trigger**: User submits contact form.

**Input (from client)**:

| Field | Type | Required | Validation |
|---|---|---|---|
| `name` | string | Yes | 1–100 characters |
| `email` | string | Yes | Valid email (RFC 5322 pattern) |
| `message` | string | Yes | 10–5000 characters |
| `honeypot` | string | No | Hidden field — MUST be empty for real submissions |
| `turnstileToken` | string | Yes | Cloudflare Turnstile verification token |

**Server-side processing** (in order):

1. **Honeypot check**: If `honeypot` is non-empty → return `{ success: true }` silently (don't reveal detection to bot).
2. **Rate limit check**: If IP exceeds threshold → return `{ success: false, error: "Too many submissions. Please try again later." }`.
3. **Turnstile verification**: POST to `https://challenges.cloudflare.com/turnstile/v0/siteverify` with `{ secret: TURNSTILE_SECRET_KEY, response: turnstileToken }`.
   - If Turnstile fails → return `{ success: false, error: "Verification failed. Please try again or contact directly at manhnha210505@gmail.com." }`.
4. **Input validation** (server-side, regardless of client validation):
   - `name`: required, 1–100 chars.
   - `email`: required, valid format.
   - `message`: required, 10–5000 chars.
   - If invalid → return `{ success: false, errors: { [field]: "message" } }`.
5. **Database insert**: Insert into `contacts` table.
   - If DB error → return `{ success: false, error: "Something went wrong. Please try again or contact directly at manhnha210505@gmail.com." }`.
6. **Success** → return `{ success: true }`.

**Output (to client)**:

```typescript
type ContactResponse =
  | { success: true }
  | { success: false; error: string; errors?: Record<string, string> }
```

**Security constraints**:
- NEVER expose Supabase service role key or Turnstile secret key to client.
- NEVER reveal spam detection mechanism (honeypot) in error messages.
- Rate limit applies per IP, not per session.

---

## Contract 3: JSON-LD Structured Data (Page Output)

Not an API — rendered in `<head>` as a `<script type="application/ld+json">` block.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "{profile.full_name}",
  "alternateName": "{profile.display_name}",
  "jobTitle": "Data Science Engineer",
  "url": "{canonical_url}",
  "email": "{profile.email}",
  "image": "{profile.avatar_url}",
  "sameAs": [
    "{profile.github_url}",
    "{profile.linkedin_url}"
  ],
  "knowsAbout": ["{skills[].name where is_core = true}"],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "{education[0].school}"
  }
}
```

**Rule**: Populated from Supabase data at render time. `sameAs` array filters out null URLs. `knowsAbout` includes core skills only for brevity.
