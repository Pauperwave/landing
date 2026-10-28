<script setup lang="ts">
import type { QueuedPhotoStatus } from '~~/types'

const { status, errorMessage = null } = defineProps<{
  status: QueuedPhotoStatus
  errorMessage?: string | null
}>()

const appearances: Record<QueuedPhotoStatus, { label: string, icon: string, textClass: string, isSpinning: boolean }> = {
  waiting: { label: 'In attesa', icon: ICONS.waiting, textClass: 'text-gray-400', isSpinning: false },
  compressing: { label: 'Riduzione in corso', icon: ICONS.spinner, textClass: 'text-gray-300', isSpinning: true },
  ready: { label: 'Pronta', icon: ICONS.ready, textClass: 'text-green-400', isSpinning: false },
  uploading: { label: 'Caricamento in corso', icon: ICONS.spinner, textClass: 'text-gray-300', isSpinning: true },
  uploaded: { label: 'Caricata', icon: ICONS.ready, textClass: 'text-green-400', isSpinning: false },
  failed: { label: 'Errore', icon: ICONS.failed, textClass: 'text-red-400', isSpinning: false }
}

const appearance = computed(() => appearances[status])
const text = computed(() => status === 'failed' && errorMessage ? `${appearance.value.label}: ${errorMessage}` : appearance.value.label)
</script>

<template>
  <p
    class="flex items-center gap-1 text-sm"
    :class="appearance.textClass"
  >
    <UIcon
      :name="appearance.icon"
      class="size-4 shrink-0"
      :class="{ 'animate-spin': appearance.isSpinning }"
      aria-hidden="true"
    />
    <span class="truncate">{{ text }}</span>
  </p>
</template>
