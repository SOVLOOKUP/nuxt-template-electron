export default defineNuxtConfig({
  modules: [
    'nuxt-electron',
  ],
  electron: {
    build: ['electron/main.ts', 'electron/preload.ts'].map(p => ({ entry: p })),
  },
})
