import { describe, expect, it } from 'vitest'
import { anonymizeFileName, fitWithin } from './imageUpload'

describe('fitWithin', () => {
  it('keeps an image that already fits', () => {
    expect(fitWithin(1920, 1080, 2560)).toEqual({ width: 1920, height: 1080 })
  })

  it('scales a landscape image down by its width', () => {
    expect(fitWithin(4032, 3024, 2560)).toEqual({ width: 2560, height: 1920 })
  })

  it('scales a portrait image down by its height', () => {
    expect(fitWithin(3024, 4032, 2560)).toEqual({ width: 1920, height: 2560 })
  })

  it('keeps an image whose longest side equals the limit', () => {
    expect(fitWithin(2560, 1440, 2560)).toEqual({ width: 2560, height: 1440 })
  })
})

describe('anonymizeFileName', () => {
  const photo = new File(['pixels'], 'Torneo-Mario-Rossi.JPG', { type: 'image/jpeg' })

  it('replaces the name with a random one and keeps the extension in lowercase', () => {
    expect(anonymizeFileName(photo).name).toMatch(/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}\.jpg$/)
  })

  it('leaves nothing of the original name', () => {
    expect(anonymizeFileName(photo).name).not.toContain('Torneo')
  })

  it('keeps the content and the type', async () => {
    const anonymized = anonymizeFileName(photo)

    expect(anonymized.type).toBe('image/jpeg')
    expect(await anonymized.text()).toBe('pixels')
  })

  it('gives two uploads of the same file different names', () => {
    expect(anonymizeFileName(photo).name).not.toBe(anonymizeFileName(photo).name)
  })

  it('works without an extension', () => {
    expect(anonymizeFileName(new File(['x'], 'photo')).name).toMatch(/^[0-9a-f-]{36}$/)
  })
})
