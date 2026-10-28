<script setup lang="ts">
import type { QueuedPhoto } from '~~/types'

const { photos, isRemovable } = defineProps<{
  photos: QueuedPhoto[]
  isRemovable: boolean
}>()

const emit = defineEmits<{
  remove: [id: string]
}>()
</script>

<template>
  <ul class="flex flex-col gap-4">
    <UploadItem
      v-for="photo in photos"
      :key="photo.id"
      :photo="photo"
      :is-removable="isRemovable"
      @remove="emit('remove', photo.id)"
    />
  </ul>
</template>
