<script setup lang="ts">
import type { BlobObject } from '@nuxthub/core/blob'

const route = useRoute()
const { images } = useFile()
const origin = useRequestURL().origin

// Get the current image based on the slug
const image = computed(() => {
  if (!images.value) return null
  return images.value.find((file: BlobObject) => file.pathname.split('.')[0] === route.params.slug![0])
})

const imageUrl = computed(() => image.value ? `${origin}/images/${image.value.pathname}` : undefined)

// SEO meta tags for individual images; the file name is random, so the text is the same for every photo
useSeoHead({
  title: () => image.value ? 'Foto degli eventi - Pauperwave' : undefined,
  description: () => image.value ? 'Una foto degli eventi organizzati dall\'associazione Pauperwave.' : undefined,
  image: imageUrl,
  imageAlt: () => image.value ? PHOTO_ALT_TEXT : undefined
})
</script>

<template>
  <div>
    <ImageDetail />
  </div>
</template>
