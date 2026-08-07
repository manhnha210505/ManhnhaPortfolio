import { describe, expect, it } from 'vitest'

import { contactSchema, toFieldErrors } from '@/lib/validation/contact'

const valid = {
  name: 'Test User',
  email: 'test@example.com',
  message: 'Hello from quickstart validation.',
}

describe('contactSchema', () => {
  it('accepts a valid submission', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('trims before validating, so whitespace is not a value', () => {
    const result = contactSchema.safeParse({ ...valid, name: '   ' })
    expect(result.success).toBe(false)
  })

  it.each([
    ['empty name', { name: '' }],
    ['name over 100 chars', { name: 'a'.repeat(101) }],
    ['invalid email', { email: 'notanemail' }],
    ['empty email', { email: '' }],
    ['message under 10 chars', { message: 'too short' }],
    ['message over 5000 chars', { message: 'a'.repeat(5001) }],
  ])('rejects %s', (_label, override) => {
    expect(contactSchema.safeParse({ ...valid, ...override }).success).toBe(
      false
    )
  })

  it('accepts the exact boundary values', () => {
    expect(
      contactSchema.safeParse({
        name: 'a'.repeat(100),
        email: 'a@b.co',
        message: 'a'.repeat(10),
      }).success
    ).toBe(true)
  })

  it('maps issues to one message per field for aria-describedby', () => {
    const result = contactSchema.safeParse({
      name: '',
      email: 'nope',
      message: '',
    })
    expect(result.success).toBe(false)
    if (result.success) return

    const errors = toFieldErrors(result.error)
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name'])
    expect(errors.email).toBeTruthy()
  })
})
