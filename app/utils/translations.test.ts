import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { describe, expect, it } from 'vitest'
import italian from '../../i18n/locales/it.json'

function sourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry)

    if (statSync(path).isDirectory()) {
      return sourceFiles(path)
    }

    return /\.(vue|ts)$/.test(entry) && !entry.endsWith('.test.ts') ? [path] : []
  })
}

function hasKey(messages: unknown, key: string): boolean {
  const value = key.split('.').reduce<unknown>((node, part) => (node as Record<string, unknown> | undefined)?.[part], messages)

  return typeof value === 'string'
}

describe('it.json', () => {
  it('has every key used in a t() call with a literal key', () => {
    const missing: string[] = []

    for (const file of sourceFiles(join(process.cwd(), 'app'))) {
      for (const match of readFileSync(file, 'utf8').matchAll(/\bt\(\s*'([\w.]+)'/g)) {
        const key = match[1] as string

        if (!hasKey(italian, key)) {
          missing.push(`${file}: ${key}`)
        }
      }
    }

    expect(missing).toEqual([])
  })

  it('has a text for every status of an uploaded photo', () => {
    for (const status of ['waiting', 'compressing', 'ready', 'uploading', 'uploaded', 'failed']) {
      expect(hasKey(italian, `upload.status.${status}`)).toBe(true)
    }
  })

  it('has a name and a description for every site', () => {
    const keys = ['blog', 'choose', 'mtgo', 'calendar', 'membership', 'cityChampionship', 'pauperRanking', 'edhRanking', 'premodernRanking', 'management']

    for (const key of keys) {
      expect(hasKey(italian, `sites.items.${key}.name`)).toBe(true)
      expect(hasKey(italian, `sites.items.${key}.description`)).toBe(true)
    }
  })
})
