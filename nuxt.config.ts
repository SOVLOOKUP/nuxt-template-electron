export default defineNuxtConfig({
  modules: [
    '@bg-dev/nuxt-naiveui',
    'nuxt-electron',
    '@unocss/nuxt',
    'nuxt-icon',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // 自动引入 `defineStore()`
          'defineStore',
          // 自动引入 `defineStore()` 并重命名为 `definePiniaStore()`
          ['defineStore', 'definePiniaStore']
        ]
      }
    ]
  ],
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
