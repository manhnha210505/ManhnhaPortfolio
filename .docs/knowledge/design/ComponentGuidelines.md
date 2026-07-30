# Component Guidelines

## Base layer
Build on shadcn/ui primitives rather than hand-rolling common components (buttons, inputs, dialogs, cards) — customize via Tailwind theme + component variants, not by forking shadcn source unless necessary.

## Mecha Typography system components
Per `design/MechaTypographySystem.md` (medium application), the following are shared, reusable primitives — build each ONCE and reuse everywhere it appears, never redefine per section:
- **`PanelFrame`** — wraps Project cards, the signature-element container, and key stat callouts with the corner-bracket treatment. Takes children + optional section-index label.
- **`SectionIndex`** — the `01 / 06 — SECTION NAME` label, positioned consistently per section.
- **`StatusTag`** — small bracketed monospace label (`[ACTIVE]`, `[TEAM PROJECT]`, `[BLEU-4: 0.1883]`), accent-colored per `ColorSystem.md`'s semantic/accent separation.
- **`SchematicConnector`** — thin annotation line linking a label to an element (signature element, possibly Skills section).

Apply these consistently — if a new section wants a "one-off" bracket or tag style, that's scope creep on the system; extend the shared primitive instead of forking a new pattern.

## States every interactive component must define
- Default, hover, focus-visible, active/pressed, disabled, loading (where relevant — e.g. contact form submit button).
- Focus-visible must be keyboard-navigable and clearly visible (see `engineering/Accessibility.md`) — do not remove focus rings without an equally visible replacement.

## Motion coupling
Components that animate (buttons with magnetic/ripple effects, cards with hover elevation) should consume shared variants from `components/motion/` (see `architecture/FolderStructure.md`) rather than each defining its own transition values — keeps `motion/AnimationPrinciples.md` timing rules consistent site-wide.

## Naming & composition
- Prefer composable primitives (`Card`, `CardHeader`, `CardContent`) over monolithic one-off components.
- Section-specific components live under `components/sections/<SectionName>/`, shared primitives under `components/ui/`.
