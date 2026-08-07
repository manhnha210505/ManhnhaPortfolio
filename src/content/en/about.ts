/**
 * About section — UI labels and narrative scaffold.
 * Bio, education and hobbies load from Supabase; the strings here are the
 * fallbacks used when the DB has no row yet (data-model.md § Profile).
 */
export const about = {
  index: '02',
  label: 'ABOUT',
  heading: 'About',
  educationHeading: 'Education',
  hobbiesHeading: 'Outside work',
  labels: {
    school: 'School',
    major: 'Major',
    period: 'Period',
    gpa: 'GPA',
    ongoing: 'Present',
  },
  fallback: {
    bio: [
      "I'm Mạnh (manhnha), a Data Science student at HUFLIT (Ho Chi Minh City University of Foreign Languages – Information Technology), expecting to graduate in 2027. My focus spans the full Data Science lifecycle — from statistical analysis and classical ML to deep learning architectures like Vision Transformers, and the MLOps/backend work needed to actually ship a model.",
      "Outside of coursework, I lead student project teams — most recently building an image captioning system from a ViT encoder + Transformer decoder, and a spam classifier using k-NN. I'm the kind of person who'll happily lose a few hours deep in a new AI paper or a debugging session, and I'm just as happy to be in the kitchen or meeting new people when I'm not at the keyboard.",
    ],
    hobbies:
      "When I'm not building models: cooking, chasing the latest in AI, and meeting new people.",
  },
} as const
