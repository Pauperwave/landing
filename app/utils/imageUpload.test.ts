import { describe, expect, it } from 'vitest'
import { fitWithin } from './imageUpload'

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
