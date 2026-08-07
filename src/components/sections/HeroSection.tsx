import { hero } from '@/content/en/hero'
import { StaggerReveal, StaggerItem } from '@/components/motion/StaggerReveal'
import { Button } from '@/components/ui/button'
import { SectionIndex } from '@/components/ui/section-index'
import type { Profile } from '@/types/portfolio'

interface HeroSectionProps {
  profile: Profile | null
}

/**
 * Hero — playbooks/HeroSection.md. First 3 seconds answer "who is this, and
 * what do they do" (FR-001).
 *
 * The load sequence animates on mount, not on scroll: it is already in the
 * first viewport (`onScroll={false}`, FR-013).
 */
export function HeroSection({ profile }: HeroSectionProps) {
  const name = profile?.full_name ?? hero.name
  const role = profile?.tagline ?? hero.role

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="mx-auto flex min-h-[90svh] max-w-5xl flex-col justify-center px-6 pt-24 pb-16"
    >
      <StaggerReveal onScroll={false}>
        <StaggerItem>
          <SectionIndex index={hero.index} label={hero.label} />
        </StaggerItem>

        <StaggerItem>
          {/*
            font-sans is deliberate and load-bearing — DO NOT change to
            font-display when restyling. `name` holds "Trần Đăng Mạnh";
            Orbitron (the display face) has no Vietnamese diacritic glyphs
            (missing ă Đ ạ ầ, verified against its cmap table), so
            font-display here renders the name in a broken mixed-face splice.
            See Typography.md § Constraint and src/content/en/hero.ts.
          */}
          <p className="mt-6 font-sans text-h3 text-fg-muted">
            {name}
            <span className="ml-3 font-mono text-base text-accent">
              {hero.alias}
            </span>
          </p>
        </StaggerItem>

        <StaggerItem>
          {/* ASCII English copy — safe for the display face. */}
          <h1
            id="hero-heading"
            className="mt-4 max-w-4xl font-display text-display font-bold text-foreground"
          >
            {role}
          </h1>
          {/* `hero.headline` opens with the same three words as `role`, so
              rendering both stutters. The headline is kept in the copy layer
              for metadata/JSON-LD reuse (T026) rather than shown here. */}
        </StaggerItem>

        <StaggerItem>
          <p className="mt-6 max-w-2xl text-lg text-fg-muted">
            {hero.subheadline}
          </p>
        </StaggerItem>

        <StaggerItem className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg">
            <a href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</a>
          </Button>
        </StaggerItem>
      </StaggerReveal>
    </section>
  )
}
