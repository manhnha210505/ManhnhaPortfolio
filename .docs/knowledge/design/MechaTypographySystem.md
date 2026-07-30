# Mecha Typography — Visual Language

## Status
Chosen design direction, replacing the plain "Apple/Linear/Stripe minimal" default noted as generic-risk in the original `DesignPhilosophy.md`. This document is the source of truth for the visual system; `ColorSystem.md`, `Typography.md`, and `ComponentGuidelines.md` are updated to reference it.

## Level of application: **Medium**
HUD-style panels, section numbering, schematic linework, and a technical accent color — applied as a **consistent system language**, not full anime-HUD saturation (no screen-shake, no dense glitch text, no overlapping readouts). The site should read first as "premium engineering portfolio," second as "has a mecha-inspired system" — never the reverse. This directly protects the Recruiter/HiringManager scan-in-15-seconds requirement (`profiles/Recruiter.md`, `profiles/HiringManager.md`) while still being genuinely distinctive.

## Core motifs (use these, and only these, consistently across sections)

1. **Corner brackets** — thin-line `⌐` / `¬`-style brackets at the corners of panels/cards (like a HUD target-lock frame), used on Project cards, the signature element container, and key stat callouts. Not on every element — reserve for content that deserves a "this is a system readout" framing.
2. **Section numbering** — every major section gets a two-digit index + total (e.g. `01 / 06 — HERO`, `04 / 06 — PROJECTS`), small, monospace, low-opacity, positioned consistently (e.g. top-left of each section). This also serves as a subtle in-page nav aid.
3. **Schematic linework** — thin connector lines (1px, low-opacity) linking labels to the elements they annotate, similar to a blueprint callout — used sparingly on the signature data-viz element and possibly the Skills section (connecting a skill to its category).
4. **Status/label tags** — small monospace all-caps labels in bracketed tags, e.g. `[ACTIVE]`, `[TEAM PROJECT]`, `[BLEU-4: 0.1883]` — used on Project cards to surface key facts (team vs. solo, core metric) at a glance, which conveniently also serves the honesty requirement in `branding/Storytelling.md`.
5. **Angular panel edges** — a single consistent clipped-corner treatment (e.g. one corner cut at 45°, via `clip-path`) on primary panels (Hero card, Project cards) — apply once as a system rule, not per-element variation.

## Explicitly avoided (keeps this "medium," not "full")
- No screen-glitch/CRT distortion effects.
- No dense background HUD readouts or fake telemetry text as decoration.
- No katakana/foreign-script decoration (would read as costume, not identity).
- No more than one accent color family in active use at once (see `ColorSystem.md`).

## Typography implication
Mecha-style angular/industrial display faces are used **only** for the section index numbers, status tags, and possibly the Hero headline at large display size — never for body copy, which stays on a clean, highly legible sans/mono pairing. See `Typography.md`.

## Relationship to existing docs
- Resolves the genericness risk flagged in `DesignPhilosophy.md` — update that file's "mitigations" section to point here instead of leaving it as an open problem.
- `motion/MicroInteractions.md` patterns (hover elevation, magnetic buttons, card expansion) stay as-is technically, but their *visual dressing* should read as "panel engaging/disengaging" (e.g. a card's corner brackets tighten slightly on hover) rather than generic soft-UI hover — a small but consistent detail that reinforces the system everywhere it appears.
- Does not change `foundation/TechnicalIdentity.md` or content — it's purely the visual expression layer.
