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

## Chosen direction: Mecha Typography (medium application)
The genericness risk below has been resolved by adopting **Mecha Typography** as the site's distinctive visual system — HUD-style panels, section numbering, schematic linework, technical status tags, cyan accent. Full definition in `design/MechaTypographySystem.md`; this is now binding, not exploratory.

**Known risk (flagged, mitigated by scope discipline):** this exact inspiration set + a dark theme + single accent color is the single most common "AI-generated premium site" default. Mitigation is the Mecha Typography system itself — but it must stay at "medium" application (see `MechaTypographySystem.md`) or it risks over-correcting into a gaming/otaku aesthetic that undercuts the Recruiter/HiringManager scan-in-15-seconds requirement. When in doubt during implementation, favor restraint — apply the system to fewer elements more consistently, rather than more elements more loosely.

## Section identity vs system cohesion
Each section (`docs/playbooks/`) should feel distinct in content and rhythm, but must draw from the same token system (`design/DesignTokens.md`) — variation comes from composition and motion, not from breaking the token system.
