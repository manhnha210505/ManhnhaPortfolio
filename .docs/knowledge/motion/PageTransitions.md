# Page Transitions

## Scope
Since v1 is primarily a single scrolling page (per `foundation/ProductRequirements.md` sitemap), "page transitions" mainly apply to:
- Initial load sequence
- Navigating to a project detail view (if projects have dedicated routes)
- Future multi-route growth (Phase 2 i18n, potential Blog)

## Load sequence
A premium, once-per-session loading sequence: brief, purposeful (not a generic spinner), respects `prefers-reduced-motion` (skip straight to content), and never blocks perceived load beyond ~1–1.5s even on slower connections — see budget alignment with `engineering/Performance.md`.

## Route-level transitions (project detail, future routes)
- Elegant fade/cross-fade or shared-element transition (e.g. project thumbnail morphing into detail hero image) using `motion`'s layout animation support — evaluate Next.js View Transitions API as it matures, document the choice via ADR if adopted.
- Never let a transition delay the user from reading content — motion overlays content, it doesn't gate it.
