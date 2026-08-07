import type { SkillDisplayGroup } from '@/types/portfolio'

/** Skills section — playbooks/SkillsSection.md. Skill rows load from Supabase. */
export const skills = {
  index: '03',
  label: 'SKILLS',
  heading: 'Skills',
  groups: {
    core: { title: 'Core', weight: 'primary' },
    backend_cloud: { title: 'Backend & Cloud', weight: 'secondary' },
    languages_tools: { title: 'Languages & Tools', weight: 'secondary' },
  } satisfies Record<
    SkillDisplayGroup,
    { title: string; weight: 'primary' | 'secondary' }
  >,
  categories: {
    data_science: 'Data Science / Statistics',
    machine_learning: 'Machine Learning',
    data_visualization: 'Data Visualization',
    mlops: 'MLOps',
    backend: 'Backend',
    cloud: 'Cloud',
    languages: 'Languages',
    frameworks: 'Frameworks',
    tools: 'Tools',
  },
  /**
   * Rendered when the `skills` table has no rows yet — mirrors
   * playbooks/SkillsSection.md verbatim. Once seeded, the DB wins; this
   * exists so the section is never an empty frame (same policy as About).
   */
  fallback: [
    {
      category: 'data_science',
      names: [
        'EDA & feature engineering',
        'Applied statistics (distance metrics, precision/recall/F1)',
        'Text preprocessing (NLP tokenization)',
      ],
    },
    {
      category: 'machine_learning',
      names: [
        'k-NN, Naive Bayes, Decision Tree',
        'Gradient Descent, Logistic Regression, K-Means',
        'CNN, RNN/LSTM, Transformer, ViT',
        'Computer Vision (encoder-decoder captioning)',
        'Model evaluation (BLEU, cross-validation)',
      ],
    },
    {
      category: 'data_visualization',
      names: ['Matplotlib', 'Seaborn', 'Plotly'],
    },
    {
      category: 'mlops',
      names: [
        'Experiment tracking',
        'Basic model deployment',
        'Basic CI/CD',
      ],
    },
    {
      category: 'backend',
      names: [
        'Next.js API routes / server actions',
        'Supabase (DB, auth)',
        'RESTful API design',
      ],
    },
    {
      category: 'cloud',
      names: ['Cloudflare (Pages/Workers, DNS)', 'Vercel'],
    },
    {
      category: 'languages',
      names: ['Python', 'TypeScript / JavaScript', 'SQL'],
    },
    {
      category: 'frameworks',
      names: [
        'scikit-learn, PyTorch / TensorFlow',
        'pandas, NumPy',
        'Next.js, React, Tailwind CSS',
        'shadcn/ui, Motion',
      ],
    },
    {
      category: 'tools',
      names: ['Git', 'Jupyter', 'Docker'],
    },
  ],
} as const
