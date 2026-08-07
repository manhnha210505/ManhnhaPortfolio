/**
 * Navbar labels + section anchors — playbooks/Navbar.md.
 * Hero has no nav item: it is the top of the page by definition.
 */
export const nav = {
  items: [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ],
  // ponytail: CTA points at Contact. Switch to a Resume download once
  // profile.resume_url exists (playbooks/Navbar.md leaves this open).
  cta: { label: 'Get in Touch', href: '#contact' },
  githubLabel: 'GitHub profile (opens in a new tab)',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  skipToContent: 'Skip to content',
} as const

/** Total section count for the Mecha `NN / 06` index motif. */
export const SECTION_TOTAL = '06'
