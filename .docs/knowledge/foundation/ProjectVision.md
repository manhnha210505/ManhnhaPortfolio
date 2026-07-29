# Project Vision

## Statement
ManhnhaPortfolio is a premium, Awwwards-tier personal portfolio that establishes ManhNha's professional identity as a modern **Data Science engineer** — not a generic web developer, not a generic "AI enthusiast." Every design and engineering decision serves this identity first.

## Why this project exists
- Convert a resume-level introduction into an experience that recruiters, hiring managers, and technical peers remember.
- Demonstrate craft directly: the site itself is proof of technical + design competence, not just a claim of it.
- Create a durable, low-maintenance asset that can be updated with new projects/content without redesigning the system each time.

## Target audience (in priority order)
1. **Hiring Managers / Recruiters** — scanning for role fit fast; need skills + impact legible in <30s.
2. **Tech Leads / Senior Engineers** — evaluating technical depth; want to see real systems (MLOps, architecture, data pipelines), not just buzzwords.
3. **AI Agents / ATS-adjacent tools** — parsing structured content (SEO metadata, semantic HTML, structured data) to index the site correctly.
4. **General visitors / owner (ManhNha)** — the site also functions as a living portfolio ManhNha is proud to share informally (LinkedIn, GitHub, socials).

See `docs/profiles/` for detailed persona breakdowns per audience.

## Success criteria
- A visitor understands "this person does Data Science / ML / AI at a production level" within the first viewport.
- The site feels indistinguishable in polish from Awwwards-nominated product marketing sites (Linear, Stripe, Vercel tier).
- Core Web Vitals stay in the "Good" band despite rich motion (see `engineering/Performance.md`).
- Fully accessible and usable with reduced motion / keyboard-only navigation.
- Ships in English first; architecture supports adding Vietnamese without a rebuild (see `ProductRequirements.md`).

## Non-goals (explicitly out of scope for v1)
- Not a full CMS/blogging platform (a `Blog` playbook exists as a stretch/future scope, not v1).
- Not a multi-tenant or multi-user product — single-owner content.
- Not optimizing for every browser/device edge case — modern evergreen browsers only.
