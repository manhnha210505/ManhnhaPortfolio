/**
 * Absolute origin for canonical + Open Graph URLs (research.md R-007).
 *
 * Set explicitly rather than inferred: Cloudflare in front of Vercel can
 * serve the same build on two hostnames, and a relative canonical would let
 * both index. `NEXT_PUBLIC_SITE_URL` must be set to the production domain in
 * the Vercel project; the localhost default only covers local dev.
 *
 * Inlined at build time by Next (NEXT_PUBLIC_*), so it is safe in both
 * server and client bundles. Trailing slashes are stripped so callers can
 * concatenate paths.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
).replace(/\/+$/, '')

/** Page metadata — research.md R-007. Consumed by layout.tsx (T026). */
export const meta = {
  title: 'Trần Đăng Mạnh — Data Science Engineer',
  description:
    'Data Science Engineer building end-to-end ML systems — Vision Transformer image captioning, production-minded classifiers, and the MLOps work to ship them.',
  jobTitle: 'Data Science Engineer',
  ogImage: '/og.png',
  ogImageAlt: 'Trần Đăng Mạnh — Data Science Engineer',
  locale: 'en_US',
} as const
