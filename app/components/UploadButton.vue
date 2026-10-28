<script setup lang="ts">
defineProps({
  isOverDropZone: {
    type: Boolean,
    default: false
  },
  uploading: {
    type: Boolean,
    default: false
  }
})

const isSmallScreen = useMediaQuery('(max-width: 1024px)')
</script>

<template>
  <UButton
    variant="outline"
    :color="isOverDropZone ? 'primary' : 'neutral'"
    class="h-25 md:h-50 lg:h-107.5 transition-colors duration-200 group w-full"
  >
    <div class="w-full flex items-center justify-center">
      <div
        v-if="!uploading"
        class="w-full"
      >
        <div
          v-if="!isSmallScreen"
          class="w-full rounded-md flex items-center justify-center h-107.5"
        >
          <UIcon
            :name="ICONS.upload"
            class="group-hover:hidden size-12  m-auto absolute"
          />
          <div
            class="relative opacity-0 group-hover:opacity-100 flex size-full  justify-center items-center transition-all duration-100"
          >
            <UIcon
              :name="ICONS.upload"
              class="absolute m-auto size-12  transition-all duration-100 group-hover:-translate-y-5"
            />
            <span
              class="absolute m-auto opacity-0 group-hover:opacity-100 group-hover:translate-y-5 transition-all duration-200 "
              :class="isOverDropZone ? 'text-green-400' : 'text-gray-400'"
            >Click or Drag & drop to upload</span>
          </div>
        </div>
        <div
          v-else
          class="h-25 md:h-50"
        >
          <div class="relative flex flex-col size-full  justify-center items-center ">
            <UIcon
              :name="ICONS.upload"
              class="size-12  text-white"
            />
            <span class="text-white">Press to upload</span>
          </div>
        </div>
      </div>
      <div v-else>
        <UIcon
          :name="ICONS.spinner"
          class="animate-spin size-12  text-white"
        />
      </div>
    </div>
  </UButton>
</template>
