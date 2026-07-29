# Color System

## Current direction (not yet locked)
Dark theme with a single accent color (green under discussion). This is a **reasonable starting hypothesis**, not a final decision — see the genericness risk noted in `DesignPhilosophy.md`.

## Before locking the palette, resolve
1. Does the accent hue connect to anything specific about ManhNha's identity (a project domain, a personal signature, a deliberate contrast to the Apple/Linear/Stripe norm of blue/purple/green defaults)? If the answer is "it just looked good," push further.
2. Test the accent against **data-visualization use cases** — if the signature element is a chart/graph, the accent needs to work as a categorical/sequential palette anchor, not just a UI highlight color.
3. Confirm contrast ratios meet WCAG AA at minimum (`engineering/Accessibility.md`) across all states (default, hover, disabled, on-dark, on-light if any light surfaces exist).

## Structure (define regardless of final hues)
- `background` — base, elevated, overlay layers (dark theme needs at least 2–3 elevation steps to avoid flatness).
- `foreground` — primary text, secondary/muted text, disabled text.
- `accent` — primary accent, hover/active state, subtle accent (for backgrounds/borders at low opacity).
- `border` — default, subtle, focus-visible ring.
- `semantic` — success, error, warning, info (needed for the contact form states).
- `data-viz` — a small categorical palette reserved for the signature element / any charts, distinct from UI accent so charts don't visually compete with buttons/links.

Final token values belong in `design/DesignTokens.md` once locked, and should be implemented as CSS variables / Tailwind theme extension, never hardcoded hex in components.
