export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@nuxt/fonts',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'nuxt-auth-utils',
    '@nuxtjs/seo'
  ],
  devtools: { enabled: true },

  site: {
    url: 'https://pauperwave.org/',
    name: 'Pauperwave',
    description: 'Foto ed eventi dell\'associazione Pauperwave',
    defaultLocale: 'it',
    indexable: true,
    env: 'production',
    trailingSlash: false
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark' // Default color
  },

  ui: {
    theme: {
      colors: ['gray', 'red']
    }
  },

  experimental: {
    viewTransition: true
  },

  compatibilityDate: '2024-07-30',

  // Blob storage: the local filesystem in development. With S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY
  // and S3_BUCKET (or S3_ENDPOINT) set at build time, the module uses the S3 driver, here Cloudflare
  // R2 behind a site served from Vercel; it picks S3 before Vercel Blob.
  hub: {
    blob: true
  },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  },

  seo: {
    redirectToCanonicalSiteUrl: true
  }
})
