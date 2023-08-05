export default defineNuxtConfig({
  modules: [
    '@bg-dev/nuxt-naiveui',
    'nuxt-electron'
  ],
  naiveui: {
    colorModePreference: 'system',
    iconSize: 18,
    themeConfig: {}
  },
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            '@css-render/vue3-ssr'
          ]
        : []
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui']
          : []
    }
  },
  electron: {
    build: ['electron/main.ts', 'electron/preload.ts'].map(p => ({ entry: p }))
  }
})
