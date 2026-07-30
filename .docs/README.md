# ManhnhaPortfolio — `.docs/`

This folder is the knowledge base behind the ManhnhaPortfolio project — everything an AI coding agent (Antigravity, or any spec-kit-driven agent) or a human collaborator needs to understand _why_ the site is built the way it is, before touching `.specify/` or writing any code.

> **Naming note:** this folder is `.docs/` (hidden) in the actual repo, not `docs/`. All cross-references between files in this knowledge base use paths like `foundation/ProjectVision.md` relative to this folder — read them as `.docs/knowledge/foundation/ProjectVision.md` etc.

## How this folder is organized

| Folder       | What's in it                                                                                                                                            | Who reads it                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `sources/`   | Raw input — `PersonalProfile.md` (the single source of truth for ManhNha's actual data: bio, education, skills, projects, etc.), original prompt drafts | Whoever is updating personal/content data                                                                                         |
| `knowledge/` | The reference knowledge base — foundation, architecture, design, engineering, governance, motion, branding                                              | Primarily AI agents authoring `spec.md`/`plan.md`; also the owner for review                                                      |
| `profiles/`  | Who the site is _for_ — Recruiter, HiringManager, TechLead, AIAgent, Owner personas                                                                     | Anyone deciding what content/emphasis a section needs                                                                             |
| `playbooks/` | Concrete content + structure per site section (Hero, About, Skills, Projects, Contact, Footer, Navbar, Animation, Blog)                                 | Whoever implements or reviews a specific section                                                                                  |
| `critiques/` | Design-reference teardowns (Apple, Linear, Stripe, Vercel, Raycast, OpenAI, Anthropic) — what to borrow vs. avoid                                       | Design/implementation decisions, especially around the Mecha Typography system                                                    |
| `decisions/` | ADRs — durable technical/architectural decisions and their rationale                                                                                    | Anyone about to make a conflicting technical choice — check here first                                                            |
| `prompt_vn/` | Vietnamese-language mirror of `knowledge/` for the owner's own reference                                                                                | ManhNha, not the AI agent or the live site (site content itself is English-only for v1 — see `foundation/ProductRequirements.md`) |

## Reading order

**If you're an AI agent about to run `speckit-specify` or `speckit-plan`:**

1. `knowledge/governance/ProjectConstitution.md` — the non-negotiable priority ordering
2. `knowledge/governance/SpecKitRules.md` — how this folder relates to `.specify/`
3. `knowledge/foundation/` (all 3 files) — what's being built and why
4. `sources/PersonalProfile.md` — the actual data (check for `⚠️` placeholders — those fields are still incomplete)
5. `knowledge/architecture/` — tech stack, system shape, database schema
6. `knowledge/design/` — including `MechaTypographySystem.md`, the current binding visual direction
7. `playbooks/` — section-by-section content already drafted
8. `knowledge/governance/AgentRules.md` and `TasteRules.md` — operating rules while implementing

**If you're ManhNha reviewing before a milestone:** start at `profiles/Owner.md` — it's a self-check checklist that links out to everything else relevant.

## Current status (keep this section updated)

- **Design direction**: locked — Mecha Typography, medium application, dark theme + cyan accent (`knowledge/design/MechaTypographySystem.md`, `ColorSystem.md`).
- **Content storage**: locked — Supabase tables, edited via Table Editor, no custom admin UI (`decisions/ADR-0006-Content-Storage-Strategy.md`).
- **Still open / incomplete** (see `⚠️` markers in `sources/PersonalProfile.md` and `playbooks/`):
  - Career goals (target role, short/long-term direction) — Mục 2
  - Notable coursework (Mục 3)
  - Certificates, Activities, Awards — Mục 7–9 (may legitimately stay empty if none exist yet)
  - Exact accent color hex values, exact typefaces — need contrast/legibility testing before lock-in (`ColorSystem.md`, `Typography.md`)
  - Signature interactive element choice — still undecided between data-viz, live metrics, or scroll storytelling (`foundation/ProductRequirements.md`)
  - LinkedIn URL, resume/CV file — not yet provided
- **Not yet started**: `app/` source code, `.specify/` spec/plan/tasks files, `content/` (site copy extraction from `playbooks/` + Supabase).

## Updating this folder

- Personal/content facts change → edit `sources/PersonalProfile.md` first, then propagate to `playbooks/` and (once seeded) Supabase — never edit personal data directly in `knowledge/` or `profiles/`.
- A technical/architecture decision changes → add a new ADR in `decisions/`, don't silently edit an old one out from under a past choice.
- A design-system rule changes → update the relevant `knowledge/design/` file directly; it's the live source of truth, not a historical record.
