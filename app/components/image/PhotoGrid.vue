<script setup lang="ts">
import type { BlobObject } from '@nuxthub/core/blob'

const {
  images,
  loggedIn,
  isSelecting,
  isSelected,
  isActive,
  deletingPathname
} = defineProps<{
  images: BlobObject[]
  loggedIn: boolean
  isSelecting: boolean
  isSelected: (pathname: string) => boolean
  isActive: (pathname: string) => boolean
  deletingPathname: string
}>()

const emit = defineEmits<{
  open: [event: Event, pathname: string]
  toggle: [pathname: string]
  delete: [pathname: string]
}>()
</script>

<template>
  <ul class="grid grid-cols-1 gap-4 lg:block">
    <ImagePhoto
      v-for="image in images"
      :key="image.pathname"
      :image="image"
      :logged-in="loggedIn"
      :is-selecting="isSelecting"
      :is-selected="isSelected(image.pathname)"
      :is-active="isActive(image.pathname)"
      :is-deleting="deletingPathname === image.pathname"
      @open="event => emit('open', event, image.pathname)"
      @toggle="emit('toggle', image.pathname)"
      @delete="emit('delete', image.pathname)"
    />
  </ul>
</template>
