# Definition of Done

A section/feature is not "done" until every item below is true:

## Functional
- [ ] Matches `spec.md` requirements exactly (no missing, no unrequested extra scope)
- [ ] All interactive elements work as specified (forms, nav, links)
- [ ] Content sourced from `content/` or Supabase, never hardcoded strings meant to be dynamic

## Design & motion
- [ ] Uses only tokens from `design/DesignTokens.md` (no ad hoc colors/spacing/radii)
- [ ] Motion follows `motion/AnimationPrinciples.md` (timing, stagger, hierarchy)
- [ ] Works correctly under `prefers-reduced-motion`

## Accessibility
- [ ] Keyboard-navigable, visible focus states
- [ ] Passes contrast checks (AA)
- [ ] Semantic HTML / correct heading hierarchy

## Performance
- [ ] No layout shift introduced (CLS-safe)
- [ ] Animates only `transform`/`opacity`
- [ ] Images optimized and lazy-loaded where appropriate

## Quality gates
- [ ] Lint/typecheck/build pass in CI
- [ ] Relevant Playwright coverage added/updated
- [ ] i18n-ready (no inline hardcoded copy) per `foundation/ProductRequirements.md`
