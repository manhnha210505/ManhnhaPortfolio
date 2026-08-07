/**
 * Projects section — UI labels and tech-depth content.
 *
 * Project rows (title, summary, problem/approach/impact, metrics, team) load
 * from Supabase, never hardcoded here (FR-015).
 *
 * Tech-depth annotations (architecture reasoning, failure modes) live in the
 * content layer rather than new DB columns: they are portfolio-presentation
 * concerns authored by the owner, not structured data that would benefit from
 * DB querying or filtering (T023 / US3).
 */
export const projects = {
  index: '04',
  label: 'PROJECTS',
  heading: 'Projects',
  caseStudy: {
    problem: 'Problem',
    approach: 'Approach',
    impact: 'Impact',
    architectureReasoning: 'Architecture Reasoning',
    limitations: 'Known Limitations',
  },
  meta: {
    role: 'Role',
    teamSize: 'Team',
    course: 'Context',
    teamProject: 'TEAM PROJECT',
    solo: 'SOLO',
    /** Pluralisation units for the team-size label. */
    teamUnit: { one: 'member', many: 'members' },
  },
  metricsHeading: 'Results',
  tagsHeading: 'Stack',
  actions: {
    expand: 'Read case study',
    collapse: 'Close case study',
    repo: 'View repository',
    demo: 'Live demo',
  },
  empty: 'Projects are being written up — check back shortly.',

  /**
   * Tech-depth content for US3 (Tech Lead Deep Dive), keyed by project slug.
   *
   * Content sourced from:
   *   - seed.sql problem/approach text (ViT motivation, CNN+RNN comparison)
   *   - spec.md US3-AC1 (ViT vs CNN+RNN architecture reasoning)
   *   - spec.md US3-AC3 (gender misclassification, token repetition)
   *   - seed.sql tags and metrics (k-NN, distance metrics, accuracy figures)
   *
   * Where a statement is reasonable technical interpretation rather than a
   * directly measured result, it is worded as rationale ("chosen because…")
   * rather than as an empirical claim.
   */
  techDepth: {
    'image-captioning': {
      architectureReasoning:
        'ViT was chosen over a CNN+RNN pipeline because self-attention captures global relationships between image regions from the earliest layers. A CNN builds local receptive fields that only reach global context in deep layers, so spatial relationships between distant objects — critical for describing a scene, not just detecting individual objects — are available much later in the network. Pairing the ViT encoder with a Transformer decoder (rather than an LSTM) keeps the entire pipeline attention-based, avoiding the sequential bottleneck of recurrent decoding and enabling the decoder to attend directly to any encoder patch embedding.',
      limitations: [
        'Gender misclassification — the model sometimes assigns incorrect gender to people in images, likely reflecting dataset bias in Flickr8k captions.',
        'Repetitive caption generation — the decoder occasionally produces repeated phrases or loops on the same token sequence, a known failure mode of autoregressive Transformer decoders without length or repetition penalties.',
      ],
    },
    'spam-classification-knn': {
      architectureReasoning:
        'k-NN was chosen as an instance-based classifier that adapts to evolving spam patterns without retraining: new labeled examples immediately influence predictions through the nearest-neighbor vote. TF-IDF vectorization captures term importance relative to the corpus, giving informative spam-indicator words higher weight than common terms. Four distance metrics (Cosine, Euclidean, Manhattan, Minkowski) were compared to find the most effective similarity measure for the high-dimensional TF-IDF feature space.',
      limitations: [
        'Classification depends on the quality and recency of labeled training examples — as spam content evolves, older examples may reduce effectiveness without re-labeling.',
        'High-dimensional TF-IDF vectors can make distance metrics less discriminative (the "curse of dimensionality"), though Cosine similarity partially mitigates this by normalizing for vector magnitude.',
      ],
    },
  } satisfies Record<string, TechDepthEntry>,
} as const

/** Shape of a tech-depth entry so the component can type-check the lookup. */
export interface TechDepthEntry {
  architectureReasoning: string
  limitations: string[]
}
