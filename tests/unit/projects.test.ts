import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  caseStudyBlocks,
  groupSkills,
  hasCaseStudy,
  parseProjectTags,
  teamLabel,
} from '@/lib/data/format'
import type { Project, Skill } from '@/types/portfolio'

/* -------------------------------------------------------------------------- */
/* Fetching                                                                   */
/* -------------------------------------------------------------------------- */

const order = vi.fn()
const eq = vi.fn(() => ({ order }))
const select = vi.fn(() => ({ order, eq }))
const from = vi.fn(() => ({ select }))

vi.mock('@/lib/supabase/server', () => ({
  createServerClient: () => ({ from }),
}))

const { getProjects, getSkills } = await import('@/lib/data/portfolio')

const projectRow = (overrides: Partial<Project> = {}): Project => ({
  id: 'p1',
  title: 'Image Captioning',
  slug: 'image-captioning',
  summary: 'ViT encoder + Transformer decoder.',
  problem: 'Multi-modal progress motivated image-to-text.',
  approach: 'ViT encoder paired with a Transformer decoder on Flickr8k.',
  impact: 'BLEU-4 of 0.1883, outperforming CNN+LSTM baselines.',
  role: 'Team Lead',
  is_team_project: true,
  team_size: 4,
  repo_url: 'https://github.com/manhnha210505/image_captioning',
  demo_url: null,
  cover_image_url: null,
  tags: ['PyTorch', 'course:Computer Vision course, HUFLIT'],
  sort_order: 0,
  published: true,
  created_at: '2025-01-01T00:00:00Z',
  ...overrides,
})

describe('getProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Silence the intentional console.error in safeQuery's failure path.
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('returns published rows ordered by sort_order', async () => {
    const rows = [projectRow()]
    order.mockResolvedValue({ data: rows, error: null })

    await expect(getProjects()).resolves.toEqual(rows)
    expect(from).toHaveBeenCalledWith('projects')
    expect(eq).toHaveBeenCalledWith('published', true)
    expect(order).toHaveBeenCalledWith('sort_order', { ascending: true })
  })

  it('degrades to an empty list when the query errors, so the page still renders', async () => {
    order.mockResolvedValue({ data: null, error: { message: 'boom' } })
    await expect(getProjects()).resolves.toEqual([])
  })

  it('degrades to an empty list when Supabase is unreachable', async () => {
    order.mockRejectedValue(new Error('network down'))
    await expect(getProjects()).resolves.toEqual([])
  })

  it('never returns null rows as null', async () => {
    order.mockResolvedValue({ data: null, error: null })
    await expect(getProjects()).resolves.toEqual([])
  })
})

describe('getSkills', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('reads every skill ordered by sort_order — no published filter exists', async () => {
    order.mockResolvedValue({ data: [], error: null })
    await getSkills()
    expect(from).toHaveBeenCalledWith('skills')
    expect(eq).not.toHaveBeenCalled()
    expect(order).toHaveBeenCalledWith('sort_order', { ascending: true })
  })

  it('degrades to an empty list on failure', async () => {
    order.mockRejectedValue(new Error('boom'))
    await expect(getSkills()).resolves.toEqual([])
  })
})

/* -------------------------------------------------------------------------- */
/* parseProjectTags                                                           */
/* -------------------------------------------------------------------------- */

describe('parseProjectTags', () => {
  it('handles a null tags column', () => {
    expect(parseProjectTags(null)).toEqual({
      course: null,
      metrics: [],
      tech: [],
    })
  })

  it('splits course, metrics and plain tech tags', () => {
    const parsed = parseProjectTags([
      'PyTorch',
      'course:Computer Vision course, HUFLIT',
      'metric:BLEU-4=0.1883',
      'ViT',
    ])

    expect(parsed.course).toBe('Computer Vision course, HUFLIT')
    expect(parsed.metrics).toEqual([{ label: 'BLEU-4', value: '0.1883' }])
    expect(parsed.tech).toEqual(['PyTorch', 'ViT'])
  })

  it('keeps metric order and supports values containing "="', () => {
    const parsed = parseProjectTags([
      'metric:Accuracy=96%',
      'metric:Precision=97.3%',
      'metric:Recall=93.5% at k=5',
    ])

    expect(parsed.metrics).toEqual([
      { label: 'Accuracy', value: '96%' },
      { label: 'Precision', value: '97.3%' },
      { label: 'Recall', value: '93.5% at k=5' },
    ])
  })

  it('trims whitespace and drops empty entries', () => {
    const parsed = parseProjectTags(['  Docker  ', '', '   '])
    expect(parsed.tech).toEqual(['Docker'])
  })

  it('keeps the first course tag when the row has two', () => {
    const parsed = parseProjectTags(['course:A', 'course:B'])
    expect(parsed.course).toBe('A')
  })

  it('falls back to a tech tag rather than dropping a malformed prefix', () => {
    const parsed = parseProjectTags(['metric:no-equals', 'course:', 'metric:=5'])
    expect(parsed.metrics).toEqual([])
    expect(parsed.course).toBeNull()
    expect(parsed.tech).toEqual(['metric:no-equals', 'metric:=5'])
  })
})

