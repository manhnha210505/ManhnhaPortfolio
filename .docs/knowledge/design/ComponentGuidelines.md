# Component Guidelines

## Base layer
Build on shadcn/ui primitives rather than hand-rolling common components (buttons, inputs, dialogs, cards) — customize via Tailwind theme + component variants, not by forking shadcn source unless necessary.

## States every interactive component must define
- Default, hover, focus-visible, active/pressed, disabled, loading (where relevant — e.g. contact form submit button).
- Focus-visible must be keyboard-navigable and clearly visible (see `engineering/Accessibility.md`) — do not remove focus rings without an equally visible replacement.

## Motion coupling
Components that animate (buttons with magnetic/ripple effects, cards with hover elevation) should consume shared variants from `components/motion/` (see `architecture/FolderStructure.md`) rather than each defining its own transition values — keeps `motion/AnimationPrinciples.md` timing rules consistent site-wide.

## Naming & composition
- Prefer composable primitives (`Card`, `CardHeader`, `CardContent`) over monolithic one-off components.
- Section-specific components live under `components/sections/<SectionName>/`, shared primitives under `components/ui/`.
