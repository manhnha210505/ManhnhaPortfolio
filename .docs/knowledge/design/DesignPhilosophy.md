# Design Philosophy

## Principles (non-negotiable)
1. Minimal but premium — restraint is the flex, not emptiness.
2. Large typography with confident spacing.
3. Strong visual hierarchy — one clear focal point per viewport.
4. Generous whitespace.
5. Consistent rhythm across every section (same spacing scale, same section padding logic).
6. Modern editorial-inspired layout — think product-marketing sites, not a classic "developer portfolio template."

## Inspiration, used carefully
Apple, Stripe, Linear, Framer, Vercel, Figma, Clerk, Arc Browser, Raycast, Cuberto/Locomotive, Active Theory, Bruno Simon, Awwwards nominees. Full critique notes per reference live in `docs/critiques/`.

**Known risk (flagged, do not ignore):** this exact inspiration set + a dark theme + single accent color is the single most common "AI-generated premium site" default right now. Awwwards judges and technical peers will recognize the template immediately if execution doesn't go further than the references. Mitigations required:
- The **signature element** (see `foundation/ProductRequirements.md`) must be something a template clone-job would not have — it should require actual DS/ML skill to build, reinforcing `TechnicalIdentity.md`.
- Typography and color choices should be *specific decisions*, not defaults — document the "why" in `design/ColorSystem.md` and `design/Typography.md`, not just the "what."
- At least one layout or interaction pattern per major section should deviate from the most obvious "hero + fade-in cards" pattern.

## Section identity vs system cohesion
Each section (`docs/playbooks/`) should feel distinct in content and rhythm, but must draw from the same token system (`design/DesignTokens.md`) — variation comes from composition and motion, not from breaking the token system.
