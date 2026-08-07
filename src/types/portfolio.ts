/**
 * Domain entities for the portfolio UI.
 *
 * These alias the DB row types rather than redefining them — the schema is
 * already shaped for display (data-model.md), so a separate mapping layer
 * would be duplication with no payoff. If the two ever diverge, introduce
 * mappers here rather than reshaping the schema.
 */

import type { Database, SkillCategory } from '@/types/database'

type Tables = Database['public']['Tables']

export type Profile = Tables['profile']['Row']
export type Education = Tables['education']['Row']
export type Skill = Tables['skills']['Row']
export type Project = Tables['projects']['Row']

export type { SkillCategory }

/**
 * Presentation grouping for the Skills section.
 *
 * Lives in the frontend, not the DB: `category` stays the atomic column and
 * this mapping decides visual weight (data-model.md § Skill).
 */
export type SkillDisplayGroup = 'core' | 'backend_cloud' | 'languages_tools'

export const SKILL_GROUP_BY_CATEGORY: Record<SkillCategory, SkillDisplayGroup> =
  {
    data_science: 'core',
    machine_learning: 'core',
    data_visualization: 'core',
    mlops: 'core',
    backend: 'backend_cloud',
    cloud: 'backend_cloud',
    languages: 'languages_tools',
    frameworks: 'languages_tools',
    tools: 'languages_tools',
  }

/** Result of the contact form server action (api-contracts.md Contract 2). */
export type ContactResponse =
  | { success: true }
  | { success: false; error: string; errors?: Record<string, string> }
