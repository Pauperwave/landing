<script setup lang="ts">
const { originalSize, preparedSize = null } = defineProps<{
  originalSize: number
  // Null until the photo has been shrunk
  preparedSize?: number | null
}>()

const savedPercentageValue = computed(() => preparedSize === null ? 0 : savedPercentage(originalSize, preparedSize))
</script>

<template>
  <p class="text-sm text-gray-400">
    {{ formatFileSize(originalSize) }}
    <template v-if="preparedSize !== null">
      → {{ formatFileSize(preparedSize) }}
      <span
        v-if="savedPercentageValue > 0"
        class="text-green-400"
      >(-{{ savedPercentageValue }}%)</span>
    </template>
  </p>
</template>
