import type { Transition, Variants } from 'motion/react'

/**
 * Shared motion variants. Every animated component pulls from here — no
 * per-component magic numbers (motion/MotionSystem.md).
 *
 * Values mirror the `--duration-*` / `--ease-*` tokens in globals.css. They
 * are duplicated as numbers because Motion's JS animations cannot read CSS
 * custom properties for timing; keep the two in sync when either changes.
 *
 * Transform + opacity only — never animate a layout property (CLS = 0,
 * FR-014, research.md R-010).
 */

export const DURATION = {
  fast: 0.3,
  base: 0.5,
  slow: 0.9,
} as const

/** Matches `--ease-out` / `--ease-mecha` in globals.css. */
export const EASE = {
  out: [0.16, 1, 0.3, 1],
  mecha: [0.2, 0.9, 0.1, 1],
} as const

export const transition: Transition = {
  duration: DURATION.base,
  ease: EASE.out,
}

/** Distance in px for enter offsets — small enough to read as settle, not slide. */
const OFFSET = 16

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: OFFSET },
  visible: { opacity: 1, y: 0, transition },
}

/**
 * Parent orchestrator. Children animate in sequence, never all at once
 * (AnimationPrinciples.md § Sequencing hierarchy).
 */
export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

/** Shared `whileInView` config — one observer policy for all scroll reveals. */
export const inViewProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.2 },
} as const
