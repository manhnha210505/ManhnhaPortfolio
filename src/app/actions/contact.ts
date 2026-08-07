'use server'

import { headers } from 'next/headers'

import { contact } from '@/content/en/contact'
import { createServerClient } from '@/lib/supabase/server'
import { checkRateLimit, clientIpFrom } from '@/lib/utils/rate-limit'
import { verifyTurnstile } from '@/lib/utils/turnstile'
import { contactSchema, toFieldErrors } from '@/lib/validation/contact'
import type { ContactResponse } from '@/types/portfolio'

/**
 * Contact form submission — the only public write path
 * (api-contracts.md Contract 2).
 *
 * Steps run in the contract's order: honeypot → rate limit → Turnstile →
 * validation → insert. Cheap local checks come before any network call, so a
 * bot never costs a Redis round trip or a Cloudflare request.
 */
export async function submitContact(
  _prev: ContactResponse | null,
  formData: FormData
): Promise<ContactResponse> {
  // 1. Honeypot. Returns success so the bot learns nothing about detection
  //    (api-contracts.md § Security constraints). Nothing is written.
  const honeypot = formData.get('company')
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return { success: true }
  }

  // 2. Rate limit, per IP (not per session — a session is client-controlled).
  const ip = clientIpFrom(await headers())
  if (!(await checkRateLimit(ip))) {
    return { success: false, error: contact.errors.rateLimited }
  }

  // 3. Turnstile.
  const token = formData.get('cf-turnstile-response')
  if (!(await verifyTurnstile(typeof token === 'string' ? token : ''))) {
    return { success: false, error: contact.errors.turnstileFailed }
  }

  // 4. Validation — authoritative, regardless of what the client checked.
  //    Same schema the client uses, so the two cannot drift (research.md R-005).
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })
  if (!parsed.success) {
    return {
      success: false,
      error: contact.errors.generic,
      errors: toFieldErrors(parsed.error),
    }
  }

  // 5. Insert.
  try {
    const { error } = await createServerClient()
      .from('contacts')
      .insert(parsed.data)
    if (error) throw error
  } catch (error) {
    // Logged server-side; the visitor gets the generic message. DB details
    // must not reach the client.
    console.error('[contact] insert failed:', error)
    return { success: false, error: contact.errors.generic }
  }

  return { success: true }
}
