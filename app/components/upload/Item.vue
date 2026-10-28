<script setup lang="ts">
import type { QueuedPhoto } from '~~/types'

const { photo, isRemovable } = defineProps<{
  photo: QueuedPhoto
  isRemovable: boolean
}>()

const emit = defineEmits<{
  remove: []
}>()
</script>

<template>
  <li class="flex items-center gap-3">
    <UploadThumbnail
      :preview-url="photo.previewUrl"
      :name="photo.original.name"
    />
    <div class="min-w-0 flex-1">
      <p class="truncate font-medium">
        {{ photo.original.name }}
      </p>
      <UploadSavings
        :original-size="photo.original.size"
        :prepared-size="photo.prepared?.size ?? null"
      />
      <UploadStatus
        :status="photo.status"
        :error-message="photo.errorMessage"
      />
    </div>
    <UButton
      v-if="isRemovable"
      :icon="ICONS.close"
      color="neutral"
      variant="ghost"
      aria-label="Togli la foto dall'elenco"
      @click="emit('remove')"
    />
  </li>
</template>
