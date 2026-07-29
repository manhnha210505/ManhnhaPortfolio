# Typography

## Direction
Large type, confident spacing, strong hierarchy — per `DesignPhilosophy.md`. Typeface selection is an **open decision**; do not default to a generic system-font stack or the first Google Font that looks "clean." Evaluate against:
- A distinct personality at large display sizes (Hero headline) without hurting legibility at body sizes.
- Strong numeral rendering — this site will display data, metrics, and possibly charts; tabular figures matter.
- Variable font support preferred, for performance (one file, many weights) and for potential motion on weight/optical-size axes.

## Scale
Define a modular type scale (e.g. 1.25–1.333 ratio) covering at minimum:
- Display (Hero headline)
- H1–H3 (section headings)
- Body (large, default, small)
- Caption/label (metadata, tags, nav)
- Mono (code snippets, technical labels, data values — reinforces the DS/engineering identity)

## Rhythm
- Consistent line-height per tier (tighter for display, more relaxed for body).
- Consistent vertical rhythm tied to the same spacing scale used in `LayoutSystem.md` — headings and body copy should land on the same baseline logic across sections.
