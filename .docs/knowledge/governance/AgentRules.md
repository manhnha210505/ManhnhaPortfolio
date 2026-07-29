# Agent Rules

Rules for any AI agent (Antigravity IDE, or other spec-kit-integrated agents) operating on this repository.

1. **Spec-kit is the source of truth for scope.** Implement what `spec.md`/`plan.md`/`tasks.md` describe — do not add features, sections, or dependencies not present in the spec without flagging it first.
2. **Follow `ProjectConstitution.md` ordering** when priorities conflict (correctness > maintainability > accessibility > performance > decoration).
3. **No unapproved dependencies.** Adding a new package (animation library, chart library, etc.) requires a corresponding ADR in `docs/decisions/`, not a silent `npm install` mid-task.
4. **Respect the design system.** Reference `design/DesignTokens.md` and `motion/MotionSystem.md` — don't invent new colors, spacing values, or durations inline.
5. **Open decisions stay open.** Several items (signature element, exact color palette, typography) are explicitly marked "not yet locked" across these docs — an agent should not silently finalize them by shipping a hardcoded implementation; surface the decision to the owner.
6. **Taste-skill is additive, not authoritative.** It enhances what spec-kit already scoped; it never overrides functional requirements. See `governance/TasteRules.md`.
