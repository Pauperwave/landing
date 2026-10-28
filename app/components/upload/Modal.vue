<script setup lang="ts">
import type { QueuedPhoto, UploadPhase } from '~~/types'

const { photos, phase, readyCount } = defineProps<{
  photos: QueuedPhoto[]
  phase: UploadPhase
  readyCount: number
}>()

const { t } = useI18n()

const open = defineModel<boolean>('open', { required: true })

const emit = defineEmits<{
  remove: [id: string]
  confirm: []
  closed: []
}>()

const isUploading = computed(() => phase === 'uploading')
</script>

<template>
  <UModal
    v-model:open="open"
    :title="t('upload.modalTitle')"
    :description="t('upload.modalDescription')"
    :dismissible="!isUploading"
    :close="!isUploading"
    :ui="{ footer: 'justify-end' }"
    @after:leave="emit('closed')"
  >
    <template #body>
      <UploadList
        :photos="photos"
        :is-removable="!isUploading"
        @remove="emit('remove', $event)"
      />
    </template>

    <template #footer>
      <UploadActions
        :phase="phase"
        :ready-count="readyCount"
        @confirm="emit('confirm')"
        @close="open = false"
      />
    </template>
  </UModal>
</template>
