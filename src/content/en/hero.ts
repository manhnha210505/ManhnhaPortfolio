/** Hero section copy — playbooks/HeroSection.md. */
export const hero = {
  index: '01',
  label: 'HERO',
  /**
   * ⚠️ Contains Vietnamese diacritics (ầ Đ ă ạ). MUST render in the body face
   * (`font-sans`) — Orbitron, the display face, has no diacritic glyphs
   * (verified against its cmap: missing ă Đ ạ ầ, and NFD base+mark fallback
   * is unavailable too). Never apply `font-display` to this string.
   * See Typography.md § Constraint. Overridden by profile.full_name when the
   * Supabase row exists; the same rule applies to that value.
   */
  name: 'Trần Đăng Mạnh',
  alias: 'manhnha',
  role: 'Data Science Engineer',
  headline: 'Data Science Engineer building systems that turn data into understanding.',
  // ⚠️ Generic by design, not an oversight: no target role is locked yet
  // (PersonalProfile.md Mục 2). Make this specific once it is.
  subheadline:
    'Currently studying Data Science at HUFLIT, building end-to-end ML systems — from Vision Transformer image captioning to production-minded classifiers.',
  ctaPrimary: { label: 'View Projects', href: '#projects' },
  ctaSecondary: { label: 'Get in Touch', href: '#contact' },
} as const
