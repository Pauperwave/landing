<script setup lang="ts">
import type { QueuedPhotoStatus } from '~~/types'

const { status, errorMessage = null } = defineProps<{
  status: QueuedPhotoStatus
  errorMessage?: string | null
}>()

const { t } = useI18n()

const appearances: Record<QueuedPhotoStatus, { icon: string, textClass: string, isSpinning: boolean }> = {
  waiting: { icon: ICONS.waiting, textClass: 'text-gray-400', isSpinning: false },
  compressing: { icon: ICONS.spinner, textClass: 'text-gray-300', isSpinning: true },
  ready: { icon: ICONS.ready, textClass: 'text-green-400', isSpinning: false },
  uploading: { icon: ICONS.spinner, textClass: 'text-gray-300', isSpinning: true },
  uploaded: { icon: ICONS.ready, textClass: 'text-green-400', isSpinning: false },
  failed: { icon: ICONS.failed, textClass: 'text-red-400', isSpinning: false }
}

const appearance = computed(() => appearances[status])
const text = computed(() => status === 'failed' && errorMessage
  ? t('upload.status.failedWithReason', { reason: errorMessage })
  : t(`upload.status.${status}`))
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
