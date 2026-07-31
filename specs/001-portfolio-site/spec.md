# Feature Specification: Premium Data Science Portfolio

**Feature Branch**: `001-portfolio-site`

**Created**: 2026-07-31

**Status**: Draft

## Clarifications

### Session 2026-07-31

- Q: What spam protection strategy should the contact form use? → A: Layered defense — honeypot field + server-side rate limiting + Cloudflare Turnstile (already in the Cloudflare stack, not a new dependency).
- Q: How should project case-study detail views be displayed? → A: Inline expand/collapse on the same page (accordion or card expansion with smooth animation). No modals or separate routes.
- Q: How should the project case-study body be stored? → A: Three separate text columns (`problem`, `approach`, `impact`) — each rendered independently with its own label. No Markdown parser needed.

**Input**: User description: "Build a premium Awwwards-tier personal portfolio for ManhNha, a Data Science Engineer. Single-page site with Hero, About, Skills, Projects, Contact, Footer sections. Data backed by Supabase. Deployed on Cloudflare/Vercel. English first, Vietnamese-ready architecture."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Recruiter Quick Scan (Priority: P1)

A recruiter lands on the portfolio from a LinkedIn link or search result. Within 10–20 seconds they must understand: (1) this person is a Data Science / ML engineer, (2) they have real projects with real results, (3) there is a clear way to reach out.

**Why this priority**: Recruiters are the highest-volume audience and have the shortest attention span. If the site fails this scan, no other persona matters — the pipeline never starts.

**Independent Test**: Load the site in a fresh browser tab. Without scrolling, verify the Hero section communicates "Data Science Engineer" identity, shows at least one CTA, and the Navbar provides section navigation.

**Acceptance Scenarios**:

1. **Given** a recruiter opens the site for the first time, **When** the page loads, **Then** the first viewport displays the name "Trần Đăng Mạnh," the role "Data Science Engineer," and at least one call-to-action button within 3 seconds of page load.
2. **Given** a recruiter scrolls to the Skills section, **When** they view it for 15–20 seconds, **Then** the four core skill areas (Data Science, Machine Learning, Data Visualization, MLOps) are visually prominent and grouped — not presented as a flat tag cloud.
3. **Given** a recruiter wants to reach out, **When** they click the "Contact" nav item or CTA, **Then** they are scrolled to a working contact form with Name, Email, and Message fields.

---

### User Story 2 - Hiring Manager Project Evaluation (Priority: P2)

A hiring manager spends 1–3 minutes evaluating whether ManhNha is worth an interview slot. They read the Hero/About for context, then open one or two project case studies to assess technical reasoning, honest framing, and quantified outcomes.

**Why this priority**: Hiring managers are the decision-makers. Converting a recruiter pass into an interview depends on this persona finding substance beyond the initial scan.

**Independent Test**: Navigate to the Projects section. Open the Image Captioning case study. Verify it contains Problem, Approach, and Impact sections with specific numbers and team context disclosure.

**Acceptance Scenarios**:

