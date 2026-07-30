# Critique: Stripe

## What it does well
Stripe's marketing pages are the benchmark for making a genuinely complex technical product (payments infrastructure) feel approachable through layered illustration, gradient mesh backgrounds, and confident use of color to differentiate sections without breaking the overall system. Their docs-adjacent pages also show technical credibility can coexist with polish — code snippets, real API examples, presented beautifully.

## What to borrow
- **Technical credibility through real artifacts** — Stripe doesn't just claim "easy to integrate," it shows the actual code. Directly applicable to `docs/playbooks/ProjectsSection.md`: showing real metrics (BLEU-4 0.1883, k-NN accuracy 96%) in a styled `StatusTag` component (`design/ComponentGuidelines.md`) does the same job — proof over adjectives.
- **Color-coded section differentiation** — Stripe uses shifting gradient/color moods per section while staying on one system. Could translate to subtle accent-intensity variation per ManhnhaPortfolio section without breaking the single-cyan-accent rule in `ColorSystem.md`.

## Where to diverge
Stripe's illustration style (soft gradient meshes, abstract 3D blobs) is the opposite direction from Mecha Typography's hard-edged, linework-driven aesthetic — do not blend the two. If a 3D/illustrative element is ever added (e.g. via React Three Fiber for the signature element), it should read as schematic/wireframe, not soft-gradient-blob, to stay consistent with `design/MechaTypographySystem.md`.
