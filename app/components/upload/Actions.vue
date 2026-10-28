<script setup lang="ts">
import type { UploadPhase } from '~~/types'

const { phase, readyCount } = defineProps<{
  phase: UploadPhase
  readyCount: number
}>()

const emit = defineEmits<{
  confirm: []
  close: []
}>()

const confirmLabels = computed<Record<Exclude<UploadPhase, 'done'>, string>>(() => ({
  compressing: 'Riduzione in corso',
  review: `Carica ${readyCount} foto`,
  uploading: 'Caricamento in corso'
}))
</script>

<template>
  <UButton
    v-if="phase === 'done'"
    label="Chiudi"
    color="primary"
    @click="emit('close')"
  />
  <template v-else>
    <UButton
      label="Annulla"
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
