# Micro-interactions

Every clickable/hoverable element needs meaningful, consistent feedback — implemented once as shared patterns, reused everywhere.

## Patterns to implement
- **Hover elevation** — subtle shadow/scale shift on cards and buttons.
- **Magnetic buttons** — primary CTAs shift slightly toward the cursor within a small radius (desktop/pointer input only — disable on touch).
- **Ripple** — on click/tap feedback for primary buttons.
- **Cursor attraction / custom cursor** — used sparingly, only where it adds clarity (e.g. signaling a draggable or interactive data element), not site-wide as a gimmick.
- **Image reveal** — clip-path or mask reveal on scroll-into-view for project thumbnails.
- **Text reveal** — staggered character/word/line reveal for key headlines only (not body copy — would hurt readability and performance).
- **Card expansion** — smooth height/content transitions for project case-study previews.
- **Animated underline** — nav links and inline links.
- **Active nav indicator** — reflects current scroll section.
- **Scroll progress** — subtle global or per-section indicator.

## Rule
Each pattern above is defined **once** in `components/motion/` or as a shared `ui/` component variant — sections in `docs/playbooks/` reference these by name rather than redefining behavior.
