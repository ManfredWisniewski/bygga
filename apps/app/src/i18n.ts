import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      'app.name': 'Bygga',
      'nav.home': 'Home',
      'nav.about': 'About',
      'home.title': 'Generic WIT tool shell',
      'home.body': 'React + Vite + Tauri 2 with biti components and tokens.',
      'home.components': 'biti components',
      'home.tokens': 'Token demo',
      'about.title': 'About',
      'about.body': 'Fork this repository to build a WIT tool.',
      'theme.toggle': 'Switch theme',
      'theme.system': 'System',
      'theme.light': 'Light',
      'theme.dark': 'Dark',
      'lang.switch': 'DE',
    },
  },
  de: {
    translation: {
      'app.name': 'Bygga',
      'nav.home': 'Start',
      'nav.about': 'Info',
      'home.title': 'Generische WIT-Werkzeug-Shell',
      'home.body': 'React + Vite + Tauri 2 mit biti-Komponenten und -Tokens.',
      'home.components': 'biti-Komponenten',
      'home.tokens': 'Token-Demo',
      'about.title': 'Info',
      'about.body': 'Forken Sie dieses Repository, um ein WIT-Werkzeug zu bauen.',
      'theme.toggle': 'Theme wechseln',
      'theme.system': 'System',
      'theme.light': 'Hell',
      'theme.dark': 'Dunkel',
      'lang.switch': 'EN',
    },
  },
} as const

void i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('bygga.language') ?? 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => localStorage.setItem('bygga.language', lng))

export default i18n
