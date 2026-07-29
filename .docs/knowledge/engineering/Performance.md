# Performance

## Targets
- Core Web Vitals in the "Good" band: LCP < 2.5s, INP < 200ms, CLS < 0.1 — despite a motion-heavy design.
- 60 FPS for all scroll-linked and hover animations on mid-tier devices, not just high-end.

## Techniques (mandatory, not optional)
- GPU-accelerated transitions only (`transform`/`opacity`) — never animate `top`/`left`/`width`/`height` directly.
- Intersection Observer for scroll-reveal — no scroll-event polling.
- Lazy-load below-the-fold content and non-critical images.
- Modern image formats (AVIF/WebP) served from Cloudflare R2, responsive `srcset`/`sizes`.
- Code-split React Three Fiber (if the signature element requires it) — never in the main bundle if unused elsewhere.
- Reduced-motion users get an equally fast (often faster) experience — see `engineering/Accessibility.md`.

## Budgets
- Set and enforce a JS bundle budget in CI (fail build if exceeded) once initial implementation lands — exact number to be set after first working build, not guessed upfront.
