export type ThemeChoice = 'system' | 'light' | 'dark'

import { APP } from '~/lib/app'

const KEY = `${APP.storage}theme`
const MEDIA = '(prefers-color-scheme: dark)'

export function getThemeChoice(storage: Pick<Storage, 'getItem'> = localStorage): ThemeChoice {
  const value = storage.getItem(KEY)
  return value === 'light' || value === 'dark' ? value : 'system'
}

export function resolveDark(
  choice: ThemeChoice,
  prefersDark = matchMedia(MEDIA).matches,
): boolean {
  return choice === 'dark' || (choice === 'system' && prefersDark)
}

export function applyTheme(
  choice: ThemeChoice,
  root: HTMLElement = document.documentElement,
  storage: Pick<Storage, 'setItem'> = localStorage,
): void {
  storage.setItem(KEY, choice)
  root.dataset.theme = resolveDark(choice) ? 'dark' : 'light'
}

/** Follow system changes while the choice is `system`. Call once at startup. */
export function initThemeListener(): void {
  matchMedia(MEDIA).addEventListener('change', () => {
    if (getThemeChoice() === 'system') {
      document.documentElement.dataset.theme = resolveDark('system') ? 'dark' : 'light'
    }
  })
}

import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  matchMedia(MEDIA).addEventListener('change', callback)
  return () => {
    window.removeEventListener('storage', callback)
    matchMedia(MEDIA).removeEventListener('change', callback)
  }
}

let listeners = new Set<() => void>()
function notify() {
  for (const fn of listeners) fn()
}

export function useThemeChoice(): [ThemeChoice, (c: ThemeChoice) => void] {
  const choice = useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      const off = subscribe(cb)
      return () => {
        listeners.delete(cb)
        off()
      }
    },
    getThemeChoice,
  )
  return [
    choice,
    (next) => {
      applyTheme(next)
      notify()
    },
  ]
}
