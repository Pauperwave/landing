<script setup lang="ts">
import type { UploadPhase } from '~~/types'

const { phase, readyCount } = defineProps<{
  phase: UploadPhase
  readyCount: number
}>()

const { t } = useI18n()

const emit = defineEmits<{
  confirm: []
  close: []
}>()

const confirmLabels = computed<Record<Exclude<UploadPhase, 'done'>, string>>(() => ({
  compressing: t('upload.shrinking'),
  review: t('upload.confirm', { count: readyCount }),
  uploading: t('upload.uploading')
}))
</script>

<template>
  <UButton
    v-if="phase === 'done'"
    :label="t('upload.close')"
    color="primary"
    @click="emit('close')"
  />
  <template v-else>
    <UButton
      :label="t('upload.cancel')"
      color="neutral"
      variant="outline"
      :disabled="phase === 'uploading'"
      @click="emit('close')"
    />
    <UButton
      :label="confirmLabels[phase]"
      color="primary"
      :disabled="phase !== 'review'"
      :loading="phase !== 'review'"
      @click="emit('confirm')"
    />
  </template>
</template>
