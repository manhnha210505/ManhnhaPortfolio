# Project Constitution

These are the non-negotiable priorities for every decision on this project, in strict order. When two priorities conflict, the higher one wins — no exceptions, no "just this once."

1. **Functional correctness** — the site must work: forms submit, data loads, links resolve, nothing is broken.
2. **Maintainability** — code and content structure must stay simple enough to extend (new projects, new sections, i18n Phase 2) without a rebuild. Visual complexity never justifies architectural complexity.
3. **Accessibility** — never sacrificed for aesthetics or motion. See `engineering/Accessibility.md`.
4. **Performance** — decorative effects are cut before performance budgets are. See `engineering/Performance.md`.

## How this governs AI agents
Any AI coding agent (Antigravity, or any spec-kit-driven agent) working on this repo must resolve conflicts using this exact ordering. If `taste-skill` suggests an enhancement that would compromise items 1–4, the enhancement is rejected or scoped down — see `governance/TasteRules.md` and `governance/AgentRules.md`.

## Amendment
This file only changes with an explicit, deliberate decision by the project owner (ManhNha) — not silently during implementation. If an agent believes a priority conflict requires a constitutional change, it should flag it, not resolve it unilaterally.
