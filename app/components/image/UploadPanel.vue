<script setup lang="ts">
import type { QueuedPhoto, UploadPhase } from '../../../types'

const {
  queuedPhotos,
  uploadPhase,
  readyPhotoCount,
  isOverDropZone
} = defineProps<{
  queuedPhotos: QueuedPhoto[]
  uploadPhase: UploadPhase
  readyPhotoCount: number
  isOverDropZone: boolean
}>()

const open = defineModel<boolean>('open', { required: true })

const emit = defineEmits<{
  files: [files: File[]]
  remove: [id: string]
  confirm: []
  closed: []
}>()

const fileInput = ref<HTMLInputElement>()

function openFilePicker() {
  fileInput.value?.click()
}

function fileSelection(event: Event) {
  const target = event.target as HTMLInputElement

  emit('files', Array.from(target.files ?? []))
  // Lets the admin pick the same files again
  target.value = ''
}
</script>

<template>
  <div>
    <input
      ref="fileInput"
      class="hidden"
      type="file"
      accept="image/*"
      multiple
      @change="fileSelection"
    >
    <UploadModal
      v-model:open="open"
      :photos="queuedPhotos"
      :phase="uploadPhase"
      :ready-count="readyPhotoCount"
      @remove="emit('remove', $event)"
      @confirm="emit('confirm')"
      @closed="emit('closed')"
    />
    <UploadButton
      type="submit"
      class="mb-6"
      :is-over-drop-zone="isOverDropZone"
      @click="openFilePicker"
    />
  </div>
</template>
