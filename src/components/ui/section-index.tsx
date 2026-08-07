import { SECTION_TOTAL } from '@/content/en/nav'
import { cn } from '@/lib/utils/cn'

interface SectionIndexProps {
  /** Two-digit index, e.g. `01`. */
  index: string
  /** Section name, rendered uppercase — e.g. `PROJECTS`. */
  label: string
  className?: string
}

/**
 * Mecha primitive: `01 / 06 — HERO` section marker
 * (MechaTypographySystem.md motif 2).
 *
 * Decorative wayfinding, not a heading: it sits alongside the real `<h2>`
 * and is hidden from the accessibility tree so screen readers get the
 * heading text without the counter noise.
 *
 * Uses the display face, which is Latin-only (no Vietnamese diacritics) —
 * safe here since indices and labels are ASCII.
 */
export function SectionIndex({ index, label, className }: SectionIndexProps) {
  return (
    <p
      aria-hidden="true"
      className={cn(
        'font-display text-caption tracking-[0.2em] text-fg-muted',
        className
      )}
    >
      <span className="text-accent">{index}</span>
      <span className="mx-1 opacity-40">/</span>
      <span className="opacity-60">{SECTION_TOTAL}</span>
      <span className="mx-2 opacity-40">—</span>
      {label}
    </p>
  )
}
