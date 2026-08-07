import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils/cn'

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-mono text-sm uppercase tracking-[0.08em]',
    'transition-colors duration-[--duration-fast] ease-[--ease-out]',
    'disabled:pointer-events-none disabled:opacity-50'
  ),
  {
    variants: {
      variant: {
        primary: 'bg-accent text-background hover:bg-accent-hover',
        secondary:
          'border border-border text-foreground hover:border-accent hover:text-accent',
        ghost: 'text-fg-muted hover:text-foreground',
      },
      size: {
        // ≥44px tall — the mobile touch-target floor (US6-AC2). Applies at
        // every breakpoint rather than only below the mobile query, since a
        // touch device can be any width.
        default: 'h-11 px-5',
        lg: 'h-12 px-6',
        // Square, for icon-only controls. Still 44px.
        icon: 'size-11',
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render the child element instead of a `<button>` — e.g. an anchor CTA. */
  asChild?: boolean
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { buttonVariants }
