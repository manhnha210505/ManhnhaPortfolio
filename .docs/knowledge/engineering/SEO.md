# SEO

## Metadata
- Per-page `<title>`/meta description via Next.js Metadata API — written for a human first (recruiter skimming a search result), keyword-appropriate second.
- Open Graph + Twitter Card images for link previews (project pages should have distinct OG images where feasible).
- `sitemap.xml` and `robots.txt` generated as part of build.

## Structured data
- `Person` schema (JSON-LD) on the About/Hero — reinforces `TechnicalIdentity.md` for search engines and AI crawlers/agents parsing the site.
- `CreativeWork`/`Project`-style structured data per case study where applicable.

## Technical SEO
- Semantic HTML + correct heading hierarchy (shared requirement with `Accessibility.md`).
- Fast LCP/CLS (shared requirement with `Performance.md`) — Core Web Vitals are a ranking factor.
- Canonical URLs; when i18n Phase 2 (Vietnamese) ships, add `hreflang` tags — plan the URL structure (`/vi/...` or domain-based) now even though not implemented in v1 (see `foundation/ProductRequirements.md`).
