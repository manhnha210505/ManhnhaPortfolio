import { describe, expect, it } from 'vitest'

import { pickActiveSection } from '@/components/navbar'

const ORDER = ['about', 'skills', 'projects', 'contact'] as const

const ratios = (entries: Record<string, number>) =>
  new Map(Object.entries(entries))

describe('pickActiveSection', () => {
  it('picks the most visible section', () => {
    expect(
      pickActiveSection(ratios({ about: 0.2, skills: 0.9 }), ORDER, null)
    ).toBe('skills')
  })

  it('breaks ties toward document order, so scrolling does not flicker back', () => {
    expect(
      pickActiveSection(ratios({ about: 0.5, skills: 0.5 }), ORDER, null)
    ).toBe('about')
  })

  it('keeps the previous section when nothing is visible (e.g. in the Hero)', () => {
    expect(pickActiveSection(ratios({}), ORDER, 'projects')).toBe('projects')
    expect(
      pickActiveSection(ratios({ about: 0, skills: 0 }), ORDER, 'contact')
    ).toBe('contact')
  })

  it('returns null before any section has ever been seen', () => {
    expect(pickActiveSection(ratios({}), ORDER, null)).toBeNull()
  })

  it('ignores ids that are not nav sections', () => {
    expect(
      pickActiveSection(ratios({ hero: 1, about: 0.3 }), ORDER, null)
    ).toBe('about')
  })
})
