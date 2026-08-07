import { skills as copy } from '@/content/en/skills'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerReveal, StaggerItem } from '@/components/motion/StaggerReveal'
import { PanelFrame } from '@/components/ui/panel-frame'
import { SchematicConnector } from '@/components/ui/schematic-connector'
import { SectionIndex } from '@/components/ui/section-index'
import { groupSkills, type SkillGroupBlock } from '@/lib/data/format'
import { cn } from '@/lib/utils/cn'
import { SKILL_GROUP_BY_CATEGORY, type Skill } from '@/types/portfolio'

interface SkillsSectionProps {
  skills: Skill[]
}

/**
 * Copy-layer fallback shaped as `Skill` rows so there is exactly one render
 * path (About uses the same policy). Not persisted — `id` only needs to be
 * unique within this list.
 */
function fallbackSkills(): Skill[] {
  return copy.fallback.flatMap((block, blockIndex) =>
    block.names.map((name, i) => ({
      id: `fallback-${blockIndex}-${i}`,
      category: block.category,
      name,
      is_core: SKILL_GROUP_BY_CATEGORY[block.category] === 'core',
      sort_order: i,
    }))
  )
}

/**
 * Skills — grouped, never a flat tag cloud, and weighted so the four core
 * areas read first (playbooks/SkillsSection.md, data-model.md § Skill).
 *
 * Server component: the grouping is pure and the section has no interactive
 * state, so nothing here needs to ship to the client.
 */
export function SkillsSection({ skills }: SkillsSectionProps) {
  const grouped = groupSkills(skills.length > 0 ? skills : fallbackSkills())
  const core = grouped.find((g) => g.group === 'core')
  const secondary = grouped.filter((g) => g.group !== 'core')

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24"
    >
      <FadeIn>
        <SectionIndex index={copy.index} label={copy.label} />
        <h2
          id="skills-heading"
          className="mt-4 font-display text-h1 font-bold text-foreground"
        >
          {copy.heading}
        </h2>
      </FadeIn>

      {core && (
        <StaggerReveal className="mt-10 grid gap-4 sm:grid-cols-2">
          {core.categories.map(({ category, skills: rows }) => (
            <StaggerItem key={category}>
              <PanelFrame clipped className="h-full p-6">
                <h3 className="font-display text-h3 text-foreground">
                  {copy.categories[category]}
                </h3>
                <SchematicConnector className="mt-3" />
                <ul className="mt-4 space-y-2">
                  {rows.map((skill) => (
                    <li key={skill.id} className="text-sm text-fg-muted">
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </PanelFrame>
            </StaggerItem>
          ))}
        </StaggerReveal>
      )}

      {secondary.length > 0 && (
        <StaggerReveal className="mt-10 grid gap-10 md:grid-cols-2">
          {secondary.map((block) => (
            <StaggerItem key={block.group}>
              <SecondaryGroup block={block} />
            </StaggerItem>
          ))}
        </StaggerReveal>
      )}
    </section>
  )
}

/**
 * Secondary groups drop the panel frame and sit at body size — the visual
 * weight difference *is* the "core leads" signal, so it must not be
 * flattened back to parity.
 */
function SecondaryGroup({ block }: { block: SkillGroupBlock }) {
  return (
    <div>
      <h3
        className={cn(
          'font-mono text-caption uppercase tracking-[0.12em] text-accent'
        )}
      >
        {copy.groups[block.group].title}
      </h3>
      <dl className="mt-4 space-y-4">
        {block.categories.map(({ category, skills: rows }) => (
          <div key={category}>
            <dt className="text-sm text-foreground">
              {copy.categories[category]}
            </dt>
            <dd className="mt-1 text-sm text-fg-muted">
              {rows.map((s) => s.name).join(' · ')}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
