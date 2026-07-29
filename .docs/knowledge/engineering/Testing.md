# Testing

## E2E — Playwright
- Cover the critical path: page loads, nav works, all sections render, contact form submits successfully and shows correct success/error states.
- Test with `prefers-reduced-motion: reduce` as a distinct scenario, not just default motion.
- Run against a mobile viewport profile in addition to desktop.

## CI gating
- Playwright suite runs in GitHub Actions on every PR; failing E2E blocks merge (see `engineering/CodeStandards.md`).

## Manual/visual QA (not automated, but required before each release)
- Cross-browser spot check (latest Chrome, Safari, Firefox).
- Lighthouse/PageSpeed pass for Performance, Accessibility, SEO, Best Practices.
- Keyboard-only pass through the entire site.
