export default defineNuxtConfig({
  compatibilityDate: '2024-09-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: { appName: 'CopyLab COD' }
  },
  typescript: { strict: true, typeCheck: false },
  app: { head: { title: 'CopyLab COD', meta: [{ name: 'description', content: 'Gestor de copywriting nutracéutico' }] } }
})
