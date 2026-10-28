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

const imageName = computed(() => image.value?.pathname.split('.')[0]?.replace(/-/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase()))
const imageUrl = computed(() => image.value ? `${origin}/images/${image.value.pathname}` : undefined)

// SEO meta tags for individual images
useSeoHead({
  title: () => imageName.value ? `${imageName.value} - Pauperwave` : undefined,
  description: () => imageName.value ? `Foto degli eventi Pauperwave: ${imageName.value}.` : undefined,
  image: imageUrl,
  imageAlt: imageName
})
</script>

<template>
  <div>
    <ImageDetail />
  </div>
</template>
