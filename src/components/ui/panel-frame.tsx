import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

interface PanelFrameProps {
  children: ReactNode
  as?: ElementType
  className?: string
  /** Clip the top-right corner at 45° — the one angular-edge system rule. */
  clipped?: boolean
}

/**
 * Mecha primitive: HUD target-lock frame — thin corner brackets on an
 * elevated panel (MechaTypographySystem.md motifs 1 and 5).
 *
 * Reserve for content that earns a "system readout" framing: project cards,
 * stat callouts, the signature element container. Not every box.
 *
 * The brackets are `aria-hidden` decoration; they carry no meaning a screen
 * reader needs. On hover they tighten inward slightly — the "panel engaging"
 * detail that replaces generic soft-UI hover.
 */
export function PanelFrame({
  children,
  as = 'div',
  className,
  clipped = false,
}: PanelFrameProps) {
  const Tag = as

  return (
    <Tag
      className={cn(
        'group relative bg-bg-elevated border border-border',
        clipped &&
          '[clip-path:polygon(0_0,calc(100%-var(--clip-corner))_0,100%_var(--clip-corner),100%_100%,0_100%)]',
        className
      )}
    >
      <Bracket className="top-0 left-0 border-t border-l" />
      <Bracket className="top-0 right-0 border-t border-r" />
      <Bracket className="bottom-0 left-0 border-b border-l" />
      <Bracket className="bottom-0 right-0 border-b border-r" />
      {children}
    </Tag>
  )
}

function Bracket({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute size-3 border-accent',
        'transition-[margin] duration-[--duration-fast] ease-[--ease-mecha]',
        'group-hover:m-0.5',
        className
      )}
    />
  )
}
