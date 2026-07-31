<!--
Sync Impact Report
- Version change: Initial → v1.0.0
- List of modified principles:
  - Principle I: Functional Correctness (Priority 1)
  - Principle II: Maintainability (Priority 2)
  - Principle III: Accessibility (Priority 3)
  - Principle IV: Performance (Priority 4)
- Added sections: AI Agent Governance, Governance & Amendment
- Removed sections: N/A
- Templates requiring updates:
  - .specify/templates/plan-template.md: ✅ aligned
  - .specify/templates/spec-template.md: ✅ aligned
  - .specify/templates/tasks-template.md: ✅ aligned
- Follow-up TODOs: None
-->

# ManhnhaPortfolio Constitution

## Core Principles

### I. Functional Correctness (Priority 1 - Highest)

The site MUST work: forms submit, data loads, links resolve, and no critical functions are broken. Correctness overrides all visual or technical tradeoffs.

### II. Maintainability (Priority 2)

Code and content structure MUST remain simple enough to extend (new projects, new sections, i18n Phase 2) without requiring a complete rebuild. Visual complexity MUST NEVER justify architectural complexity.

### III. Accessibility (Priority 3)

Accessibility MUST NEVER be sacrificed for aesthetics, motion, or design trends. All interactive and content elements MUST adhere to accessibility guidelines (see `engineering/Accessibility.md`).

### IV. Performance (Priority 4)

Performance budgets MUST be preserved. Decorative effects and heavy visual assets MUST be cut before performance budgets are compromised (see `engineering/Performance.md`).

## AI Agent Governance

Any AI coding agent (Antigravity or any spec-kit-driven agent) working on this repository MUST resolve decision conflicts using the exact priority ordering above: Functional Correctness > Maintainability > Accessibility > Performance.

If any design or enhancement tool (e.g., `taste-skill`) suggests changes that compromise higher-priority principles, the enhancement MUST be rejected or scoped down (refer to `governance/TasteRules.md` and `governance/AgentRules.md`).

## Governance & Amendment

This constitution supersedes all non-constitutional development practices.

Amendments to this constitution require an explicit, deliberate decision by the project owner (ManhNha) — amendments MUST NOT be made silently during implementation. If an agent encounters a priority conflict that appears to require a constitutional change, it MUST flag the issue for owner review rather than resolving it unilaterally.

**Version**: 1.0.0 | **Ratified**: 2026-07-30 | **Last Amended**: 2026-07-30
