import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

type StatusTone = 'accent' | 'neutral' | 'success'

interface StatusTagProps {
  children: ReactNode
  /**
   * `accent` = primary system readout (metrics).
   * `neutral` = context label, e.g. [TEAM PROJECT] — deliberately not cyan,
   * so "context" stays visually distinct from "primary accent"
   * (ColorSystem.md § Semantic vs. accent separation).
   */
  tone?: StatusTone
  className?: string
}

const TONES: Record<StatusTone, string> = {
  accent: 'text-accent border-accent/40 bg-accent-subtle',
  neutral: 'text-fg-muted border-border',
  success: 'text-semantic-success border-semantic-success/40',
}

/**
 * Mecha primitive: bracketed monospace status tag — `[TEAM PROJECT]`,
 * `[BLEU-4: 0.1883]` (MechaTypographySystem.md motif 4).
 *
 * Brackets are drawn as text so they survive copy/paste and screen-reader
 * output, where they read as the technical framing they are.
 */
export function StatusTag({
  children,
  tone = 'accent',
  className,
}: StatusTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 border px-2 py-0.5',
        'font-mono text-caption uppercase tracking-[0.12em]',
        TONES[tone],
        className
      )}
    >
      <span aria-hidden="true" className="opacity-50">
        [
      </span>
      {children}
      <span aria-hidden="true" className="opacity-50">
        ]
      </span>
    </span>
  )
}
