import { z } from 'zod'

import { contact } from '@/content/en/contact'

/**
 * Single source of truth for contact form validation.
 *
 * Imported by both the client component (pre-submit check) and the server
 * action (authoritative check) so the rules cannot drift apart. Client
 * validation is a UX affordance only — the server re-validates every field
 * regardless of what the client sent (api-contracts.md Contract 2, step 4).
 *
 * Bounds come from data-model.md § Contact Submission.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, contact.errors.nameRequired)
    .max(100, contact.errors.nameTooLong),
  email: z
    .string()
    .trim()
    .min(1, contact.errors.emailRequired)
    .email(contact.errors.emailInvalid),
  message: z
    .string()
    .trim()
    .min(10, contact.errors.messageTooShort)
    .max(5000, contact.errors.messageTooLong),
})

export type ContactInput = z.infer<typeof contactSchema>

/**
 * Flatten Zod issues into the `{ field: message }` shape the server action
 * returns and the form renders via `aria-describedby`.
 */
export function toFieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {}
  for (const issue of error.issues) {
    const field = issue.path[0]
    if (typeof field === 'string' && !(field in errors)) {
      errors[field] = issue.message
    }
  }
  return errors
}
