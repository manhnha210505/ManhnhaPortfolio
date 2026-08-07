import { cn } from '@/lib/utils/cn'

interface SchematicConnectorProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

/**
 * Mecha primitive: 1px blueprint callout line linking a label to what it
 * annotates (MechaTypographySystem.md motif 3).
 *
 * Purely decorative — always `aria-hidden`, never the only thing conveying a
 * relationship. Use sparingly: the Skills section and the signature element.
 * The line fades out at its far end so it reads as a callout, not a divider.
 */
export function SchematicConnector({
  orientation = 'horizontal',
  className,
}: SchematicConnectorProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'block bg-accent/30',
        orientation === 'horizontal'
          ? 'h-px w-full bg-gradient-to-r from-accent/40 to-transparent'
          : 'w-px h-full bg-gradient-to-b from-accent/40 to-transparent',
        className
      )}
    />
  )
}
