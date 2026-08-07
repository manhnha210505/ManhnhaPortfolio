# Tasks: Premium Data Science Portfolio

**Input**: Design documents from `/specs/001-portfolio-site/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/api-contracts.md`, `quickstart.md`
**Tests**: Unit tests using Vitest (`pnpm test:unit`) per `ADR-0008`; E2E tests using Playwright (`pnpm test:e2e`).
**Organization**: Tasks are grouped by phase and user story to enable independent implementation and testing.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, tooling setup, dependencies, and design token configuration.

- [x] T001 Initialize Next.js 15 App Router project in `src/` with TypeScript, Tailwind CSS v3, and pnpm dependencies per `plan.md`
- [x] T002 [P] Configure Tailwind CSS, custom Mecha design tokens (CSS variables in `src/styles/globals.css`), and font configuration
- [x] T003 [P] Install and configure Vitest (`vitest`) per `ADR-0008` for unit testing alongside Playwright (`@playwright/test`) for E2E testing
- [x] T004 [P] Configure ESLint, Prettier, and TypeScript configuration in `tsconfig.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure, types, Supabase clients, Mecha UI primitives, and centralized copy layer.

- [x] T005 Configure Supabase client setup in `src/lib/supabase/client.ts` and `src/lib/supabase/server.ts` with environment variables
- [x] T006 [P] Create TypeScript domain entity types and database interfaces in `src/types/portfolio.ts` and `src/types/database.ts`
- [x] T007 [P] Create centralized copy files in `src/content/en/` (`hero.ts`, `about.ts`, `skills.ts`, `projects.ts`, `contact.ts`, `footer.ts`, `meta.ts`)
- [x] T008 [P] Implement shared Motion variants and wrappers in `src/components/motion/motion-variants.ts`, `FadeIn.tsx`, and `StaggerReveal.tsx`
- [x] T009 [P] Implement Mecha Typography primitive components in `src/components/ui/panel-frame.tsx`, `section-index.tsx`, `status-tag.tsx`, and `schematic-connector.tsx`
- [x] T010 [P] Implement base shadcn/ui primitives in `src/components/ui/button.tsx`, `input.tsx`, and `textarea.tsx`

---

## Phase 3: User Story 1 - Recruiter Quick Scan (Priority: P1) 🎯 MVP

**Goal**: Enable recruiters to understand identity ("Data Science Engineer"), view CTAs, navigate sticky sections, and read bio narrative within 10–20 seconds.
**Independent Test**: Load site in fresh browser tab. Hero displays "Trần Đăng Mạnh" / "Data Science Engineer" within 3s, CTAs work, Navbar sticks and tracks scroll section.

- [x] T011 [P] [US1] Create unit tests for navigation state logic in `tests/unit/navbar.test.ts`
- [x] T012 [P] [US1] Implement sticky Navbar with Intersection Observer active section indicator in `src/components/navbar.tsx`
- [x] T013 [P] [US1] Implement Hero section component with staggered reveal animation and CTAs in `src/components/sections/HeroSection.tsx`
- [x] T014 [P] [US1] Implement About section component with bio narrative, HUFLIT education block, and hobbies line in `src/components/sections/AboutSection.tsx`
- [x] T015 [US1] Compose Hero, About, and Navbar in main page layout in `src/app/page.tsx` and `src/app/layout.tsx`

---

## Phase 4: User Story 4 - Contact Form Submission (Priority: P1) 🎯 MVP

**Goal**: Functional contact form with client validation, 3-layer spam defense (honeypot + rate-limiting + Turnstile), server action DB write, and email fallback.
**Independent Test**: Fill form with valid data + Turnstile challenge → DB insert + success message. Invalid email → client error. Failed Turnstile → graceful fallback message with direct email link.

- [x] T016 [P] [US4] Implement unit tests for rate limiting (`tests/unit/rate-limit.test.ts`) and form validation schema (`tests/unit/contact-validation.test.ts`)
- [x] T017 [P] [US4] Implement server-side rate-limiting utility backed by Upstash Redis in `src/lib/utils/rate-limit.ts`
- [x] T018 [US4] Implement Contact form server action with honeypot check, rate limiting, Cloudflare Turnstile API verification, and Supabase `contacts` insert in `src/app/actions/contact.ts`
- [x] T019 [US4] Implement Contact section UI component with client validation, Turnstile widget integration, loading/success/error states, and email fallback in `src/components/sections/ContactSection.tsx`

---

## Phase 5: User Story 2 - Hiring Manager Project Evaluation (Priority: P2)

**Goal**: Showcase Projects section with cards, meta (team size, role, course context), and inline-expandable case studies with Problem, Approach, Impact sections and quantified metrics. Also render Skills section grouped by Core, Backend & Cloud, and Languages & Tools.
**Independent Test**: Navigate to Projects, open Image Captioning case study. Verify Problem, Approach (ViT encoder + Transformer decoder), Impact (BLEU-4 0.1883), and 4-member team context.

- [x] T020 [P] [US2] Implement unit tests for project data fetching & formatting in `tests/unit/projects.test.ts`
- [x] T021 [P] [US2] Implement Skills section component displaying Core (DS/ML/DataViz/MLOps), Backend & Cloud, and Languages & Tools display groups in `src/components/sections/SkillsSection.tsx` per `data-model.md`
- [x] T022 [US2] Implement Projects section component with project cards, `[TEAM PROJECT]` status tags, and inline accordion expand/collapse in `src/components/sections/ProjectsSection.tsx`

---

## Phase 6: User Story 3 - Tech Lead Deep Dive (Priority: P3)

**Goal**: Surface technical depth details in case studies (architecture reasoning, experimental rigor, known failure modes/limitations) and verified GitHub repository links.
**Independent Test**: Read Image Captioning case study details for ViT vs CNN+RNN architecture rationale and failure modes (gender misclassification, repetition), verify GitHub link target.

- [x] T023 [US3] Add architecture reasoning (ViT self-attention vs CNN+RNN) and documented failure modes to Image Captioning & Spam Classification case studies in `src/content/en/projects.ts` and `src/components/sections/ProjectsSection.tsx`

---

## Phase 7: User Story 5 - AI/ATS Content Parsing (Priority: P2)

**Goal**: Render JSON-LD Person schema in `<head>`, semantic HTML landmark hierarchy, meta description, and Open Graph tags for search engines and AI tools.
**Independent Test**: View source, verify `<script type="application/ld+json">` Person block with name, role, skills, and GitHub URL, single `<h1>` tag, and Open Graph tags.

- [ ] T024 [P] [US5] Implement JSON-LD Person schema generator in `src/lib/utils/json-ld.ts`
- [ ] T025 [P] [US5] Design and generate static Open Graph image (1200x630px, Mecha Typography system) at `public/og.png`
- [ ] T026 [US5] Configure root metadata, Open Graph tags, canonical URL, and JSON-LD script injection in `src/app/layout.tsx` (depends on T025)

---

## Phase 8: User Story 6 - Mobile Visitor Experience (Priority: P2)

**Goal**: Fully responsive layout across mobile viewports (≤ 480px), collapsible mobile hamburger menu, ≥ 44×44px touch targets, and single-column project cards.
**Independent Test**: Resize viewport to 375px. Verify navbar collapses to hamburger menu, touch targets are ≥ 44px, and no horizontal scrollbar occurs.

- [ ] T027 [P] [US6] Implement mobile hamburger menu and drawer component with accessible touch targets in `src/components/mobile-menu.tsx`
- [ ] T028 [US6] Add mobile responsive breakpoint layout styles to `HeroSection.tsx`, `ProjectsSection.tsx`, and `ContactSection.tsx`

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Footer, global accessibility audit (WCAG 2.1 AA), reduced motion support, Core Web Vitals optimization, and E2E Playwright test suite execution.

- [ ] T029 [P] Implement Footer component with social links, secondary navigation, and tech stack attribution in `src/components/sections/Footer.tsx`
- [ ] T030 [P] Create Playwright E2E test suite covering quickstart validation scenarios VS-001 through VS-011 in `tests/e2e/portfolio.spec.ts`
- [ ] T031 Perform Lighthouse accessibility & performance verification, verify `prefers-reduced-motion` compliance, and validate build output with `pnpm build`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) completion — BLOCKS all user stories.
- **User Stories (Phase 3–8)**: Depend on Foundational (Phase 2) completion.
  - Phase 3 (US1 - Recruiter Scan) & Phase 4 (US4 - Contact Form) form the **MVP**.
  - Phase 6 (US3 - Tech Lead) depends on Phase 5 (US2 - Hiring Manager) completion, full stop.
  - Phase 7 (US5 - AI/ATS) & Phase 8 (US6 - Mobile) can be done alongside story UI components.
- **Polish (Phase 9)**: Depends on all user story phases being complete.

---

## Implementation Strategy

### MVP First (Phases 1–4)

1. Complete Phase 1 (Setup) & Phase 2 (Foundational)
2. Complete Phase 3 (US1: Hero + About + Navbar)
3. Complete Phase 4 (US4: Contact Form + Spam Protection)
4. **VALIDATE MVP**: Test Recruiter scan + Contact submission end-to-end.

### Full Delivery (Phases 5–9)

5. Complete Phase 5 (US2: Projects + Skills display groups) & Phase 6 (US3: Technical depth & failure modes)
6. Complete Phase 7 (US5: JSON-LD & SEO) & Phase 8 (US6: Mobile responsiveness)
7. Complete Phase 9 (Polish: Footer, E2E test suite, accessibility audit)
