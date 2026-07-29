# Persona: Tech Lead

## Who they are
A senior engineer or ML practitioner doing genuine technical due diligence — reads the GitHub repo, not just the portfolio page. The highest-scrutiny persona.

## What they need to be convinced of (per your priority)
**The technical quality of the ML/DS work itself** — architecture choices, experimental rigor, and depth of understanding — is the primary bar. Not MLOps/production polish, not portfolio code quality (those matter, but secondary to this).

## What they'll specifically check, using Image Captioning as the reference project
- **Architecture reasoning**: why ViT encoder + Transformer decoder instead of the classic CNN+RNN/LSTM pipeline — the README already frames this as a deliberate research question ("explore a fully attention-based alternative"), which is exactly the kind of framing a Tech Lead respects. Make sure the portfolio case study preserves this "why," not just the "what."
- **Experimental rigor**: dataset size and split (Flickr8k, 8,091 images, 30k/5k/5k train/val/test), training configuration (50 max epochs, early stopping at epoch 8, `ReduceLROnPlateau`), and honest metric reporting (BLEU-1 through BLEU-4, compared against named baselines) — a Tech Lead will notice if the case study cherry-picks only the best number instead of showing this full picture.
- **Understanding of limitations, not just results**: the project's own documented failure modes (gender misclassification, token repetition, Flickr8k's limited linguistic diversity capping BLEU regardless of model quality) are a *strength* to surface, not a weakness to hide — they demonstrate the difference between running a model and understanding it.
- **Awareness of the field**: the Future Work section (stronger backbones like Swin/BEiT/SigLIP, larger decoders, LoRA/QLoRA fine-tuning) signals current awareness of the space — worth surfacing briefly in the case study to show this wasn't a one-off exercise.

## What loses them
- A case study that reads as marketing copy over the actual README (vague superlatives, missing numbers).
- Silence on the team-project context — a Tech Lead who clicks through to GitHub and sees 4 authors, with the site implying solo work, will read that as a credibility problem, not a neutral omission.
- No link to the actual repo/code — this persona wants to read the source, not just a description of it.
