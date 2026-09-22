export default defineNuxtConfig({
  compatibilityDate: '2024-09-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nutra_copy_cod',
    public: { appName: 'CopyLab COD' }
  },
  typescript: { strict: true, typeCheck: false },
  app: { head: { title: 'CopyLab COD', meta: [{ name: 'description', content: 'Gestor de copywriting nutracéutico' }] } }
})
