# Taste Rules

Boundaries for `taste-skill` usage on this project.

## What taste-skill IS for
- Elevating visual polish: spacing refinement, typography pairing, color nuance, micro-interaction quality, motion timing/easing — within the system defined in `docs/knowledge/design/` and `docs/knowledge/motion/`.
- Catching "generic AI output" smells (see the genericness risk flagged in `design/DesignPhilosophy.md`) and pushing toward more distinctive execution.

## What taste-skill is NOT for
- Changing scope, architecture, or functional requirements — that's `spec.md`/`plan.md` territory (see `governance/SpecKitRules.md`).
- Introducing new dependencies (a new animation library, a new component kit) — requires an ADR, same as any agent-proposed dependency (`governance/AgentRules.md`).
- Overriding accessibility or performance requirements for a "cooler" effect — `ProjectConstitution.md` ordering always wins.

## Process
Apply taste-skill enhancements as a pass **after** functional implementation of a section is spec-compliant, not interleaved in a way that makes it hard to tell which changes were functional vs. aesthetic. Escalate any conflict between taste-skill's suggestion and a documented rule to the project owner rather than resolving it silently.
