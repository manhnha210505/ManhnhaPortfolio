import { describe, expect, it } from 'vitest'

import { contact } from '@/content/en/contact'
import { hero } from '@/content/en/hero'
import { meta } from '@/content/en/meta'
import { buildPersonJsonLd, serializeJsonLd } from '@/lib/utils/json-ld'
import type { Education, Profile, Skill } from '@/types/portfolio'

const SITE = 'https://example.com'

const profile: Profile = {
  id: 'p1',
  full_name: 'Trần Đăng Mạnh',
  display_name: 'manhnha',
  tagline: 'Data Science Engineer',
  bio: null,
  email: 'db@example.com',
  github_url: 'https://github.com/db-user',
  linkedin_url: null,
  location: 'Biên Hòa, Đồng Nai, Vietnam',
  career_goal: null,
  short_term_goal: null,
  long_term_goal: null,
  target_company_type: null,
  hobbies: null,
  show_hobbies: false,
  avatar_url: null,
  resume_url: null,
  updated_at: '2026-01-01T00:00:00Z',
}

const skill = (name: string): Skill => ({
  id: name,
  category: 'machine_learning',
  name,
  is_core: true,
  sort_order: 0,
})

const education: Education[] = [
  {
    id: 'e1',
    school: 'HUFLIT',
    major: 'Data Science',
    start_date: null,
    end_date: null,
    gpa: null,
    highlights: null,
    sort_order: 0,
  },
]

const build = (over: Partial<Parameters<typeof buildPersonJsonLd>[0]> = {}) =>
  buildPersonJsonLd({
    profile,
    skills: [skill('PyTorch')],
    education,
    siteUrl: SITE,
    ...over,
  })

describe('buildPersonJsonLd', () => {
  it('emits the spec-required Person fields (FR-010)', () => {
    const ld = build()
    expect(ld['@context']).toBe('https://schema.org')
    expect(ld['@type']).toBe('Person')
    expect(ld.name).toBe('Trần Đăng Mạnh')
    expect(ld.jobTitle).toBe('Data Science Engineer')
    expect(ld.knowsAbout).toContain('PyTorch')
    expect(ld.sameAs).toContain('https://github.com/db-user')
    expect(ld.url).toBe(SITE)
  })

  it('falls back to the content layer when Supabase returns nothing', () => {
    const ld = build({ profile: null, skills: [], education: [] })
    expect(ld.name).toBe(hero.name)
    expect(ld.alternateName).toBe(hero.alias)
    expect(ld.jobTitle).toBe(meta.jobTitle)
    expect(ld.email).toBe(contact.email)
    expect(ld.sameAs).toEqual([contact.githubUrl])
    expect(ld.knowsAbout.length).toBeGreaterThan(0)
  })

  it('omits absent optional keys rather than emitting null', () => {
    const ld = build({ profile: null, education: [] })
    // Google's validator treats a present-but-null property as malformed.
    expect('image' in ld).toBe(false)
    expect('address' in ld).toBe(false)
    expect('alumniOf' in ld).toBe(false)
    expect(JSON.stringify(ld)).not.toContain('null')
  })

  it('appends LinkedIn only once the column is populated', () => {
    expect(build().sameAs).toHaveLength(1)
    const ld = build({
      profile: { ...profile, linkedin_url: 'https://linkedin.com/in/x' },
    })
    expect(ld.sameAs).toEqual([
      'https://github.com/db-user',
      'https://linkedin.com/in/x',
    ])
  })

  it('dedupes repeated skill names', () => {
    expect(build({ skills: [skill('Python'), skill('Python')] }).knowsAbout).toEqual([
      'Python',
    ])
  })

  it('absolutizes a relative avatar path and strips a trailing slash', () => {
    const ld = build({
      profile: { ...profile, avatar_url: '/me.png' },
      siteUrl: `${SITE}/`,
    })
    expect(ld.url).toBe(SITE)
    expect(ld.image).toBe(`${SITE}/me.png`)
  })

  it('leaves an already-absolute avatar URL alone', () => {
    expect(build({ profile: { ...profile, avatar_url: 'https://cdn/x.png' } }).image).toBe(
      'https://cdn/x.png'
    )
  })
})

describe('serializeJsonLd', () => {
  it('escapes `<` so DB content cannot close the script tag', () => {
    const out = serializeJsonLd(
      build({ profile: { ...profile, full_name: 'A</script><img>' } })
    )
    expect(out).not.toContain('</script>')
    expect(out).toContain('\\u003c/script')
    // Still valid JSON — \u003c is a legal escape, so parsers see the original.
    expect(JSON.parse(out).name).toBe('A</script><img>')
  })
})