1. **Given** a hiring manager scrolls to the Projects section, **When** they view the project cards, **Then** each project card shows a concise preview description, meta information (team size, role, course context), and a link to the GitHub repository.
2. **Given** a hiring manager opens the Image Captioning case study, **When** they read the full detail view, **Then** they see an inline-expanded section (not a modal or separate page) containing: (a) a Problem section explaining motivation, (b) an Approach section describing ViT encoder + Transformer decoder architecture, (c) an Impact section with BLEU-4 score of 0.1883 compared against baselines, and (d) team context (4-member team, ManhNha's role as Team Lead).
3. **Given** a hiring manager opens the Spam Classification case study, **When** they read it, **Then** they see quantified results (Accuracy 96%, Precision 97.3%, Recall 93.5% at k=5), the comparison of four distance metrics, and team context (3-member team).

---

### User Story 3 - Tech Lead Deep Dive (Priority: P3)

A senior engineer or ML practitioner evaluates technical depth by reading case studies carefully, then clicking through to the GitHub repos. They want to see architecture reasoning, experimental rigor, awareness of limitations, and honest reporting.

**Why this priority**: This is the highest-scrutiny persona but lower volume. The site must not prevent this evaluation, but optimizing for it is secondary to P1 and P2 flows.

**Independent Test**: Read the Image Captioning case study, then click the GitHub link. Verify the portfolio's framing is consistent with the repo content and does not overclaim.

**Acceptance Scenarios**:

1. **Given** a tech lead reads the Image Captioning case study, **When** they look for architecture reasoning, **Then** they find an explanation of why ViT was chosen over CNN+RNN/LSTM (attention-based global context from early layers).
2. **Given** a tech lead clicks the GitHub link from a project card, **When** the repo opens, **Then** the portfolio's claims (metrics, team size, approach) are consistent with the repository README.
3. **Given** a tech lead looks for evidence of technical self-awareness, **When** they read a case study, **Then** they find at least one mentioned limitation or known failure mode (e.g., gender misclassification, token repetition).

---

### User Story 4 - Contact Form Submission (Priority: P1)

Any visitor (recruiter, hiring manager, or general) fills out the contact form to reach ManhNha. The form validates input, submits securely to a backend, and provides clear success/error feedback.

**Why this priority**: A working contact path is the primary conversion goal of the entire site. A broken or confusing contact form directly blocks the site's purpose.

**Independent Test**: Fill out the contact form with valid data and submit. Verify a success message appears. Then try submitting with invalid email — verify a validation error appears.

**Acceptance Scenarios**:

1. **Given** a visitor fills out Name, Email, and Message with valid data, **When** they submit the form, **Then** the data is persisted to the backend and a success message is displayed with appropriate visual feedback.
2. **Given** a visitor submits the form with an invalid email format, **When** they attempt submission, **Then** a validation error message appears next to the Email field before any server request is made.
3. **Given** a visitor submits the form with any empty required field, **When** they attempt submission, **Then** validation errors appear for each empty required field.

---

### User Story 5 - AI/ATS Content Parsing (Priority: P2)

An AI tool (ChatGPT, Perplexity, Google AI Overview) or ATS system crawls the portfolio to extract structured information about ManhNha's identity, skills, and projects for indexing or question-answering.

**Why this priority**: Increasingly, hiring decisions are influenced by what AI tools surface when someone searches for a candidate. Structured data and semantic HTML ensure accurate representation.

**Independent Test**: View page source. Verify JSON-LD Person schema exists in the head, heading hierarchy is correct (single h1, logical h2/h3 structure), and semantic HTML elements are used throughout.

**Acceptance Scenarios**:

1. **Given** an AI tool crawls the page, **When** it reads the HTML, **Then** it finds a JSON-LD `Person` schema with name, role, skills, and project information.
2. **Given** an ATS parses the page, **When** it extracts text, **Then** the heading hierarchy produces well-scoped content chunks (single h1 for identity, h2 for each major section, h3 for subsections).
3. **Given** a search engine indexes the page, **When** it reads meta tags, **Then** it finds a descriptive title tag, meta description, and Open Graph tags that accurately represent the site's content.

---

### User Story 6 - Mobile Visitor Experience (Priority: P2)

A visitor accesses the portfolio on a mobile device (phone or tablet). All content, navigation, and interactions adapt to the smaller screen and touch input — not just resize, but meaningfully change interaction patterns.

**Why this priority**: A significant portion of initial visits (especially from LinkedIn links shared via mobile) will be on phones. A broken or awkward mobile experience loses recruiter scans entirely.

**Independent Test**: Open the site on a phone-width viewport (375px). Verify all sections are legible, the navbar collapses to a mobile menu, touch targets meet minimum size requirements, and no content overflows horizontally.

**Acceptance Scenarios**:

1. **Given** a visitor opens the site on a phone (viewport width ≤ 480px), **When** the page loads, **Then** the Hero section displays identity and CTAs without horizontal overflow, and the navbar collapses to a mobile menu.
2. **Given** a visitor taps the mobile menu, **When** the menu opens, **Then** all navigation items are listed with touch targets of at least 44×44px.
3. **Given** a visitor views the Projects section on mobile, **When** they interact with project cards, **Then** the cards display in a single-column layout with full-width previews and accessible expand/detail interactions.

---

### Edge Cases

- What happens when the contact form backend (Supabase) is temporarily unavailable? The form MUST show a user-friendly error message, not a raw error or silent failure.
- What happens when a visitor has `prefers-reduced-motion` enabled? All decorative animations MUST be disabled or reduced to simple opacity fades; no motion triggers layout shifts.
- What happens when a visitor navigates with keyboard only? All interactive elements (nav links, CTAs, form fields, project cards) MUST be focusable and operable via keyboard with visible focus indicators.
- What happens when a visitor uses a screen reader? All images MUST have alt text, all interactive elements MUST have accessible labels, and content order MUST be logical in the accessibility tree.
- What happens when Cloudflare Turnstile fails to load or verify? The form MUST degrade gracefully — show a user-friendly message explaining the issue and provide an alternative contact method (direct email link).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Site MUST display a Hero section with ManhNha's name ("Trần Đăng Mạnh"), role ("Data Science Engineer"), a headline, and two CTAs ("View Projects" and "Get in Touch").
- **FR-002**: Site MUST display a sticky Navbar with section links (About, Skills, Projects, Contact), a GitHub icon link, and a primary CTA button. Active section MUST be indicated during scroll.
- **FR-003**: Site MUST display an About section with a narrative bio, structured education information (HUFLIT, Data Science, 2023–2027, GPA 3.4/4.0), and a brief hobbies line.
- **FR-004**: Site MUST display a Skills section with skills grouped by category — Core (Data Science, ML, Data Visualization, MLOps) with larger visual weight, and Secondary (Backend & Cloud, Languages & Tools) with smaller visual weight.
- **FR-005**: Site MUST display a Projects section with project cards in a consistent format. Each card MUST show: preview description, meta (team size, role, course context, GitHub link), and inline-expandable case-study content structured as Problem → Approach → Impact. Detail view MUST use accordion/card expansion on the same page with smooth animation — no modals or separate routes.
- **FR-006**: Site MUST display a Contact section with a form containing Name, Email, and Message fields. The form MUST validate client-side before submission and persist data to a backend data store.
- **FR-007**: Site MUST display a Footer with social links (GitHub; LinkedIn when available), secondary navigation repeating main section anchors, and a copyright line.
- **FR-008**: Contact form MUST NOT expose backend service keys or credentials on the client side. Submission MUST go through a server-side action or API route.
- **FR-009**: All text content MUST be centralized (not hardcoded inline) to support future internationalization (adding Vietnamese without restructuring components).
- **FR-010**: Site MUST include JSON-LD `Person` structured data, semantic HTML with correct heading hierarchy, meta description, and Open Graph tags.
- **FR-011**: Site MUST support `prefers-reduced-motion` — all decorative animations MUST be disabled or reduced when this preference is active.
- **FR-012**: Site MUST be responsive across mobile (≤ 480px), tablet, and desktop breakpoints. Motion and interaction patterns MUST adapt to input type (touch vs. pointer), not just resize.
- **FR-013**: Site MUST include a premium load sequence in the Hero section: staggered reveal of headline, sub-headline, then CTAs.
- **FR-014**: Site MUST include scroll-triggered reveal animations for content sections (About, Skills, Projects) that do not cause layout shift (CLS-safe).
- **FR-015**: Projects data MUST be sourced from a backend data store (not hardcoded in frontend code), supporting images, tags/skills, links (repo/live demo), and case-study body content.
- **FR-016**: Navbar MUST collapse to a mobile menu below the relevant breakpoint with animated underline on hover/active state for desktop.
- **FR-017**: Contact form MUST implement layered spam protection: (1) a honeypot field invisible to human users, (2) server-side rate limiting, and (3) Cloudflare Turnstile challenge verification. All three layers MUST be active before a submission is persisted.

### Key Entities

- **Project**: A portfolio project with title, preview description, meta (team size, role, course/context), case-study body as three separate fields (`problem`, `approach`, `impact` — each stored and rendered independently), tags/skills, image(s), links (GitHub repo, live demo), and display order.
- **Contact Submission**: A message from a site visitor containing name, email, message body, and submission timestamp.
- **Skill Category**: A grouping of related skills (e.g., "Data Science & Statistics") with a name, visual weight designation (core vs. secondary), and ordered list of individual skills.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor understands ManhNha's professional identity ("Data Science Engineer") within the first viewport without scrolling, within 3 seconds of page load.
- **SC-002**: The Skills section is scannable and comprehensible within 15–20 seconds, with core competencies visually distinguished from secondary skills.
- **SC-003**: At least one project case study contains all three elements (Problem, Approach, Impact) with specific quantified results and team context.
- **SC-004**: Contact form submission completes successfully with clear visual feedback within 5 seconds under normal conditions.
- **SC-005**: The site passes Core Web Vitals "Good" thresholds on both mobile and desktop.
- **SC-006**: All interactive elements are keyboard-navigable with visible focus indicators.
- **SC-007**: The site scores 90+ on Lighthouse Accessibility audit.
- **SC-008**: A `Person` JSON-LD schema is present and validates correctly.
- **SC-009**: The site renders correctly and is fully functional on the latest versions of Chrome, Firefox, Safari, and Edge.
- **SC-010**: The visual quality is at a level comparable to Awwwards-nominated product marketing sites (Linear, Stripe, Vercel tier) — assessed by owner review against the Owner persona checklist.

## Assumptions

- English is the only content language for v1; Vietnamese support is deferred to Phase 2 but architecture must not block it.
- Blog functionality is explicitly out of scope for v1 (per ProjectVision.md non-goals).
- The "signature element" (interactive data visualization, live metrics, or data storytelling) is an open design decision — this spec does not prescribe a specific implementation. The chosen element must reinforce the Data Science identity.
- Only two projects are ready for inclusion at launch: Image Captioning and Spam Classification. The system must support adding more projects without code changes.
- LinkedIn profile URL is not yet available; the site should accommodate its addition without layout changes.
- Target company/role type is not yet locked — the site positions ManhNha for Data Science / ML / AI engineering roles generically.
- The exact color palette is an open design decision (dark theme + accent direction under review); this spec does not prescribe colors.
- Modern evergreen browsers only — no IE11 or legacy browser support.
- The site is single-owner, single-tenant — no user accounts or multi-user features.
