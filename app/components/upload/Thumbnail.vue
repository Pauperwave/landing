<script setup lang="ts">
const { previewUrl, name } = defineProps<{
  previewUrl: string
  name: string
}>()
</script>

<template>
  <img
    :src="previewUrl"
    :alt="name"
    class="size-16 shrink-0 rounded-md object-cover"
  >
</template>
