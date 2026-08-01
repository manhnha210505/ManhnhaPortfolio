# Quickstart: Portfolio Site Validation

**Branch**: `001-portfolio-site` | **Date**: 2026-07-31

This guide documents how to validate the feature works end-to-end after implementation. It covers prerequisites, setup, and runnable verification scenarios — NOT full implementation code.

---

## Prerequisites

1. **Node.js** ≥ 18 (LTS)
2. **pnpm** (or npm — confirm during project init)
3. **Supabase project** provisioned with schema applied (`architecture/schema.sql`)
4. **Cloudflare Turnstile** site key + secret key created at [dash.cloudflare.com](https://dash.cloudflare.com)
5. **Environment variables** configured (see below)

## Environment Variables

Create `.env.local` at project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<site-key>
TURNSTILE_SECRET_KEY=<secret-key>  # server-only, never exposed to client

# Upstash Redis (Rate Limiting)
UPSTASH_REDIS_REST_URL="https://<endpoint>.upstash.io"
UPSTASH_REDIS_REST_TOKEN="<token>"
```

**Critical**: `TURNSTILE_SECRET_KEY` must NOT start with `NEXT_PUBLIC_` — it must remain server-side only.

## Setup Commands

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production (validation only)
pnpm build
```

## Seed Data

Before validation, ensure Supabase tables have seed data:

1. **Profile**: One row with `full_name = "Trần Đăng Mạnh"`, `display_name = "manhnha"`, `tagline`, `bio`, `email`, `github_url`, `avatar_url`.
2. **Education**: One row for HUFLIT (Data Science, 2023–present, GPA 3.4/4.0).
3. **Skills**: Rows per `SkillsSection.md` — 4 core categories (`is_core: true`) + 2 secondary groups.
4. **Projects**: 2 rows — Image Captioning (`slug: image-captioning`) and Spam Classification (`slug: spam-classification-knn`), both with `published: true` and all case-study fields populated.

---

## Validation Scenarios

### VS-001: Hero Section — Identity in First Viewport

**Steps**:
1. Open `http://localhost:3000` in a browser.
2. Observe the Hero section without scrolling.

**Expected**:
- Name "Trần Đăng Mạnh" visible.
- Role "Data Science Engineer" visible.
- Two CTAs visible: "View Projects" and "Get in Touch".
- Section index number visible (e.g., `01 / 06`).
- Page loads within 3 seconds.

**Maps to**: US1-AC1, SC-001, FR-001.

---

### VS-002: Navigation — Sticky + Active Indicator

**Steps**:
1. Scroll down through all sections.
2. Observe the navbar.

**Expected**:
- Navbar remains visible (sticky).
- Active section indicator updates as you scroll.
- Clicking "Projects" scrolls smoothly to the Projects section.
- GitHub icon link is present and opens in new tab.

**Maps to**: FR-002, FR-016.

---

### VS-003: Skills Section — Grouped + Scannable

**Steps**:
1. Scroll to or click to the Skills section.
2. Read for 15–20 seconds.

**Expected**:
- Core skills (DS, ML, Data Viz, MLOps) have larger visual weight.
- Secondary skills (Backend & Cloud, Languages & Tools) are visually smaller.
- Not a flat tag cloud — visually grouped by category.

**Maps to**: US1-AC2, SC-002, FR-004.

---

### VS-004: Projects — Case Study Expand/Collapse

**Steps**:
1. Scroll to Projects section.
2. Click to expand the Image Captioning project.
3. Read the expanded case study.
4. Collapse it.
5. Repeat for Spam Classification.

**Expected**:
- Card shows preview description + meta (team size, role, GitHub link).
- Expanding reveals three labeled sections: Problem, Approach, Impact.
- Image Captioning shows: BLEU-4 0.1883, 4-member team, Team Lead role.
- Spam Classification shows: 96% accuracy, 3-member team.
- `[TEAM PROJECT]` status tag visible on both cards.
- Expand/collapse is smooth animation (inline, no modal or page change).
- GitHub links open in new tab.

**Maps to**: US2-AC1/AC2/AC3, US3-AC1/AC3, FR-005, FR-015.

---

### VS-005: Contact Form — Happy Path

**Steps**:
1. Scroll to or click to Contact section.
2. Fill in: Name = "Test User", Email = "test@example.com", Message = "Hello from quickstart validation."
3. Complete the Turnstile challenge.
4. Submit.

**Expected**:
- Turnstile widget renders and is completable.
- Success message appears with visual feedback.
- Row appears in Supabase `contacts` table (check via Dashboard > Table Editor).

**Maps to**: US4-AC1, SC-004, FR-006, FR-008.

---

### VS-006: Contact Form — Validation Errors

**Steps**:
1. Try submitting with empty Name field.
2. Try submitting with invalid email "notanemail".
3. Try submitting with message shorter than 10 characters.

**Expected**:
- Validation errors appear next to each invalid field BEFORE any server request.
- Errors are visible (not color-only — icon or text).

**Maps to**: US4-AC2, US4-AC3, FR-006.

---

### VS-007: Mobile Responsiveness

**Steps**:
1. Open Chrome DevTools → toggle device toolbar → select iPhone 14 (390px).
2. Reload the page.
3. Tap the mobile menu hamburger.
4. Navigate to Projects via mobile menu.
5. Expand a project card.

**Expected**:
- Navbar collapses to mobile menu.
- Mobile menu items have ≥ 44×44px touch targets.
- Project cards display single-column, full-width.
- No horizontal overflow on any section.

**Maps to**: US6-AC1/AC2/AC3, FR-012, FR-016.

---

### VS-008: Accessibility — Keyboard Navigation

**Steps**:
1. Reload the page.
2. Press Tab repeatedly through the entire page.

**Expected**:
- All nav links, CTAs, form fields, and project expand triggers are focusable.
- Visible focus ring on each focused element.
- Enter/Space activates interactive elements.

**Maps to**: Edge Case (keyboard), SC-006, FR-011.

---

### VS-009: Reduced Motion

**Steps**:
1. In OS settings or DevTools, enable `prefers-reduced-motion: reduce`.
2. Reload the page.

**Expected**:
- No decorative animations play (Hero stagger, scroll reveals, card expansion are instant or opacity-fade only).
- No layout shift from any element.

**Maps to**: Edge Case (reduced motion), FR-011, FR-014.

---

### VS-010: SEO & Structured Data

**Steps**:
1. View page source (`Cmd+U` or `Ctrl+U`).
2. Search for `application/ld+json`.
3. Check `<head>` for `<title>`, `<meta name="description">`, `<meta property="og:*">`.

**Expected**:
- JSON-LD block contains `@type: Person`, `name`, `jobTitle`, `sameAs` (GitHub).
- Title tag is descriptive (not "Next.js App").
- Meta description present.
- OG tags present (title, description, image, type, url).

**Maps to**: US5-AC1/AC2/AC3, SC-008, FR-010.

---

### VS-011: Lighthouse Audit

**Steps**:
1. Build production: `pnpm build && pnpm start`.
2. Open Chrome DevTools → Lighthouse tab.
3. Run audit for "Performance", "Accessibility", "Best Practices", "SEO" on both Desktop and Mobile.

**Expected**:
- Accessibility ≥ 90 (SC-007).
- Performance: LCP < 2.5s desktop, CLS = 0 (SC-005).
- SEO ≥ 90.

**Maps to**: SC-005, SC-007.

---

## Post-Validation Checklist

- [ ] All 11 validation scenarios pass.
- [ ] Supabase `contacts` table has the test submission.
- [ ] No console errors in dev tools.
- [ ] No TypeScript build errors (`pnpm build` clean).
- [ ] Owner review against `profiles/Owner.md` checklist.
