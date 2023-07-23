// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@bg-dev/nuxt-naiveui',
    '@pinia/nuxt',
    '@unocss/nuxt'
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
            '@css-render/vue3-ssr',
            'trpc-nuxt'
          ]
        : ['trpc-nuxt']
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui']
          : []
    }
  }
})
