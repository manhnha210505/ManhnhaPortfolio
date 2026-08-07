import type { TextareaHTMLAttributes } from 'react'

import { cn } from '@/lib/utils/cn'

/** See `Input` — same `aria-invalid` + `aria-describedby` contract. */
export function Textarea({
  className,
  rows = 5,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={rows}
      className={cn(
        'w-full resize-y bg-bg-elevated border border-border px-3 py-2',
        'text-base text-foreground placeholder:text-fg-muted',
        'transition-colors duration-[--duration-fast] ease-[--ease-out]',
        'hover:border-accent/50',
        'aria-invalid:border-semantic-error',
        'disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}
