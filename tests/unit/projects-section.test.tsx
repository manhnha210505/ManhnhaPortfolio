import { fireEvent, render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { ProjectsSection } from '@/components/sections/ProjectsSection'
import type { Project } from '@/types/portfolio'

/**
 * US2 independent test, run against the component rather than a browser: the
 * Supabase project is not provisioned yet, so this is the only place the
 * "open the Image Captioning case study" flow is actually exercised.
 */
const imageCaptioning: Project = {
  id: 'p1',
  title: 'Image Captioning',
  slug: 'image-captioning',
  summary:
    'An image captioning system combining a Vision Transformer encoder with a Transformer decoder.',
  problem: 'Multi-modal deep learning progress motivated exploring image-to-text.',
  approach:
    'An encoder-decoder architecture: ViT encoder + Transformer decoder, trained on Flickr8k.',
  impact: 'BLEU-4 of 0.1883, outperforming CNN+LSTM baselines.',
  role: 'Team Lead',
  is_team_project: true,
  team_size: 4,
  repo_url: 'https://github.com/manhnha210505/image_captioning',
  demo_url: null,
  cover_image_url: null,
  tags: ['PyTorch', 'course:Computer Vision course, HUFLIT', 'metric:BLEU-4=0.1883'],
  sort_order: 0,
  published: true,
  created_at: '2025-01-01T00:00:00Z',
}

const spamClassification: Project = {
  id: 'p2',
  title: 'Spam Classification with k-Nearest Neighbors',
  slug: 'spam-classification-knn',
  summary:
    'A spam email classifier built on k-NN with TF-IDF feature vectors.',
  problem: 'Rule-based spam filtering falls behind evolving spam content.',
  approach:
    'Emails vectorized with TF-IDF, classified via k-NN comparing four distance metrics.',
  impact: 'At k=5 — Accuracy 96%, Precision 97.3%, Recall 93.5%.',
  role: 'Team Lead',
  is_team_project: true,
  team_size: 3,
  repo_url: 'https://github.com/manhnha210505/classify_spam_using_k_nearest_neighbors',
  demo_url: null,
  cover_image_url: null,
  tags: [
    'Python',
    'scikit-learn',
    'course:Machine Learning course, HUFLIT',
    'metric:Accuracy=96%',
    'metric:Precision=97.3%',
    'metric:Recall=93.5% at k=5',
  ],
  sort_order: 1,
  published: true,
  created_at: '2025-01-01T00:00:00Z',
}

/**
 * jsdom has no IntersectionObserver, which Motion's `whileInView` needs. The
 * stub reports nothing as intersecting; the reveal wrappers still render their
 * children, which is all these assertions look at.
 */
beforeAll(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return []
      }
      root = null
      rootMargin = ''
      thresholds: number[] = []
    }
  )
})

describe('ProjectsSection', () => {
  it('shows card meta: team tag, team size, role and course context', () => {
    render(<ProjectsSection projects={[imageCaptioning]} />)

    expect(screen.getByText('TEAM PROJECT')).toBeInTheDocument()
    expect(screen.getByText('4 members')).toBeInTheDocument()
    expect(screen.getByText('Team Lead')).toBeInTheDocument()
    expect(
      screen.getByText('Computer Vision course, HUFLIT')
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /View repository/i })
    ).toHaveAttribute('href', imageCaptioning.repo_url)
  })

  it('keeps the case study collapsed until asked', () => {
    render(<ProjectsSection projects={[imageCaptioning]} />)

    expect(
      screen.getByRole('button', { name: /Read case study/i })
    ).toHaveAttribute('aria-expanded', 'false')
    // The <section> is itself a region, so match the panel by its name.
    expect(
      screen.queryByRole('region', { name: /case study/i })
    ).not.toBeInTheDocument()
  })

  it('expands inline with Problem, Approach and Impact — the US2 flow', () => {
    render(<ProjectsSection projects={[imageCaptioning]} />)

    fireEvent.click(screen.getByRole('button', { name: /Read case study/i }))

    const panel = screen.getByRole('region', { name: /case study/i })
    expect(panel).toBeInTheDocument()
    expect(screen.getByText('Problem')).toBeInTheDocument()
    expect(screen.getByText('Approach')).toBeInTheDocument()
    expect(screen.getByText('Impact')).toBeInTheDocument()
    expect(panel).toHaveTextContent(/ViT encoder \+ Transformer decoder/)
    expect(panel).toHaveTextContent(/BLEU-4 of 0\.1883/)
  })

  it('is focusable, toggles closed again, and labels its panel', () => {
    render(<ProjectsSection projects={[imageCaptioning]} />)

    const trigger = screen.getByRole('button', { name: /Read case study/i })
    // A native <button> carries Enter/Space activation and focus order, so
    // the assertion that matters is that it IS one — not a div with onClick.
    expect(trigger.tagName).toBe('BUTTON')
    trigger.focus()
    expect(trigger).toHaveFocus()

    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    // The panel is labelled by its trigger, so the region is announced.
    expect(
      screen.getByRole('region', { name: /case study/i })
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Close case study/i }))
    expect(
      screen.getByRole('button', { name: /Read case study/i })
    ).toHaveAttribute('aria-expanded', 'false')
  })

  it('offers no expander when a project has no case-study body', () => {
    render(
      <ProjectsSection
        projects={[
          { ...imageCaptioning, problem: null, approach: null, impact: null },
        ]}
      />
    )
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('falls back to the copy-layer message when no projects are published', () => {
    render(<ProjectsSection projects={[]} />)
    expect(screen.getByText(/check back shortly/i)).toBeInTheDocument()
  })
})

