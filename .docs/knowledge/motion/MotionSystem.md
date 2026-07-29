# Motion System (Technical)

## Library
Use the unified **`motion`** npm package for all JS-driven animation (this supersedes the earlier split between "Framer Motion" and "Motion One" — those have merged into one library; do not install both). Reserve GSAP only for effects `motion` genuinely cannot handle well (e.g. complex scroll-linked timelines) — justify with an ADR if introduced.

## Implementation rules
- **CSS transitions** for simple state changes (hover, focus) — cheaper than JS.
- **`motion`** for orchestrated/staggered sequences, spring physics, and scroll-linked reveals.
- **Transform + opacity only** for anything animated — never trigger layout (`width`, `height`, `top`, `left`).
- **Intersection Observer** (via `motion`'s `whileInView` or a shared hook) for scroll-reveal — no scroll-event polling.
- **`requestAnimationFrame`** only for custom effects not covered by the above (e.g. a bespoke cursor-follow effect).

## Reduced motion
A single shared mechanism (e.g. a `useReducedMotion` hook wrapping `motion`'s built-in support) — every animated component consumes it, no per-component reimplementation. See `engineering/Accessibility.md`.

## Where variants live
Centralized in `components/motion/` (see `architecture/FolderStructure.md`) — duration/easing pulled from `design/DesignTokens.md` tokens, not hardcoded per component.
