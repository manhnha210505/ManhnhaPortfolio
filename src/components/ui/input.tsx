import type { InputHTMLAttributes } from 'react'

import { cn } from '@/lib/utils/cn'

/**
 * `aria-invalid` drives the error styling. The error *message* must still be
 * wired up by the caller via `aria-describedby` — color alone never conveys
 * a validation error (Accessibility.md, VS-006).
 */
export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-11 w-full bg-bg-elevated border border-border px-3',
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
