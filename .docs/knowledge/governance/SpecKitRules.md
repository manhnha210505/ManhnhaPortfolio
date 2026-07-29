# Spec-Kit Rules

## Workflow order
`speckit-constitution` → `speckit-specify` → `speckit-clarify` → `speckit-plan` → `speckit-tasks` → `speckit-implement` → `speckit-analyze` (with `speckit-checklist` and `speckit-taskstoissues` used as needed alongside).

## File responsibilities
- `.specify/memory/constitution.md` — mirrors/derives from `governance/ProjectConstitution.md`; the binding priority ordering for the whole project.
- `spec.md` — the "what": functional requirements, sitemap, content model. Should stay aligned with `foundation/ProductRequirements.md`.
- `plan.md` — the "how": technical approach, architecture choices, resolves the "open decisions" flagged throughout `docs/knowledge/` before implementation starts.
- `tasks.md` — the "in what order": broken into implementable units, each traceable back to a line in `spec.md`/`plan.md`.

## Rule for this docs/knowledge/ folder
This folder is **reference knowledge**, not spec-kit's working files — it informs `spec.md`/`plan.md` authorship and is the place agents (and ManhNha) look up rationale. When `spec.md` or `plan.md` make a decision that resolves an "open decision" noted here, update the corresponding `docs/knowledge/` file in the same change so this folder never goes stale.

## Conflict resolution
If `docs/knowledge/` and `.specify/` files disagree, `.specify/` (the active spec-kit artifacts) wins for implementation — but the discrepancy should be fixed by updating `docs/knowledge/`, not ignored.
