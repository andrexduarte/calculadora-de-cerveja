// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  app: {
      baseURL: '/calculadora-de-cerveja/' // baseURL: '/<repository>/'
  },

  css: [
    // SCSS file in the project
    "~/assets/style/main.scss", // you should add main.scss somewhere in your app
  ],

  plugins: [
    '~/plugins/globalVariables.js'
  ],

  ssr: true,

  experimental: {
      payloadExtraction: false
  },

  router: {
      options: {
          strict: false
      }
  },

  sourcemap: false,
  compatibilityDate: '2024-08-29',
})