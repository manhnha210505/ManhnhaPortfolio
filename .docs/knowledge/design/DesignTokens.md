# Design Tokens

Structural definition of the token set. **Values are placeholders / TBD** where marked — finalize during the design pass before `/plan` locks implementation, per open decisions in `foundation/ProductRequirements.md` and `design/ColorSystem.md`.

## Categories
- **Color** — background/foreground/accent/border/semantic/data-viz (see `ColorSystem.md`) — *values TBD*
- **Typography** — font family (TBD), type scale, weights, line-heights (see `Typography.md`)
- **Spacing** — base unit + scale (recommend 4px base: 4/8/12/16/24/32/48/64/96/128)
- **Radius** — small (inputs/badges), medium (cards), large (modals/hero panels) — keep to 3 steps max for consistency
- **Shadow / elevation** — 2–3 steps for dark-theme elevation (see `ColorSystem.md` background layers)
- **Motion durations & easing** — see `motion/MotionSystem.md` for the authoritative values; mirrored here as tokens (e.g. `--duration-fast: 200ms`, `--duration-base: 400ms`, `--duration-slow: 800ms`) so components reference tokens, not raw ms.

## Implementation
- Represent as CSS variables at the `:root` level, mapped into `tailwind.config` theme extension.
- No component should hardcode a raw value for anything listed above — always reference the token.
