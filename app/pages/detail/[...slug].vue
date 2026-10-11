<script setup lang="ts">
import type { BlobObject } from '@nuxthub/core/blob'

const route = useRoute()
const { images } = useFile()

// Get the current image based on the slug
const image = computed(() => {
  if (!images.value) return null
  return images.value.find((file: BlobObject) => file.pathname.split('.')[0] === route.params.slug![0])
})

// SEO Meta tags for individual images
watchEffect(() => {
  if (image.value && image.value.pathname) {
    const imageName = ((image.value?.pathname ?? '').split('.')[0] ?? '').replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
    const imageUrl = `${useRequestURL().origin}/images/${image.value.pathname}`

    useSeoMeta({
      title: `${imageName} - Pauperwave`,
      description: `Foto degli eventi Pauperwave: ${imageName}.`,
      ogTitle: `${imageName} - Pauperwave`,
      ogDescription: `Foto degli eventi Pauperwave: ${imageName}.`,
      ogImage: imageUrl,
      ogImageAlt: imageName,
      twitterCard: 'summary_large_image',
      twitterImage: imageUrl,
      twitterImageAlt: imageName
    })
  }
})
</script>

<template>
  <div>
    <ImageDetail />
  </div>
</template>
