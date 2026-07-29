# Persona: Hiring Manager

## Who they are
A technical or semi-technical manager deciding whether to move a candidate to interview. More scrutiny than a recruiter, less than a Tech Lead doing a deep code/architecture review.

## Time on site
~1–3 minutes, split between the Hero/About/Skills overview and one or two Projects they choose to open. They're building a "should I spend an interview slot on this person" judgment.

## What they're evaluating
- **Breadth vs depth balance**: does this person understand the DS/ML lifecycle end-to-end (per `foundation/TechnicalIdentity.md`: analysis → modeling → MLOps → backend/cloud), or just one narrow slice?
- **Communication ability**: can they explain a technical project (Image Captioning) in a way a hiring manager — who may not read architecture diagrams fluently — still understands the problem, approach, and result? This is exactly the `Problem → Approach → Impact` structure in `branding/Storytelling.md`.
- **Judgment, not just skill**: do write-ups show awareness of limitations and trade-offs (e.g. the Image Captioning project's own documented failure modes — gender misclassification, repetition) rather than only claiming success? Honest self-assessment reads as more senior than a polished-only narrative.

## What convinces them
- A Projects section where at least one case study has enough substance to demonstrate real technical reasoning — not just a screenshot and a GitHub link.
- Clear, quantified outcomes where available (e.g. BLEU-4 0.1883 vs. CNN+LSTM baselines 0.0857–0.1167 for the Image Captioning project) presented in context, not as unexplained numbers.
- Evidence of collaboration where relevant — the Image Captioning project was a 4-person team project (HUFLIT Computer Vision course); state this honestly and be specific about ManhNha's individual contribution (architecture/training/eval/demo — clarify which parts were personally owned) rather than implying solo authorship. This is a `branding/Storytelling.md` honesty requirement, not optional polish.

## What loses them
- Overclaiming — a hiring manager who reads the linked GitHub repo and finds a team project not disclosed as such will discount everything else on the page.
- No visible reasoning — a project listed with only "used ViT + Transformer" and no problem framing or result reads as a tutorial follow-along, not engineering work.
