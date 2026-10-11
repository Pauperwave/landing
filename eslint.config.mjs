// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'

export default withNuxt({
  plugins: {
    'better-tailwindcss': betterTailwindcss
  },
  files: ['**/*.vue', '**/*.ts'],
  rules: {
    // `size-[18px]` is written `size-4.5`
    'better-tailwindcss/enforce-canonical-classes': 'error'
  },
  settings: {
    'better-tailwindcss': {
      entryPoint: 'app/assets/css/main.css',
      rootFontSize: 16
    }
  }
})
