# Animation Principles

## Every animation must be intentional
Motion guides attention and reinforces hierarchy — it is never decoration for its own sake. Before adding an animation, be able to answer: *what is this motion telling the user to look at or understand?*

## Sequencing hierarchy
1. Primary content animates first (headline, key visual).
2. Secondary content follows.
3. Decorative elements animate last, if at all.
4. Never animate everything simultaneously — always stagger.

## Timing
- Duration range: **300ms–1200ms** for standard UI transitions.
- Avoid excessive bounce/overshoot — motion should feel premium and controlled, not playful/bouncy (that undercuts the "precision engineer" identity from `foundation/TechnicalIdentity.md`).
- Natural acceleration/deceleration — spring-based or well-chosen easing curves, not linear.

## Discipline
- Never let animation delay navigation or block interaction — motion is additive, never a gate.
- Respect user attention: fewer, more meaningful animations beat many small ones competing for focus.
- All timing values must come from tokens (`design/DesignTokens.md`), not per-component magic numbers.
