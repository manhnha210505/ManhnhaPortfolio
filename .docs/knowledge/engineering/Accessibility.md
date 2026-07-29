# Accessibility

## Baseline target
WCAG 2.1 AA across the site.

## Motion
- Full `prefers-reduced-motion` support: scroll-reveal, parallax, and cinematic transitions must have a reduced/instant fallback — implemented once in shared motion variants (`components/motion/`), not per-component.
- No motion that could trigger vestibular discomfort (no large-scale uncontrolled parallax, no flashing).
- Critical information (form validation, status changes) must never be conveyed by animation/color alone — always paired with text/icon.

## Keyboard & navigation
- Every interactive element reachable and operable via keyboard, in a logical tab order.
- Visible focus states on all interactive elements (see `design/ComponentGuidelines.md`) — never `outline: none` without a replacement.
- Skip-to-content link for keyboard/screen-reader users.

## Contrast & structure
- All text meets AA contrast against its background, including on any glassmorphism/overlay surfaces.
- Semantic HTML landmarks (`nav`, `main`, `section`, `footer`) and heading hierarchy (single `h1`, logical nesting) — this also directly serves `engineering/SEO.md`.
- Form fields have associated labels (not placeholder-as-label).
