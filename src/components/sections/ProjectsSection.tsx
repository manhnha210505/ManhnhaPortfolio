'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useId, useState } from 'react'

import { projects as copy, type TechDepthEntry } from '@/content/en/projects'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerReveal, StaggerItem } from '@/components/motion/StaggerReveal'
import { PanelFrame } from '@/components/ui/panel-frame'
import { SectionIndex } from '@/components/ui/section-index'
import { StatusTag } from '@/components/ui/status-tag'
import { DURATION, EASE } from '@/components/motion/motion-variants'
import {
  caseStudyBlocks,
  hasCaseStudy,
  parseProjectTags,
  teamLabel,
} from '@/lib/data/format'
import type { Project } from '@/types/portfolio'

interface ProjectsSectionProps {
  projects: Project[]
}

/**
 * Projects — the section this site is judged on (playbooks/ProjectsSection.md).
 *
 * Case studies expand inline, never into a modal or a route (FR-005): the
 * reader keeps their scroll position and can compare two projects without
 * losing context.
 *
 * Client component only because of the open/closed state. The rows themselves
 * are fetched on the server and passed down — no client-side data fetching.
 */
export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24"
    >
      <FadeIn>
        <SectionIndex index={copy.index} label={copy.label} />
        <h2
          id="projects-heading"
          className="mt-4 font-display text-h1 font-bold text-foreground"
        >
          {copy.heading}
        </h2>
      </FadeIn>

      {projects.length === 0 ? (
        <FadeIn>
          <p className="mt-10 text-base text-fg-muted">{copy.empty}</p>
        </FadeIn>
      ) : (
        <StaggerReveal as="ul" className="mt-10 space-y-6">
          {projects.map((project) => (
            <StaggerItem as="li" key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerReveal>
      )}
    </section>
  )
}

/** Look up tech-depth content for a project slug. */
function getTechDepth(slug: string): TechDepthEntry | null {
  return (copy.techDepth as Record<string, TechDepthEntry>)[slug] ?? null
}

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const panelId = useId()
  const buttonId = `${panelId}-trigger`

  const { course, metrics, tech } = parseProjectTags(project.tags)
  const team = teamLabel(project, copy.meta.teamUnit)
  const blocks = caseStudyBlocks(project)
  const expandable = hasCaseStudy(project)
  const depth = getTechDepth(project.slug)

  return (
    <PanelFrame clipped className="p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <StatusTag tone="neutral">
          {project.is_team_project ? copy.meta.teamProject : copy.meta.solo}
        </StatusTag>
        {metrics.map((metric) => (
          <StatusTag key={metric.label}>
            {metric.label}: {metric.value}
          </StatusTag>
        ))}
      </div>

      <h3 className="mt-4 font-display text-h2 font-bold text-foreground">
        {project.title}
      </h3>

      {project.summary && (
        <p className="mt-3 max-w-2xl text-base text-fg-muted">
          {project.summary}
        </p>
      )}

      {/* Meta is a description list, not a run of spans: the label→value
          pairing is real structure and screen readers should get it. */}
      <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
        {team && <Meta label={copy.meta.teamSize} value={team} />}
        {project.role && <Meta label={copy.meta.role} value={project.role} />}
        {course && <Meta label={copy.meta.course} value={course} />}
      </dl>

      {tech.length > 0 && (
        <ul aria-label={copy.tagsHeading} className="mt-5 flex flex-wrap gap-2">
          {tech.map((tag) => (
            <li
              key={tag}
              className="border border-border px-2 py-0.5 font-mono text-caption text-fg-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        {expandable && (
          <button
            type="button"
            id={buttonId}
            // Native <button>: Enter/Space, focus order and the disclosure
            // pattern come free. A div + onClick would have to reimplement
            // all three and would still be worse.
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className="font-mono text-sm uppercase tracking-[0.08em] text-accent underline-offset-4 hover:underline focus-visible:underline"
          >
            {open ? copy.actions.collapse : copy.actions.expand}
          </button>
        )}
        {project.repo_url && (
          <ExternalLink href={project.repo_url} label={copy.actions.repo} />
        )}
        {project.demo_url && (
          <ExternalLink href={project.demo_url} label={copy.actions.demo} />
        )}
      </div>

      {expandable && (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              // Height is animated on a wrapper that is absent when closed,
              // so no layout is reserved and CLS stays at 0 (FR-014). The
              // reduced-motion path skips the height tween entirely.
              initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{
                duration: reduced ? DURATION.fast : DURATION.base,
                ease: EASE.mecha,
              }}
              className="overflow-hidden"
            >
              <div className="mt-6 space-y-6 border-t border-border pt-6">
                {blocks.map(({ key, body }) => (
                  <div key={key}>
                    <h4 className="font-mono text-caption uppercase tracking-[0.12em] text-accent">
                      {copy.caseStudy[key]}
                    </h4>
                    <p className="mt-2 max-w-3xl text-base text-fg-muted">
                      {body}
                    </p>
                  </div>
                ))}

                {/* T023 — architecture reasoning (US3-AC1) */}
                {depth?.architectureReasoning && (
                  <div>
                    <h4 className="font-mono text-caption uppercase tracking-[0.12em] text-accent">
                      {copy.caseStudy.architectureReasoning}
                    </h4>
                    <p className="mt-2 max-w-3xl text-base text-fg-muted">
                      {depth.architectureReasoning}
                    </p>
                  </div>
                )}

                {/* T023 — known limitations / failure modes (US3-AC3) */}
                {depth?.limitations && depth.limitations.length > 0 && (
                  <div>
                    <h4 className="font-mono text-caption uppercase tracking-[0.12em] text-accent">
                      {copy.caseStudy.limitations}
                    </h4>
                    <ul className="mt-2 max-w-3xl list-inside list-disc space-y-2 text-base text-fg-muted">
                      {depth.limitations.map((limitation) => (
                        <li key={limitation}>{limitation}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {metrics.length > 0 && (
                  <div>
                    <h4 className="font-mono text-caption uppercase tracking-[0.12em] text-accent">
                      {copy.metricsHeading}
                    </h4>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {metrics.map((metric) => (
                        <li key={metric.label}>
                          <StatusTag>
                            {metric.label}: {metric.value}
                          </StatusTag>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </PanelFrame>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-caption uppercase tracking-[0.08em] text-fg-muted opacity-70">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-foreground">{value}</dd>
    </div>
  )
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-mono text-sm uppercase tracking-[0.08em] text-fg-muted underline-offset-4 hover:text-accent hover:underline"
    >
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
