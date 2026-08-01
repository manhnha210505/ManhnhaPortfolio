# ADR-0008: Unit & Component Testing — Vitest alongside Playwright

## Status
Accepted

## Context
`TechStack.md` specifies Playwright for E2E testing. However, isolated logic such as server-side rate limiting (`rate-limit.ts`), contact form input validation, and data formatting utility functions need fast, lightweight unit and component tests that do not require spinning up a browser instance or full E2E server pipeline.

## Decision
Adopt **Vitest** as the unit and component testing framework alongside Playwright:
- **Playwright**: Dedicated exclusively to E2E flows, visual regression testing, cross-browser verification, and full page user journey scenarios (VS-001 through VS-011).
- **Vitest**: Dedicated to fast, isolated unit testing of utility modules (`lib/utils/`), form validation schemas, server actions, and component rendering logic.

## Why Vitest specifically
- **Next.js & TypeScript Compatibility**: Vitest provides instant startup, native ESM & TypeScript support out of the box without complex Jest configuration overhead.
- **API Parity**: Uses standard `describe`, `it`, `expect` syntax without heavy configuration overhead.
- **Separation of Concerns**: Prevents E2E test suites (Playwright) from getting bloated with small unit-level edge cases, keeping CI execution fast and deterministic.

## Consequences
- Requires `vitest` added to `devDependencies` in `package.json`.
- `pnpm test:unit` executes Vitest tests; `pnpm test:e2e` executes Playwright tests.
- CI pipeline in GitHub Actions runs unit tests (Vitest) prior to E2E suites (Playwright).
