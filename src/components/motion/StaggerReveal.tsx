'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ElementType, ReactNode } from 'react'

import { fadeIn, fadeInUp, inViewProps, staggerParent } from './motion-variants'

interface StaggerRevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  /** `false` animates on mount — used by the Hero load sequence (FR-013). */
  onScroll?: boolean
}

/**
 * Orchestrates a sequenced reveal of its children. Wrap each child in
 * `<StaggerReveal.Item>`; the parent owns the timing so children never
 * declare their own delays (AnimationPrinciples.md).
 */
export function StaggerReveal({
  children,
  as = 'div',
  className,
  onScroll = true,
}: StaggerRevealProps) {
  const MotionTag = motion[as as 'div']
  const trigger = onScroll
    ? inViewProps
    : { initial: 'hidden' as const, animate: 'visible' as const }

  return (
    <MotionTag {...trigger} variants={staggerParent} className={className}>
      {children}
    </MotionTag>
  )
}

interface ItemProps {
  children: ReactNode
  as?: ElementType
  className?: string
}

/**
 * Exported standalone as well as on `StaggerReveal.Item`: a server component
 * cannot read arbitrary properties off a client-component reference, so
 * server-rendered sections must import `StaggerItem` directly.
 */
export function StaggerItem({ children, as = 'div', className }: ItemProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as as 'div']

  return (
    <MotionTag variants={reduced ? fadeIn : fadeInUp} className={className}>
      {children}
    </MotionTag>
  )
}

StaggerReveal.Item = StaggerItem
