import { describe, expect, it } from 'vitest'
import { getThemeChoice, resolveDark } from '~/lib/theme'

const storage = (value: string | null) => ({ getItem: () => value })

describe('getThemeChoice', () => {
  it('defaults to system', () => {
    expect(getThemeChoice(storage(null))).toBe('system')
    expect(getThemeChoice(storage('nonsense'))).toBe('system')
  })
  it('reads stored light/dark', () => {
    expect(getThemeChoice(storage('light'))).toBe('light')
    expect(getThemeChoice(storage('dark'))).toBe('dark')
  })
})

describe('resolveDark', () => {
  it('explicit choices win over the media query', () => {
    expect(resolveDark('dark', false)).toBe(true)
    expect(resolveDark('light', true)).toBe(false)
  })
  it('system follows the media query', () => {
    expect(resolveDark('system', true)).toBe(true)
    expect(resolveDark('system', false)).toBe(false)
  })
})
