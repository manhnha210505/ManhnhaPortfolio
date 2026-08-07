import { createServerClient } from '@/lib/supabase/server'
import type { Education, Profile, Project, Skill } from '@/types/portfolio'

/**
 * Server-side content reads (api-contracts.md Contract 1).
 *
 * Every getter returns `null` / `[]` rather than throwing when Supabase is
 * unreachable or unconfigured. The site must still render its copy-layer
 * fallbacks — a missing env var or a DB blip should degrade one section, not
 * blank the page (ProjectConstitution.md: correctness before completeness).
 */
async function safeQuery<T>(
  label: string,
  run: (db: ReturnType<typeof createServerClient>) => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await run(createServerClient())
  } catch (error) {
    console.error(`[data] ${label} failed:`, error)
    return fallback
  }
}

export function getProfile(): Promise<Profile | null> {
  return safeQuery(
    'getProfile',
    async (db) => {
      const { data, error } = await db.from('profile').select('*').limit(1)
      if (error) throw error
      return data?.[0] ?? null
    },
    null
  )
}

export function getEducation(): Promise<Education[]> {
  return safeQuery(
    'getEducation',
    async (db) => {
      const { data, error } = await db
        .from('education')
        .select('*')
        .order('sort_order', { ascending: true })
      if (error) throw error
      return data ?? []
    },
    []
  )
}

export function getSkills(): Promise<Skill[]> {
  return safeQuery(
    'getSkills',
    async (db) => {
      const { data, error } = await db
        .from('skills')
        .select('*')
        .order('sort_order', { ascending: true })
      if (error) throw error
      return data ?? []
    },
    []
  )
}

/**
 * Published projects only. RLS already filters drafts for `anon`, but the
 * predicate is repeated here so the intent is readable at the call site and
 * survives a policy change (data-model.md § Project).
 */
export function getProjects(): Promise<Project[]> {
  return safeQuery(
    'getProjects',
    async (db) => {
      const { data, error } = await db
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true })
      if (error) throw error
      return data ?? []
    },
    []
  )
}
