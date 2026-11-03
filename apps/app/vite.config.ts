import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const bitiSrc = fileURLToPath(new URL('../../biti/src', import.meta.url))

// Single source for app naming — change here, it propagates to the
// frontend code (__APP_META__), index.html (%APP_*%) and vitest.
const APP = {
  name: 'Bygga',
  id: 'de.wit.bygga',
  storage: 'bygga.', // localStorage key prefix
}

export default defineConfig({
  base: './',
  define: {
    __APP_META__: JSON.stringify(APP),
  },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'app-meta',
      transformIndexHtml: (html) =>
        html
          .replaceAll('%APP_NAME%', APP.name)
          .replaceAll('%APP_ID%', APP.id)
          .replaceAll('%STORAGE_PREFIX%', APP.storage),
    },
  ],
  resolve: {
    alias: {
      '@': bitiSrc,
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    fs: { allow: [fileURLToPath(new URL('../..', import.meta.url))] },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
