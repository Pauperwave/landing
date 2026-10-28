<script setup lang="ts">
defineProps<{
  selectedCount: number
}>()

const { t } = useI18n()

const emit = defineEmits<{
  toggleAll: []
  cancel: []
  delete: []
}>()
</script>

<template>
  <BottomMenu>
    <template #description>
      <p class="text-sm/tight sm:text-base/normal">
        {{ t('selection.count', { count: selectedCount }, selectedCount) }}
      </p>
    </template>
    <template #buttons>
      <div class="flex gap-x-1">
        <UButton
          :icon="ICONS.selectAll"
          color="neutral"
          variant="ghost"
          :aria-label="t('selection.toggleAll')"
          @click="emit('toggleAll')"
        />
        <UButton
          :icon="ICONS.close"
          color="neutral"
          variant="ghost"
          :aria-label="t('selection.cancel')"
          @click="emit('cancel')"
        />
        <UButton
          :icon="ICONS.trash"
          color="red"
          variant="soft"
          :disabled="selectedCount === 0"
          :aria-label="t('selection.delete')"
          @click="emit('delete')"
        />
      </div>
    </template>
  </BottomMenu>
</template>
