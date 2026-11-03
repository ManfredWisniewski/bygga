// App naming constants — injected from vite.config.ts `define`.
// Change the name once in vite.config.ts (APP), never here.
declare const __APP_META__: { name: string; id: string; storage: string }

export const APP = __APP_META__
