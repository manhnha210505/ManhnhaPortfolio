# Deployment

## Pipeline
- **Vercel**: automatic Preview Deployments per PR, Production Deployment on merge to main, CI-friendly (build must pass lint/typecheck/tests from `CodeStandards.md` before Vercel build is considered "ready").
- **GitHub Actions**: CI runs lint + typecheck + build + Playwright before Vercel deployment gate.

## Cloudflare in front of Vercel
- Cloudflare handles DNS, CDN, SSL, HTTP/3, Brotli, edge caching, WAF, DDoS protection, security headers.
- ⚠️ **SSL mode must be "Full (strict)"** — if left on "Flexible," you'll get redirect loops or mixed-content/cert errors against Vercel's own TLS termination. Set this explicitly during initial domain setup and document it as a checklist item, not tribal knowledge.
- Edge caching rules should not cache the contact-form API route or any personalized/dynamic response.

## Assets
- Cloudflare R2 holds images/thumbnails/certificates/downloadables — reference via R2 public URLs or a custom domain, not signed URLs that expire, for anything meant to be publicly cacheable.
