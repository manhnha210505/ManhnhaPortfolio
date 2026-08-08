import { contact } from '@/content/en/contact'
import { hero } from '@/content/en/hero'
import { meta } from '@/content/en/meta'
import { skills as skillsCopy } from '@/content/en/skills'
import type { Education, Profile, Skill } from '@/types/portfolio'

/**
 * Schema.org `Person` structured data (research.md R-007, FR-010).
 *
 * Every field is derived from the live data layer with a content-layer
 * fallback, so the block stays truthful when Supabase is unreachable — the
 * same degradation policy as the sections themselves (`safeQuery`). Nothing
 * here is invented: the fallbacks are the strings already shown on the page.
 *
 * Optional keys are omitted rather than emitted as `null`. Google's Rich
 * Results validator treats a present-but-null property as malformed, whereas
 * an absent one is simply unstated — which is the honest reading for a
 * LinkedIn URL that does not exist yet (spec.md § Assumptions).
 */
export interface PersonJsonLd {
  '@context': 'https://schema.org'
  '@type': 'Person'
  name: string
  alternateName: string
  jobTitle: string
  description: string
  url: string
  /** GitHub first; LinkedIn appended once `profile.linkedin_url` is set. */
  sameAs: string[]
  knowsAbout: string[]
  email?: string
  image?: string
  address?: { '@type': 'Place'; name: string }
  alumniOf?: Array<{
    '@type': 'CollegeOrUniversity'
    name: string
    // `department` is not a CollegeOrUniversity property; the major belongs on
    // the education record, and Person has no slot for it. Dropped on purpose.
  }>
}

interface BuildPersonInput {
  profile: Profile | null
  skills: Skill[]
  education: Education[]
  /** Absolute origin, no trailing slash — the canonical URL for `url`. */
  siteUrl: string
}

/** Flattened content-layer skill names, used when the `skills` table is empty. */
const FALLBACK_SKILL_NAMES: string[] = skillsCopy.fallback.flatMap(
  (group) => group.names as readonly string[]
)

export function buildPersonJsonLd({
  profile,
  skills,
  education,
  siteUrl,
}: BuildPersonInput): PersonJsonLd {
  const origin = siteUrl.replace(/\/+$/, '')

  const knowsAbout = skills.length
    ? dedupe(skills.map((skill) => skill.name))
    : dedupe(FALLBACK_SKILL_NAMES)

  // GitHub is required by the spec, so the content-layer URL backs it up.
  // LinkedIn is genuinely absent today — it joins the list, unchanged, the
  // moment the column is populated.
  const sameAs = dedupe(
    [profile?.github_url ?? contact.githubUrl, profile?.linkedin_url].filter(
      (url): url is string => Boolean(url)
    )
  )

  const jsonLd: PersonJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile?.full_name ?? hero.name,
    alternateName: profile?.display_name ?? hero.alias,
    jobTitle: profile?.tagline ?? meta.jobTitle,
    description: meta.description,
    url: origin,
    sameAs,
    knowsAbout,
  }

  const email = profile?.email ?? contact.email
  if (email) jsonLd.email = email

  // Relative avatars are stored as site paths; consumers need absolute URLs.
  if (profile?.avatar_url) jsonLd.image = absolute(profile.avatar_url, origin)

  if (profile?.location)
    jsonLd.address = { '@type': 'Place', name: profile.location }

  if (education.length)
    jsonLd.alumniOf = education.map((row) => ({
      '@type': 'CollegeOrUniversity',
      name: row.school,
    }))

  return jsonLd
}

function dedupe(values: string[]): string[] {
  return [...new Set(values)]
}

function absolute(url: string, origin: string): string {
  return /^https?:\/\//.test(url) ? url : `${origin}${url.startsWith('/') ? '' : '/'}${url}`
}

/**
 * Serialize for `<script type="application/ld+json">`.
 *
 * `<` is escaped to `<` so a `</script>` sequence inside any DB-sourced
 * string (bio, project title, school name) cannot close the tag early and
 * turn content into markup. `<` is a valid JSON escape, so parsers still
 * read the original character. This is the whole reason the injection is
 * "safe" — `dangerouslySetInnerHTML` does no escaping of its own.
 */
export function serializeJsonLd(jsonLd: PersonJsonLd): string {
  return JSON.stringify(jsonLd).replace(/</g, '\\u003c')
}