/* -------------------------------------------------------------------------- */
/* teamLabel                                                                  */
/* -------------------------------------------------------------------------- */

describe('teamLabel', () => {
  it('formats a team project', () => {
    expect(teamLabel({ is_team_project: true, team_size: 4 })).toBe('4 members')
  })

  it('singularises', () => {
    expect(teamLabel({ is_team_project: true, team_size: 1 })).toBe('1 member')
  })

  it('returns null for solo work so the caller omits the row', () => {
    expect(teamLabel({ is_team_project: false, team_size: 3 })).toBeNull()
  })

  it('returns null when a team project has no recorded size', () => {
    expect(teamLabel({ is_team_project: true, team_size: null })).toBeNull()
    expect(teamLabel({ is_team_project: true, team_size: 0 })).toBeNull()
  })

  it('accepts custom units from the copy layer', () => {
    expect(
      teamLabel(
        { is_team_project: true, team_size: 2 },
        { one: 'thành viên', many: 'thành viên' }
      )
    ).toBe('2 thành viên')
  })
})

/* -------------------------------------------------------------------------- */
/* caseStudyBlocks                                                            */
/* -------------------------------------------------------------------------- */

describe('caseStudyBlocks', () => {
  it('returns Problem → Approach → Impact in narrative order', () => {
    expect(caseStudyBlocks(projectRow()).map((b) => b.key)).toEqual([
      'problem',
      'approach',
      'impact',
    ])
  })

  it('skips null and whitespace-only columns', () => {
    const blocks = caseStudyBlocks(
      projectRow({ problem: null, approach: '   ' })
    )
    expect(blocks).toEqual([
      { key: 'impact', body: 'BLEU-4 of 0.1883, outperforming CNN+LSTM baselines.' },
    ])
  })

  it('reports whether there is anything to expand into', () => {
    expect(hasCaseStudy(projectRow())).toBe(true)
    expect(
      hasCaseStudy(projectRow({ problem: null, approach: null, impact: null }))
    ).toBe(false)
  })
})

/* -------------------------------------------------------------------------- */
/* groupSkills                                                                */
/* -------------------------------------------------------------------------- */

const skill = (
  category: Skill['category'],
  name: string,
  sort_order = 0
): Skill => ({ id: `${category}-${name}`, category, name, is_core: false, sort_order })

describe('groupSkills', () => {
  it('buckets categories into the three display groups, core first', () => {
    const grouped = groupSkills([
      skill('tools', 'Git'),
      skill('cloud', 'Vercel'),
      skill('machine_learning', 'PyTorch'),
    ])

    expect(grouped.map((g) => g.group)).toEqual([
      'core',
      'backend_cloud',
      'languages_tools',
    ])
    expect(grouped[0].categories[0].category).toBe('machine_learning')
  })

  it('omits groups and categories with no rows', () => {
    const grouped = groupSkills([skill('mlops', 'Experiment tracking')])
    expect(grouped).toHaveLength(1)
    expect(grouped[0].group).toBe('core')
    expect(grouped[0].categories.map((c) => c.category)).toEqual(['mlops'])
  })

  it('sorts within a category by sort_order, then name', () => {
    const grouped = groupSkills([
      skill('languages', 'TypeScript', 1),
      skill('languages', 'SQL', 1),
      skill('languages', 'Python', 0),
    ])

    expect(grouped[0].categories[0].skills.map((s) => s.name)).toEqual([
      'Python',
      'SQL',
      'TypeScript',
    ])
  })

  it('returns nothing for an empty table rather than empty headings', () => {
    expect(groupSkills([])).toEqual([])
  })
})
