# Layout System

## Grid
- 12-column grid at desktop, collapsing to 4–6 at mobile — define exact breakpoints alongside Tailwind config in `engineering/CodeStandards.md`.
- Consistent max-width container across sections; avoid one section being full-bleed and the next constrained without intent.

## Whitespace & rhythm
- Define a single spacing scale (e.g. 4px base, Tailwind default or custom) and use it for **all** section padding, gaps, and margins — no ad hoc pixel values.
- Section vertical padding should follow a consistent pattern (e.g. same top/bottom rhythm at each breakpoint) so scrolling through the site feels metronomic, not erratic.

## Section composition pattern
Each section in `docs/playbooks/` should declare:
- Its grid usage (full-bleed vs constrained)
- Its dominant layout pattern (e.g. split 60/40, centered stack, asymmetric grid)
- How it differs intentionally from the section before/after it, while staying on the shared spacing scale

## Responsive behavior
- Design mobile layouts as their own compositions, not a naive reflow of desktop — especially for the signature element, which likely needs a genuinely different interaction model on touch devices.
