import { describe, expect, it } from 'vitest'
import { useImageSelection } from './useImageSelection'

describe('useImageSelection', () => {
  it('starts outside selection mode with nothing selected', () => {
    const selection = useImageSelection()

    expect(selection.isSelecting.value).toBe(false)
    expect(selection.selectedCount.value).toBe(0)
  })

  it('selects and deselects a photo with toggle', () => {
    const selection = useImageSelection()

    selection.toggle('a.webp')
    selection.toggle('b.webp')
    expect(selection.selectedPathnames.value).toEqual(['a.webp', 'b.webp'])
    expect(selection.isSelected('a.webp')).toBe(true)

    selection.toggle('a.webp')
    expect(selection.selectedPathnames.value).toEqual(['b.webp'])
    expect(selection.isSelected('a.webp')).toBe(false)
  })

  it('selects every photo with toggleAll, then clears them on the second call', () => {
    const selection = useImageSelection()
    const allPathnames = ['a.webp', 'b.webp', 'c.webp']

    selection.toggle('b.webp')
    selection.toggleAll(allPathnames)
    expect(selection.selectedPathnames.value).toEqual(allPathnames)

    selection.toggleAll(allPathnames)
    expect(selection.selectedCount.value).toBe(0)
  })

  it('does not select anything with toggleAll on an empty gallery', () => {
    const selection = useImageSelection()

    selection.toggleAll([])
    expect(selection.selectedCount.value).toBe(0)
  })

  it('clears the selection when leaving selection mode', () => {
    const selection = useImageSelection()

    selection.startSelecting()
    selection.toggle('a.webp')
    selection.stopSelecting()

    expect(selection.isSelecting.value).toBe(false)
    expect(selection.selectedCount.value).toBe(0)
  })
})
