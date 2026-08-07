/**
 * Pure display formatters for Skills and Projects.
 *
 * Kept out of the components so they are unit-testable without a renderer
 * (tests/unit/projects.test.ts) and shared by every render path — one shape,
 * no branching in JSX.
 */

import type { SkillCategory } from '@/types/database'
import {
  SKILL_GROUP_BY_CATEGORY,
  type Project,
  type Skill,
  type SkillDisplayGroup,
} from '@/types/portfolio'

/* -------------------------------------------------------------------------- */
/* Skills                                                                     */
/* -------------------------------------------------------------------------- */

/** Within-group category order — the mapping object is already ordered. */
const CATEGORY_ORDER = Object.keys(
  SKILL_GROUP_BY_CATEGORY
) as readonly SkillCategory[]

const GROUP_ORDER: readonly SkillDisplayGroup[] = [
  'core',
  'backend_cloud',
  'languages_tools',
]

export interface SkillCategoryBlock {
  category: SkillCategory
  skills: Skill[]
}

export interface SkillGroupBlock {
  group: SkillDisplayGroup
  categories: SkillCategoryBlock[]
}

/**
 * Bucket flat skill rows into the three presentation groups
 * (data-model.md § Skill → "Category grouping for UI").
 *
 * Empty groups and empty categories are dropped rather than rendered as
 * blank headings — a missing MLOps row should not leave a hole in the page.
 */
export function groupSkills(skills: readonly Skill[]): SkillGroupBlock[] {
  const byCategory = new Map<SkillCategory, Skill[]>()
  for (const skill of skills) {
    const bucket = byCategory.get(skill.category)
    if (bucket) bucket.push(skill)
    else byCategory.set(skill.category, [skill])
  }

  for (const bucket of byCategory.values()) {
    bucket.sort(
      (a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name)
    )
  }

  return GROUP_ORDER.map((group) => ({
    group,
    categories: CATEGORY_ORDER.filter(
      (category) => SKILL_GROUP_BY_CATEGORY[category] === group
    )
      .map((category) => ({ category, skills: byCategory.get(category) ?? [] }))
      .filter((block) => block.skills.length > 0),
  })).filter((block) => block.categories.length > 0)
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                   */
/* -------------------------------------------------------------------------- */

const COURSE_PREFIX = 'course:'
const METRIC_PREFIX = 'metric:'

export interface ProjectMetric {
  label: string
  value: string
}

export interface ProjectTags {
  /** Course/context line, e.g. "Computer Vision course, HUFLIT". */
  course: string | null
  /** Quantified outcomes, rendered as `[BLEU-4: 0.1883]` status tags. */
  metrics: ProjectMetric[]
  /** Everything else — plain technology tags. */
  tech: string[]
}

/**
 * Split `projects.tags` into course context, quantified metrics, and plain
 * technology tags.
 *
 * Course and metrics ride inside the existing `text[]` column behind
 * `course:` and `metric:Label=Value` prefixes rather than getting new
 * columns: v1 content tables are read-only and hand-seeded (ADR-0006), and
 * both are presentation facets of a tag, not new entities.
 *
 * A prefixed entry that carries content but does not parse falls through to
 * `tech` so the typo stays visible; one whose body is empty is dropped —
 * a bare `course:` chip is noise, not information.
 */
export function parseProjectTags(
  tags: readonly string[] | null | undefined
): ProjectTags {
  const result: ProjectTags = { course: null, metrics: [], tech: [] }
  if (!tags) return result

  for (const raw of tags) {
    const tag = raw.trim()
    if (!tag) continue

    if (tag.startsWith(COURSE_PREFIX)) {
      const course = tag.slice(COURSE_PREFIX.length).trim()
      // First one wins; a second `course:` tag is data-entry noise.
      if (course && result.course === null) result.course = course
      continue
    }

    if (tag.startsWith(METRIC_PREFIX)) {
      const body = tag.slice(METRIC_PREFIX.length)
      const split = body.indexOf('=')
      const label = split === -1 ? '' : body.slice(0, split).trim()
      const value = split === -1 ? '' : body.slice(split + 1).trim()
      if (label && value) result.metrics.push({ label, value })
      else if (body.trim()) result.tech.push(tag)
      continue
    }

    result.tech.push(tag)
  }

  return result
}

/**
 * Team-size label. `null` for solo work so the caller omits the row entirely
 * instead of printing "Team: 1".
 *
 * data-model.md makes "team project ⇒ show team_size and role" an
 * application rule, not a DB constraint: when `team_size` is missing we still
 * mark it a team project, just without the count.
 */
export function teamLabel(
  project: Pick<Project, 'is_team_project' | 'team_size'>,
  unit: { one: string; many: string } = { one: 'member', many: 'members' }
): string | null {
  if (!project.is_team_project) return null
  const size = project.team_size
  if (!size || size < 1) return null
  return `${size} ${size === 1 ? unit.one : unit.many}`
}

export type CaseStudyKey = 'problem' | 'approach' | 'impact'

/** Case-study body blocks in narrative order, skipping empty columns. */
export function caseStudyBlocks(
  project: Pick<Project, CaseStudyKey>
): { key: CaseStudyKey; body: string }[] {
  return (['problem', 'approach', 'impact'] as const)
    .map((key) => ({ key, body: project[key]?.trim() ?? '' }))
    .filter((block) => block.body.length > 0)
}

/** A project with no case-study body has nothing to expand into. */
export function hasCaseStudy(project: Pick<Project, CaseStudyKey>): boolean {
  return caseStudyBlocks(project).length > 0
}
