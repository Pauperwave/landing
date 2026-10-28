<script setup lang="ts">
const { count, isDeleting } = defineProps<{
  count: number
  isDeleting: boolean
}>()

const { t } = useI18n()

const open = defineModel<boolean>('open', { required: true })

const emit = defineEmits<{
  confirm: []
}>()
</script>

<template>
  <UModal
    v-model:open="open"
    :title="t('selection.modalTitle')"
    :description="t('selection.modalDescription', { count })"
    :dismissible="!isDeleting"
    :close="!isDeleting"
    :ui="{ footer: 'justify-end' }"
  >
    <template #footer>
      <UButton
        :label="t('selection.cancelDelete')"
        color="neutral"
        variant="outline"
        :disabled="isDeleting"
        @click="open = false"
      />
      <UButton
        :label="t('selection.confirm', { count })"
        color="red"
        :loading="isDeleting"
        @click="emit('confirm')"
      />
    </template>
  </UModal>
</template>
