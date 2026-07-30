# Color System

## Chosen direction: dark + cyan technical accent
Dark theme confirmed, with the accent hue set to **cyan/blue** — evokes radar/technical-display screens rather than a generic brand-blue or the even more generic dark-mode default of green. This directly ties into the Mecha Typography system (`design/MechaTypographySystem.md`): corner brackets, section index numbers, status tags, and schematic linework all render in this accent, giving the color a *functional* role (it means "system readout") rather than being decorative.

## Semantic vs. accent separation
Because cyan is now doing double duty as both brand accent *and* "HUD active" signal, keep `semantic.success` as a distinct green (not cyan) to avoid ambiguity between "this is styled as a system element" and "this succeeded." Reserve a secondary amber/orange strictly for `semantic.warning` and `semantic.error`-adjacent status tags (e.g. a `[TEAM PROJECT]` tag could use a neutral/amber tone rather than cyan, to visually distinguish "context label" from "primary accent") — confirm this distinction during implementation rather than defaulting everything to cyan.

## Before finalizing exact hex values, resolve
1. Contrast-check the chosen cyan against the dark background at all required states (default, hover, focus-visible ring) — cyan-on-near-black often needs a slightly desaturated/lightened value to hit WCAG AA (`engineering/Accessibility.md`), a fully saturated "neon" cyan will likely fail.
2. Confirm the cyan reads well both as fine linework (1px schematic lines, corner brackets) and as larger fills (buttons, active nav indicator) — test both before locking the token.
3. Test the accent against the **data-visualization use case** — if the signature element is a chart/graph, the accent needs to work as a categorical/sequential palette anchor alongside the `data-viz` palette below, not compete with it.

## Structure (define regardless of final hues)
- `background` — base, elevated, overlay layers (dark theme needs at least 2–3 elevation steps to avoid flatness).
- `foreground` — primary text, secondary/muted text, disabled text.
- `accent` — primary accent, hover/active state, subtle accent (for backgrounds/borders at low opacity).
- `border` — default, subtle, focus-visible ring.
- `semantic` — success, error, warning, info (needed for the contact form states).
- `data-viz` — a small categorical palette reserved for the signature element / any charts, distinct from UI accent so charts don't visually compete with buttons/links.

Final token values belong in `design/DesignTokens.md` once locked, and should be implemented as CSS variables / Tailwind theme extension, never hardcoded hex in components.
