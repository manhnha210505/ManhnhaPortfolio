/**
 * Supabase database types.
 *
 * Hand-written to match `.docs/knowledge/architecture/schema.sql`, which is
 * the source of truth. Once the project is provisioned, these can be
 * regenerated with:
 *   pnpm dlx supabase gen types typescript --project-id <ref> > src/types/database.ts
 * Regenerating is preferred over editing by hand — schema.sql stays canonical.
 *
 * Only the five tables surfaced in v1 are typed. `certificates`, `activities`
 * and `awards` exist in the schema but have no v1 UI (research.md R-004).
 */

export type SkillCategory =
  | 'data_science'
  | 'machine_learning'
  | 'data_visualization'
  | 'mlops'
  | 'backend'
  | 'cloud'
  | 'languages'
  | 'frameworks'
  | 'tools'

/**
 * Row shapes are `type`, not `interface`, on purpose — do not convert.
 *
 * supabase-js constrains each table to `Record<string, unknown>`. A type alias
 * gets an implicit index signature and satisfies it; an `interface` does not.
 * With an interface the constraint silently fails, the whole `Database`
 * generic falls back, and every query — including `.insert()` — degrades to
 * `never` with an error pointing at the call site rather than at this file.
 */
type ProfileRow = {
  id: string
  full_name: string
  display_name: string | null
  tagline: string | null
  bio: string | null
  email: string | null
  github_url: string | null
  linkedin_url: string | null
  location: string | null
  career_goal: string | null
  short_term_goal: string | null
  long_term_goal: string | null
  target_company_type: string | null
  hobbies: string | null
  show_hobbies: boolean
  avatar_url: string | null
  resume_url: string | null
  updated_at: string
}

type EducationRow = {
  id: string
  school: string
  major: string | null
  start_date: string | null
  end_date: string | null
  gpa: string | null
  highlights: string[] | null
  sort_order: number
}

type SkillRow = {
  id: string
  category: SkillCategory
  name: string
  is_core: boolean
  sort_order: number
}

type ProjectRow = {
  id: string
  title: string
  slug: string
  summary: string | null
  problem: string | null
  approach: string | null
  impact: string | null
  role: string | null
  is_team_project: boolean
  team_size: number | null
  repo_url: string | null
  demo_url: string | null
  cover_image_url: string | null
  tags: string[] | null
  sort_order: number
  published: boolean
  created_at: string
}

type ContactRow = {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      profile: {
        Row: ProfileRow
        // Read-only: no write path exists for content tables (ADR-0006).
        // `Record<string, never>` rather than `never` — `never` also fails
        // the supabase-js table constraint and collapses the schema.
        Insert: Record<string, never>
        Update: Record<string, never>
        Relationships: []
      }
      education: {
        Row: EducationRow
        // Read-only: no write path exists for content tables (ADR-0006).
        // `Record<string, never>` rather than `never` — `never` also fails
        // the supabase-js table constraint and collapses the schema.
        Insert: Record<string, never>
        Update: Record<string, never>
        Relationships: []
      }
      skills: {
        Row: SkillRow
        // Read-only: no write path exists for content tables (ADR-0006).
        // `Record<string, never>` rather than `never` — `never` also fails
        // the supabase-js table constraint and collapses the schema.
        Insert: Record<string, never>
        Update: Record<string, never>
        Relationships: []
      }
      projects: {
        Row: ProjectRow
        // Read-only: no write path exists for content tables (ADR-0006).
        // `Record<string, never>` rather than `never` — `never` also fails
        // the supabase-js table constraint and collapses the schema.
        Insert: Record<string, never>
        Update: Record<string, never>
        Relationships: []
      }
      contacts: {
        // No public SELECT policy — submissions are private (schema.sql).
        Row: ContactRow
        Insert: Pick<ContactRow, 'name' | 'email' | 'message'>
        Update: Record<string, never>
        Relationships: []
      }
    }
    // supabase-js only recognises a schema that carries all five keys; with
    // any of them missing the generic falls through and every query degrades
    // to `never`. Empty is correct — v1 exposes no views, RPCs or enums.
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
