'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ElementType, ReactNode } from 'react'

import { fadeIn, fadeInUp, inViewProps } from './motion-variants'

interface FadeInProps {
  children: ReactNode
  /** Render as a different element so sections keep semantic tags. */
  as?: ElementType
  className?: string
  /** Seconds. Use only where a stagger parent is not appropriate. */
  delay?: number
  /** `false` animates on mount instead of on scroll into view. */
  onScroll?: boolean
}

/**
 * Scroll-triggered reveal. Opacity + transform only, so it cannot shift
 * layout (FR-014).
 *
 * Under `prefers-reduced-motion` the vertical offset is dropped and the
 * element fades only — the single shared mechanism required by
 * motion/MotionSystem.md, so no component reimplements this check.
 */
export function FadeIn({
  children,
  as = 'div',
  className,
  delay = 0,
  onScroll = true,
}: FadeInProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as as 'div']

  const variants = reduced ? fadeIn : fadeInUp
  const trigger = onScroll
    ? inViewProps
    : { initial: 'hidden' as const, animate: 'visible' as const }

  return (
    <MotionTag
      {...trigger}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
