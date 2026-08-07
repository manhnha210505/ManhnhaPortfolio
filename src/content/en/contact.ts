/** Contact section — playbooks/ContactSection.md, api-contracts.md Contract 2. */
export const contact = {
  index: '05',
  label: 'CONTACT',
  heading: "Let's talk",
  // ⚠️ Assumes openness to general full-time DS/ML roles — narrow this once
  // PersonalProfile.md Mục 2 (career goals) is filled in.
  subcopy:
    'Open to full-time opportunities in Data Science and Machine Learning. Feel free to reach out — I read everything myself.',
  email: 'manhnha210505@gmail.com',
  githubUrl: 'https://github.com/manhnha210505',
  fields: {
    name: { label: 'Name', placeholder: 'Your name' },
    email: { label: 'Email', placeholder: 'you@example.com' },
    message: { label: 'Message', placeholder: 'What would you like to talk about?' },
  },
  submit: { idle: 'Send message', pending: 'Sending…' },
  success: "Thanks — your message is through. I'll get back to you.",
  errors: {
    nameRequired: 'Please enter your name.',
    nameTooLong: 'Name must be 100 characters or fewer.',
    emailRequired: 'Please enter your email address.',
    emailInvalid: 'Please enter a valid email address.',
    messageTooShort: 'Message must be at least 10 characters.',
    messageTooLong: 'Message must be 5000 characters or fewer.',
    rateLimited: 'Too many submissions. Please try again later.',
    // Never names the honeypot — revealing spam detection helps bots.
    turnstileFailed:
      'Verification failed. Please try again or contact directly at manhnha210505@gmail.com.',
    generic:
      'Something went wrong. Please try again or contact directly at manhnha210505@gmail.com.',
  },
  fallback: {
    prompt: 'Having trouble with the form? Email me directly:',
  },
} as const
