# Design System — Overview

This file is the index tying together the design knowledge base. Single source of truth ordering:

1. `DesignPhilosophy.md` — principles and intent
2. `DesignTokens.md` — the literal token values (color, type, spacing, radius, shadow, motion durations)
3. `ColorSystem.md` / `Typography.md` / `LayoutSystem.md` — the reasoning behind specific token categories
4. `ComponentGuidelines.md` — how tokens compose into components
5. `docs/knowledge/motion/` — how components move
6. `docs/playbooks/` — how components compose into actual sections

## Rule
Any visual decision made during implementation that isn't traceable to a token in `DesignTokens.md` is a bug, not a feature — either it should be added as a token (if it'll recur) or it's scope creep (flag it, don't just ship it). This keeps taste-skill enhancements (`governance/TasteRules.md`) from silently drifting the system.
