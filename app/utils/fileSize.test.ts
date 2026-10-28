import { describe, expect, it } from 'vitest'
import { formatFileSize, savedPercentage } from './fileSize'

describe('formatFileSize', () => {
  it('writes bytes without decimals', () => {
    expect(formatFileSize(512)).toBe('512 B')
  })

  it('writes kilobytes and megabytes with one decimal and a comma', () => {
    expect(formatFileSize(1536)).toBe('1,5 KB')
    expect(formatFileSize(6.2 * 1024 * 1024)).toBe('6,2 MB')
  })

  it('moves to the next unit at 1024', () => {
    expect(formatFileSize(1024)).toBe('1,0 KB')
    expect(formatFileSize(1024 * 1024)).toBe('1,0 MB')
  })
})

describe('savedPercentage', () => {
  it('returns the share of bytes removed, rounded', () => {
    expect(savedPercentage(1000, 150)).toBe(85)
    expect(savedPercentage(3, 2)).toBe(33)
  })

  it('returns 0 when nothing was saved', () => {
    expect(savedPercentage(1000, 1000)).toBe(0)
  })

  it('does not divide by zero', () => {
    expect(savedPercentage(0, 0)).toBe(0)
  })
})
