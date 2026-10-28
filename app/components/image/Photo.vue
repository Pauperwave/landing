<script setup lang="ts">
import type { BlobObject } from '@nuxthub/core/blob'

const {
  image,
  loggedIn,
  isSelecting,
  isSelected,
  isActive,
  isDeleting
} = defineProps<{
  image: BlobObject
  loggedIn: boolean
  isSelecting: boolean
  isSelected: boolean
  isActive: boolean
  isDeleting: boolean
}>()

const { t } = useI18n()

const emit = defineEmits<{
  open: [event: Event]
  toggle: []
  delete: []
}>()
</script>

<template>
  <li class="relative w-full group masonry-item">
    <UCheckbox
      v-if="isSelecting"
      :model-value="isSelected"
      :aria-label="t('selection.photoCheckbox')"
      class="absolute top-4 left-4 z-9999"
      @update:model-value="emit('toggle')"
    />
    <UButton
      v-if="loggedIn && !isSelecting"
      :loading="isDeleting"
      color="gray"
      :icon="ICONS.trash"
      class="absolute top-4 right-4 z-9999 opacity-0 group-hover:opacity-100"
      @click="emit('delete')"
    />
    <NuxtLink
      :to="`/detail/${image.pathname.split('.')[0]}`"
      @click="emit('open', $event)"
    >
      <img
        width="527"
        height="430"
        :src="`/images/${image.pathname}`"
        :alt="t('photo.alt')"
        :class="{ 'imageEl': isActive, 'ring-2 ring-primary': isSelected }"
        class="h-auto w-full max-h-107.5 rounded-md transition-all duration-200 border-image brightness-[.8] hover:brightness-100 will-change-[filter] object-cover"
      >
    </NuxtLink>
  </li>
</template>

<style scoped>
@media (min-width: 768px) {
  .imageEl {
    view-transition-name: vtn-image;
  }

  .border-image {
    border-width: 1.15px;
    border-color: var(--color-image-border)
  }
}

@media screen and (min-width: 1024px) {
  .masonry-item {
    display: inline-block;
    margin: 0 0 20px;
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid;
    width: 100%;
  }
}
</style>
