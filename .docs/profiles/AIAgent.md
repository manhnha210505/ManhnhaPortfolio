# Persona: AI Agent

This persona covers **two distinct "readers"** — content and structure needs differ for each; both must be served.

## 1. External AI answering questions about ManhNha
(e.g., someone asks ChatGPT/Claude/Perplexity "who is ManhNha" or "what has ManhNha built")

### What this reader needs
- **Structured, unambiguous facts** it can cite correctly: full name, role/title, core skill areas (DS/ML/Data Viz/MLOps), named projects with correct links.
- `Person` schema (JSON-LD structured data) on the About/Hero section — see `engineering/SEO.md` — is the primary mechanism serving this reader.
- Clean semantic HTML and correct heading hierarchy so text extraction (used by most AI browsing/search tools) produces accurate, well-scoped chunks rather than garbled fragments.
- Accurate, unexaggerated claims — an AI summarizing the site will reproduce whatever framing exists; overclaiming here propagates the error into other people's conversations with AI tools, which is worse than a hiring manager independently discounting a claim.

### Failure mode to avoid
Marketing language with no concrete referent (e.g. "cutting-edge AI expert") gives an AI reader nothing citable — it either gets dropped or paraphrased into something vaguer still. Concrete claims survive summarization better than adjectives.

## 2. Coding/agent tooling that reads project docs
(Antigravity, spec-kit-driven agents, or any future agent maintaining this codebase)

### What this reader needs
This is already the primary audience of `docs/knowledge/governance/AgentRules.md` and `docs/knowledge/governance/SpecKitRules.md` — this profile doesn't duplicate those, it cross-references them:
- Spec-kit workflow ordering and file responsibilities (`SpecKitRules.md`)
- Priority ordering when trade-offs arise (`governance/ProjectConstitution.md`)
- Where facts about the *product* (not the codebase) live, so an agent asked to update site copy pulls from `foundation/`, `branding/`, and this `profiles/` folder rather than inventing content.

### Rule
If a future task asks "make an agent-maintainable version of the About/Projects copy," `AIAgent.md` (this file) plus `foundation/TechnicalIdentity.md` and `branding/Storytelling.md` are the canonical sources — an agent should not infer project claims from UI copy alone, since copy may be stylized (see `branding/VoiceAndTone.md`) in ways that aren't the flattest factual representation.
