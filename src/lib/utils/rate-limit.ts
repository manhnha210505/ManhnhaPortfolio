import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

/**
 * Per-IP rate limiting for the contact form (ADR-0007 layer 2).
 *
 * Backed by Upstash Redis rather than an in-memory Map: Vercel serverless
 * instances are ephemeral and multi-region, so an in-process counter resets
 * constantly and enforces nothing (research.md R-005).
 */

/** 5 submissions per IP per hour — generous for a human, useless for a bot. */
export const LIMIT = 5
export const WINDOW = '1 h' as const

/**
 * Decide whether a request is allowed given the current count.
 *
 * Split out from the Redis call so the policy is unit-testable without a
 * network round trip.
 */
export function isWithinLimit(count: number, limit: number = LIMIT): boolean {
  return count <= limit
}

/**
 * Read the client IP from proxy headers.
 *
 * `x-forwarded-for` is a comma-separated chain; the *first* entry is the
 * original client. Vercel and Cloudflare both append, so later entries are
 * proxy hops, not the caller.
 *
 * Spoofable in principle — anything here is client-supplied. That is
 * acceptable: rate limiting is one of three defence layers, not the only
 * one, and Turnstile is the layer that actually resists a determined bot.
 */
export function clientIpFrom(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  return headers.get('x-real-ip')?.trim() || 'unknown'
}

let limiter: Ratelimit | null = null

function getLimiter(): Ratelimit | null {
  if (limiter) return limiter
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null
  }
  limiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(LIMIT, WINDOW),
    prefix: 'contact',
    analytics: false,
  })
  return limiter
}

/**
 * `true` when the submission may proceed.
 *
 * Fails **closed** — if Upstash is unconfigured or unreachable, the request
 * is rejected. An open failure would turn any Redis outage into an
 * unthrottled spam window on the one public write path, and the visitor
 * still has the direct-email fallback the UI always shows.
 */
export async function checkRateLimit(ip: string): Promise<boolean> {
  const rl = getLimiter()
  if (!rl) {
    console.error('[rate-limit] Upstash not configured — rejecting submission.')
    return false
  }
  try {
    const { success } = await rl.limit(ip)
    return success
  } catch (error) {
    console.error('[rate-limit] Upstash call failed:', error)
    return false
  }
}
