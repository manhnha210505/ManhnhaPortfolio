# Page Transitions

## Scope
Since v1 is a single scrolling page (per `foundation/ProductRequirements.md` sitemap), "page transitions" mainly apply to:
- Initial load sequence
- Future multi-route growth (Phase 2 i18n, potential Blog, or a future project-per-route upgrade)

**Locked via `/clarify` (spec.md, 2026-07-31): project case studies use inline expand/collapse on the same page for v1 — no modal, no separate route.** This trades away shareable per-project URLs and per-project SEO indexing in exchange for simplicity, which is the right call at 2 projects. Revisit as Option C (dedicated routes, e.g. `/projects/image-captioning`) once the project count grows enough that direct linking/SEO starts to matter — treat this as a known, intentional v1 limitation, not an oversight.

## Load sequence
A premium, once-per-session loading sequence: brief, purposeful (not a generic spinner), respects `prefers-reduced-motion` (skip straight to content), and never blocks perceived load beyond ~1–1.5s even on slower connections — see budget alignment with `engineering/Performance.md`.

## Route-level transitions (future routes, once introduced)
Not applicable to v1 project case studies (locked as inline expand, see Scope above). If Phase 2/v2 introduces real routes (i18n locale segments, a project-detail route upgrade, or a future Blog), use an elegant fade/cross-fade or shared-element transition via `motion`'s layout animation support — evaluate Next.js View Transitions API as it matures, document the choice via ADR if adopted. Never let a transition delay the user from reading content — motion overlays content, it doesn't gate it.
