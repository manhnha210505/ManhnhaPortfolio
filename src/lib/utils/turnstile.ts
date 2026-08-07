const VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/**
 * Verify a Cloudflare Turnstile token server-side (ADR-0007 layer 3).
 *
 * `TURNSTILE_SECRET_KEY` is server-only and must never be prefixed
 * `NEXT_PUBLIC_` (api-contracts.md § Security constraints).
 *
 * Fails closed, same reasoning as the rate limiter: a challenge that cannot
 * be verified has not been passed. The UI surfaces the direct-email fallback
 * so a visitor is never left with no route.
 */
export async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.error('[turnstile] TURNSTILE_SECRET_KEY not set — rejecting.')
    return false
  }
  if (!token) return false

  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
      // Cloudflare occasionally hangs; without this the server action would
      // sit until the platform timeout with the user watching a spinner.
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) return false
    const result: { success?: boolean } = await response.json()
    return result.success === true
  } catch (error) {
    console.error('[turnstile] verification failed:', error)
    return false
  }
}
