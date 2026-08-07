'use client'

import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { nav } from '@/content/en/nav'
import { contact } from '@/content/en/contact'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

/**
 * Choose the active nav section from per-section visibility ratios.
 *
 * Pure and exported so `tests/unit/navbar.test.ts` can exercise the state
 * logic without a DOM or a real IntersectionObserver.
 *
 * Rules:
 * - Most-visible section wins.
 * - Ties break toward document order, so scrolling down never flickers
 *   backwards between two equally-visible sections.
 * - If nothing is visible (e.g. the Hero, which has no nav item), the last
 *   active section is kept rather than clearing the indicator.
 */
export function pickActiveSection(
  ratios: ReadonlyMap<string, number>,
  order: readonly string[],
  current: string | null
): string | null {
  let best: string | null = null
  let bestRatio = 0

  for (const id of order) {
    const ratio = ratios.get(id) ?? 0
    if (ratio > bestRatio) {
      best = id
      bestRatio = ratio
    }
  }

  return best ?? current
}

const NAV_IDS = nav.items.map((item) => item.id)

export function Navbar() {
  const [active, setActive] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const ratios = useRef(new Map<string, number>())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.current.set(entry.target.id, entry.intersectionRatio)
        }
        setActive((current) =>
          pickActiveSection(ratios.current, NAV_IDS, current)
        )
      },
      // Several thresholds: a section taller than the viewport never reaches
      // a high ratio, so a single threshold would leave it permanently "off".
      { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] }
    )

    for (const id of NAV_IDS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  // Escape closes the mobile menu — a dismissible overlay must be keyboard
  // dismissible (WCAG 2.1.2 / Accessibility.md).
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border-subtle bg-background/80 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:bg-bg-elevated focus:px-3 focus:py-2 focus:text-sm"
      >
        {nav.skipToContent}
      </a>

      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6"
      >
        {/* ASCII-only alias, so the display face is safe here. The full name
            carries diacritics and lives in the Hero in `font-sans`. */}
        <a href="#main" className="font-display text-sm tracking-[0.2em]">
          manhnha
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.items.map((item) => (
            <li key={item.id}>
              <NavLink item={item} active={active === item.id} />
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <GithubLink />
          <Button asChild size="default">
            <a href={nav.cta.href}>{nav.cta.label}</a>
          </Button>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? nav.menuClose : nav.menuOpen}
          onClick={() => setOpen((v) => !v)}
          className="flex size-11 items-center justify-center md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border-subtle bg-background px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {nav.items.map((item) => (
              <li key={item.id}>
                <NavLink
                  item={item}
                  active={active === item.id}
                  className="block py-3"
                  onClick={() => setOpen(false)}
                />
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3">
            <GithubLink />
            <Button asChild>
              <a href={nav.cta.href} onClick={() => setOpen(false)}>
                {nav.cta.label}
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

function NavLink({
  item,
  active,
  className,
  onClick,
}: {
  item: (typeof nav.items)[number]
  active: boolean
  className?: string
  onClick?: () => void
}) {
  return (
    <a
      href={item.href}
      onClick={onClick}
      // `aria-current` carries the active state for assistive tech; the
      // underline alone would be color/shape only (Accessibility.md).
      aria-current={active ? 'true' : undefined}
      className={cn(
        'relative font-mono text-sm uppercase tracking-[0.08em]',
        'transition-colors duration-[--duration-fast] ease-[--ease-out]',
        active ? 'text-accent' : 'text-fg-muted hover:text-foreground',
        // Underline grows from the left on hover/active — the one nav
        // micro-interaction (MicroInteractions.md).
        'after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-accent',
        'after:transition-[width] after:duration-[--duration-fast] after:ease-[--ease-mecha]',
        active ? 'after:w-full' : 'after:w-0 hover:after:w-full',
        className
      )}
    >
      {item.label}
    </a>
  )
}

function GithubLink() {
  return (
    <a
      href={contact.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={nav.githubLabel}
      className="flex size-11 items-center justify-center text-fg-muted transition-colors hover:text-foreground"
    >
      {/* Inline mark: lucide-react v1 dropped brand glyphs. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="size-5"
        fill="currentColor"
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
      </svg>
    </a>
  )
}
