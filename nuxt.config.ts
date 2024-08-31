// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  app: {
      baseURL: '/calculadora-de-cerveja/', // baseURL: '/<repository>/'
      buildAssetsDir: 'assets', // don't use "_" at the begining of the folder name to avoids nojkill conflict
      head: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1',
      },  
  },

  css: [
    // SCSS file in the project
    "~/assets/style/main.scss", // you should add main.scss somewhere in your app
  ],

  plugins: [
    '~/plugins/globalVariables.js'
  ],

  ssr: false,

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