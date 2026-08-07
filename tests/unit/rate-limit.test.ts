import { describe, expect, it } from 'vitest'

import { LIMIT, clientIpFrom, isWithinLimit } from '@/lib/utils/rate-limit'

describe('isWithinLimit', () => {
  it('allows counts up to and including the limit', () => {
    expect(isWithinLimit(1)).toBe(true)
    expect(isWithinLimit(LIMIT)).toBe(true)
  })

  it('rejects the first count past the limit', () => {
    expect(isWithinLimit(LIMIT + 1)).toBe(false)
  })
})

describe('clientIpFrom', () => {
  it('takes the first entry of x-forwarded-for, not a proxy hop', () => {
    const headers = new Headers({
      'x-forwarded-for': '203.0.113.7, 70.41.3.18, 150.172.238.178',
    })
    expect(clientIpFrom(headers)).toBe('203.0.113.7')
  })

  it('trims whitespace around the entry', () => {
    expect(clientIpFrom(new Headers({ 'x-forwarded-for': '  203.0.113.7  ' })))
      .toBe('203.0.113.7')
  })

  it('falls back to x-real-ip', () => {
    expect(clientIpFrom(new Headers({ 'x-real-ip': '198.51.100.4' }))).toBe(
      '198.51.100.4'
    )
  })

  it('prefers x-forwarded-for over x-real-ip', () => {
    const headers = new Headers({
      'x-forwarded-for': '203.0.113.7',
      'x-real-ip': '198.51.100.4',
    })
    expect(clientIpFrom(headers)).toBe('203.0.113.7')
  })

  it('returns a stable bucket key when no header is present', () => {
    // Not empty string: all header-less callers must share one key so they
    // are throttled together rather than each getting a fresh allowance.
    expect(clientIpFrom(new Headers())).toBe('unknown')
  })

  it('ignores an empty x-forwarded-for', () => {
    expect(clientIpFrom(new Headers({ 'x-forwarded-for': '' }))).toBe('unknown')
  })
})
