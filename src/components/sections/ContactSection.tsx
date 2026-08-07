'use client'

import Script from 'next/script'
import { useActionState, useRef, useState } from 'react'

import { submitContact } from '@/app/actions/contact'
import { FadeIn } from '@/components/motion/FadeIn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SectionIndex } from '@/components/ui/section-index'
import { Textarea } from '@/components/ui/textarea'
import { contact } from '@/content/en/contact'
import { contactSchema, toFieldErrors } from '@/lib/validation/contact'
import type { ContactResponse } from '@/types/portfolio'

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

export function ContactSection() {
  const [state, formAction, pending] = useActionState<
    ContactResponse | null,
    FormData
  >(submitContact, null)

  // Client-side validation is a UX affordance only — the server re-checks
  // everything (US4-AC2, api-contracts.md Contract 2 step 4).
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLFormElement>(null)

  const serverErrors = state && !state.success ? (state.errors ?? {}) : {}
  const errors = { ...clientErrors, ...serverErrors }
  const succeeded = state?.success === true

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget)
    const parsed = contactSchema.safeParse({
      name: data.get('name'),
      email: data.get('email'),
      message: data.get('message'),
    })
    if (!parsed.success) {
      event.preventDefault()
      setClientErrors(toFieldErrors(parsed.error))
      return
    }
    setClientErrors({})
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24"
    >
      {SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />
      )}

      <FadeIn>
        <SectionIndex index={contact.index} label={contact.label} />
        <h2
          id="contact-heading"
          className="mt-4 font-display text-h1 font-bold text-foreground"
        >
          {contact.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-base text-fg-muted">
          {contact.subcopy}
        </p>
      </FadeIn>

      <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <FadeIn>
          {succeeded ? (
            // Icon + text, never color alone (Accessibility.md).
            <p
              role="status"
              className="border border-semantic-success/40 bg-bg-elevated px-4 py-6 text-base text-semantic-success"
            >
              ✓ {contact.success}
            </p>
          ) : (
            <form
              ref={formRef}
              action={formAction}
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >
              {/* Honeypot. Named `company` because bots fill plausible field
                  names; `aria-hidden` + tabIndex keeps it away from real
                  users and assistive tech. Not `display:none` — some bots
                  skip those. */}
              <div
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
              >
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <Field
                id="name"
                label={contact.fields.name.label}
                error={errors.name}
              >
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder={contact.fields.name.placeholder}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
              </Field>

              <Field
                id="email"
                label={contact.fields.email.label}
                error={errors.email}
              >
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={contact.fields.email.placeholder}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </Field>

              <Field
                id="message"
                label={contact.fields.message.label}
                error={errors.message}
              >
                <Textarea
                  id="message"
                  name="message"
                  placeholder={contact.fields.message.placeholder}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'message-error' : undefined
                  }
                />
              </Field>

              {SITE_KEY && (
                <div className="cf-turnstile" data-sitekey={SITE_KEY} />
              )}

              {state?.success === false && state.error && (
                <p role="alert" className="text-sm text-semantic-error">
                  {state.error}
                </p>
              )}

              <Button type="submit" size="lg" disabled={pending}>
                {pending ? contact.submit.pending : contact.submit.idle}
              </Button>
            </form>
          )}
        </FadeIn>

        {/* Always visible, not only on failure — a visitor is never left
            without a route to reach out (playbooks/ContactSection.md). */}
        <FadeIn delay={0.1} className="space-y-3">
          <p className="text-sm text-fg-muted">{contact.fallback.prompt}</p>
          <a
            href={`mailto:${contact.email}`}
            className="block font-mono text-sm text-accent hover:text-accent-hover"
          >
            {contact.email}
          </a>
          <a
            href={contact.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-mono text-sm text-accent hover:text-accent-hover"
          >
            github.com/manhnha210505
          </a>
        </FadeIn>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block font-mono text-caption uppercase tracking-[0.12em] text-fg-muted"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-semantic-error">
          {error}
        </p>
      )}
    </div>
  )
}
