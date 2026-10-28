<script setup lang="ts">
const { t } = useI18n()

useSeoHead({
  title: () => t('home.title'),
  description: () => t('home.description')
})
</script>

<template>
  <main>
    <ImageGallery />
  </main>
</template>
