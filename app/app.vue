<script setup lang="ts">
import { it } from '@nuxt/ui/locale'

const { getImages } = useFile()
const { t, localeProperties } = useI18n()

// The language of the page, so that browsers, screen readers and accessibility checks know it
useHead({
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: localeProperties.value.language
  }
})

useSeoHead({
  title: () => t('app.name'),
  description: () => t('app.description')
})

useSeoMeta({
  ogSiteName: () => t('app.name'),
  twitterCard: 'summary_large_image'
})

// The gallery shell (thumbnails strip, stacked layout) belongs to the photo detail pages only
const route = useRoute()
const isPhotoDetail = computed(() => route.path.startsWith('/detail'))

await getImages()
</script>

<template>
  <!-- Nuxt UI's own texts, such as the label of a modal's close button, are in Italian too -->
  <UApp
    :locale="it"
    class="bg-black min-h-dvh overflow-x-auto relative"
    :class="{ 'flex flex-col md:block': isPhotoDetail }"
  >
    <NuxtPage />
    <ImageThumbnailList
      :class="isPhotoDetail ? 'opacity-100 z-9999' : 'opacity-0 z-[-1]'"
    />
    <footer
      v-if="!isPhotoDetail"
      class="absolute right-3 bottom-1 text-xs text-dimmed"
    >
      <VersionBadge />
    </footer>
  </UApp>
</template>
