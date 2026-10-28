import { execSync } from 'node:child_process'
import process from 'node:process'

// The commit hash comes from the Vercel or GitHub build when it provides it, the date and count from
// git, so all of them also show locally. Each is empty when git is not available.
function git(args: string): string {
  try {
    return execSync(`git ${args}`).toString().trim()
  }
  catch {
    return ''
  }
}

// A shallow clone cannot count the commits, so the number is left out instead of being wrong
const isShallowClone = git('rev-parse --is-shallow-repository') === 'true'

export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@nuxt/fonts',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'nuxt-auth-utils',
    '@nuxtjs/i18n',
    '@nuxtjs/seo'
  ],
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://photos.pauperwave.org/',
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

  runtimeConfig: {
    public: {
      gitCommitSha: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GITHUB_SHA ?? git('log -1 --format=%H'),
      gitCommitDate: git('log -1 --format=%cI'),
      gitCommitCount: isShallowClone ? '' : git('rev-list --count HEAD')
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

  // Nuxt SEO 6 bundles AI Ready and Skew Protection by default; this site needs neither
  aiReady: false,

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  },

  // The site is served in Italian only: one locale, no prefix in the addresses, no language detection
  i18n: {
    // `language` is the tag written in <html lang>
    locales: [{ code: 'it', language: 'it-IT', name: 'Italiano', file: 'it.json' }],
    defaultLocale: 'it',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    langDir: 'locales/',
    vueI18n: './i18n.config.ts'
  },

  // The scan also reads .ts files, since the icon names are listed in app/utils/icons.ts
  icon: {
    clientBundle: {
      scan: { globInclude: ['**/*.{vue,jsx,tsx,md,mdc,mdx,yml,yaml,ts}'] }
    }
  },

  seo: {
    redirectToCanonicalSiteUrl: true
  },

  // See aiReady above
  skewProtection: false
})