/* -------------------------------------------------------------------------- */
/* T023 — Tech-depth rendering (US3: Tech Lead Deep Dive)                     */
/* -------------------------------------------------------------------------- */

describe('ProjectsSection — T023 tech depth (Image Captioning)', () => {
  it('shows architecture reasoning when the case study is expanded', () => {
    render(<ProjectsSection projects={[imageCaptioning]} />)
    fireEvent.click(screen.getByRole('button', { name: /Read case study/i }))

    expect(screen.getByText('Architecture Reasoning')).toBeInTheDocument()
    const panel = screen.getByRole('region', { name: /case study/i })
    expect(panel).toHaveTextContent(/ViT was chosen over a CNN\+RNN pipeline/)
    expect(panel).toHaveTextContent(/self-attention captures global relationships/)
    expect(panel).toHaveTextContent(/Transformer decoder/)
  })

  it('shows known limitations with gender misclassification and repetitive captions', () => {
    render(<ProjectsSection projects={[imageCaptioning]} />)
    fireEvent.click(screen.getByRole('button', { name: /Read case study/i }))

    expect(screen.getByText('Known Limitations')).toBeInTheDocument()
    const panel = screen.getByRole('region', { name: /case study/i })
    expect(panel).toHaveTextContent(/Gender misclassification/)
    expect(panel).toHaveTextContent(/Repetitive caption generation/)
  })

  it('keeps BLEU-4 0.1883 visible alongside new depth content', () => {
    render(<ProjectsSection projects={[imageCaptioning]} />)
    fireEvent.click(screen.getByRole('button', { name: /Read case study/i }))

    expect(
      screen.getByRole('region', { name: /case study/i })
    ).toHaveTextContent(/BLEU-4 of 0\.1883/)
  })
})

describe('ProjectsSection — T023 tech depth (Spam Classification)', () => {
  it('shows architecture reasoning for spam classification', () => {
    render(<ProjectsSection projects={[spamClassification]} />)
    fireEvent.click(screen.getByRole('button', { name: /Read case study/i }))

    expect(screen.getByText('Architecture Reasoning')).toBeInTheDocument()
    const panel = screen.getByRole('region', { name: /case study/i })
    expect(panel).toHaveTextContent(/k-NN was chosen/)
    expect(panel).toHaveTextContent(/TF-IDF vectorization/)
    expect(panel).toHaveTextContent(
      /Cosine, Euclidean, Manhattan, Minkowski/
    )
  })

  it('shows known limitations for spam classification', () => {
    render(<ProjectsSection projects={[spamClassification]} />)
    fireEvent.click(screen.getByRole('button', { name: /Read case study/i }))

    expect(screen.getByText('Known Limitations')).toBeInTheDocument()
    const panel = screen.getByRole('region', { name: /case study/i })
    expect(panel).toHaveTextContent(/quality and recency of labeled training/)
    expect(panel).toHaveTextContent(/curse of dimensionality/)
  })

  it('does not show tech-depth blocks for a slug with no entry', () => {
    const unknown: Project = {
      ...imageCaptioning,
      slug: 'unknown-project',
    }
    render(<ProjectsSection projects={[unknown]} />)
    fireEvent.click(screen.getByRole('button', { name: /Read case study/i }))

    expect(screen.queryByText('Architecture Reasoning')).not.toBeInTheDocument()
    expect(screen.queryByText('Known Limitations')).not.toBeInTheDocument()
  })
})

