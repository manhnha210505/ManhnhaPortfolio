# Code Standards

## Tooling
- **ESLint + Prettier** — enforced pre-commit via **Husky + lint-staged**; no unformatted/lint-failing code merges.
- **TypeScript strict mode** — no implicit `any`, no unchecked Supabase response types (generate/derive types from the Supabase schema, don't hand-write duplicate interfaces).
- **CI (GitHub Actions)** — lint, typecheck, build, and Playwright E2E must all pass before merge.
- **Dependabot OR Renovate** — pick one (see `architecture/TechStack.md`); do not run both.

## Conventions
- Components: PascalCase file + export name, colocated with their styles/tests where practical.
- Copy/content: never inline in JSX — sourced from `content/` (see `architecture/FolderStructure.md`), required for i18n Phase 2.
- Motion values: always via shared variants/tokens, never magic numbers in a component (see `design/DesignTokens.md`).
- Supabase queries: centralized in `lib/supabase/`, typed, no ad hoc `fetch`/client calls scattered through components.

## Review bar
A PR is not done because it "looks right" — it must satisfy `governance/DefinitionOfDone.md` (accessibility, performance, motion rules, i18n-readiness) before merge.
