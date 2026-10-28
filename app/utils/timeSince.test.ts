import { describe, expect, it } from 'vitest'
import { formatElapsed, formatUpdatedAt, timeSince } from './timeSince'

const now = new Date('2026-10-15T12:00:00Z')

describe('timeSince', () => {
  it('reads under a minute as now', () => {
    expect(timeSince('2026-10-15T11:59:30Z', now)).toEqual({ unit: 'now', count: 0 })
  })

  it('uses minutes under an hour', () => {
    expect(timeSince('2026-10-15T11:15:00Z', now)).toEqual({ unit: 'minutes', count: 45 })
  })

  it('uses hours under a day', () => {
    expect(timeSince('2026-10-15T09:00:00Z', now)).toEqual({ unit: 'hours', count: 3 })
  })

  it('uses days under a month', () => {
    expect(timeSince('2026-10-12T12:00:00Z', now)).toEqual({ unit: 'days', count: 3 })
  })

  it('uses months under a year', () => {
    expect(timeSince('2026-07-15T12:00:00Z', now)).toEqual({ unit: 'months', count: 3 })
  })

  it('uses years from a year on', () => {
    expect(timeSince('2024-10-15T12:00:00Z', now)).toEqual({ unit: 'years', count: 2 })
  })

  it('floors to whole units', () => {
    expect(timeSince('2026-10-15T09:59:00Z', now)).toEqual({ unit: 'hours', count: 2 })
  })

  it('reads a future date as now', () => {
    expect(timeSince('2026-10-16T12:00:00Z', now)).toEqual({ unit: 'now', count: 0 })
  })

  it('returns null for an invalid date', () => {
    expect(timeSince('not a date', now)).toBeNull()
  })
})

describe('formatElapsed', () => {
  it('flags under a minute as now', () => {
    expect(formatElapsed('2026-10-15T11:59:40Z', now, 'it-IT')).toEqual({ isNow: true, text: '' })
  })

  it('writes a relative time in Italian', () => {
    expect(formatElapsed('2026-10-15T07:00:00Z', now, 'it-IT'))
      .toEqual({ isNow: false, text: '5 ore fa' })
  })

  it('is null for an invalid date', () => {
    expect(formatElapsed('nope', now, 'it-IT')).toBeNull()
  })
})

describe('formatUpdatedAt', () => {
  it('writes the date and time in Italian', () => {
    expect(formatUpdatedAt('2026-10-15T12:00:00Z', 'it-IT')).toContain('ottobre')
  })
})
