<script setup lang="ts">
import type { BlobObject } from '@nuxthub/core/blob'
import { decodeImageSlug } from '../utils/url.ts'

const bottomMenu = ref<HTMLElement>()
const imageEl = ref<HTMLImageElement>()

const { images } = useFile()

const isSmallScreen = useMediaQuery('(max-width: 1024px)')
const { currentIndex, isFirstImg, isLastImg, downloadImage, initSwipe } = useImageGallery()

const active = useState()
const route = useRoute()
const router = useRouter()

const image: ComputedRef<BlobObject> = computed(() => {
  if (!route.params.slug || !route.params.slug[0] || !images.value) {
    return {} as BlobObject
  }

  const decodedSlug = decodeImageSlug(route.params.slug[0])
  const foundImage = images.value.find((file: BlobObject) => file.pathname.split('.')[0] === decodedSlug)

  if (!foundImage) {
    console.warn(`Image not found for slug: ${decodedSlug}`)
    return {} as BlobObject
  }

  return foundImage
})

onKeyStroke('Escape', () => {
  router.push('/')
})

onKeyStroke('ArrowLeft', () => {
  if (isFirstImg.value)
    router.push('/')
  else
    router.push(`/detail/${images.value[currentIndex.value - 1]?.pathname.split('.')[0]}`)
})

onKeyStroke('ArrowRight', () => {
  if (isLastImg.value)
    router.push('/')
  else
    router.push(`/detail/${images.value[currentIndex.value + 1]?.pathname.split('.')[0]}`)
})

onMounted(() => {
  initSwipe(imageEl)
})
</script>

<template>
  <div v-if="image">
    <!-- background -->
    <div class="absolute inset-0 size-full ">
      <img
        :src="`/images/${image.pathname}`"
        class="object-cover size-full  blur-[70px] brightness-[.2] will-change-[filter]"
        alt=""
      >
    </div>

    <UContainer class="overflow-x-hidden relative flex items-center justify-center">
      <div class="size-full  max-w-7xl flex items-center justify-center relative mx-auto">
        <!-- Bottom menu -->
        <BottomMenu
          ref="bottomMenu"
          class="bottom-menu"
        >
          <template #description>
            <p class="bottom-menu-description">
              Pauperwave
            </p>
          </template>
          <template #buttons>
            <div class="bottom-menu-button">
              <div class="flex gap-x-2 items-center">
                <!-- back to gallery (desktop & not the first or last image) -->
                <UTooltip
                  v-if="!(isFirstImg || isLastImg) || isSmallScreen"
                  text="Back to gallery"
                  :shortcuts="['Esc']"
                >
                  <UButton
                    variant="ghost"
                    color="gray"
                    to="/"
                    size="md"
                    :icon="ICONS.gallery"
                    aria-label="Back to gallery"
                    class="back flex transition-colors duration-200"
                  />
                </UTooltip>
                <!-- open original -->
                <UTooltip text="Open in a new tab">
                  <UButton
                    variant="ghost"
                    color="gray"
                    :icon="ICONS.externalLink"
                    size="md"
                    :to="`/images/${image.pathname}`"
                    target="_blank"
                    aria-label="Open original image"
                  />
                </UTooltip>
                <!-- download original image -->
                <UTooltip text="Download">
                  <UButton
                    variant="ghost"
                    color="gray"
                    :icon="ICONS.download"
                    size="md"
                    class="hidden md:flex"
                    aria-label="Download image"
                    @click="downloadImage(image.pathname)"
                  />
                </UTooltip>
              </div>
            </div>
          </template>
        </BottomMenu>

        <div class="transition-all duration-200 overflow-hidden pt-8 flex items-center justify-center w-full h-screen relative">
          <div class="flex items-center justify-center md:justify-between gap-x-4 w-full">
            <!-- previous image if not the first image -->
            <UTooltip
              v-if="!isFirstImg"
              text="Previous"
              :shortcuts="['←']"
            >
              <UButton
                variant="ghost"
                color="gray"
                :to="images && images[currentIndex - 1] ? `/detail/${images[currentIndex - 1]?.pathname.split('.')[0]}` : '/'"
                size="lg"
                :icon="ICONS.previous"
                class="hidden md:flex ml-4"
                aria-label="Go to previous image"
                @click="() => { active === image.pathname.split('.')[0] }"
              />
            </UTooltip>

            <div
              v-else
              class="flex group"
            >
              <!-- back to gallery if first image -->
              <UTooltip
                text="Back to gallery"
                :shortcuts="['Esc']"
              >
                <UButton
                  to="/"
                  size="xl"
                  color="gray"
                  variant="ghost"
                  class="back hidden md:flex ml-4 transition-colors duration-200"
                  aria-label="Back to gallery"
                  @click="() => { active === image.pathname.split('.')[0] }"
                >
                  <UIcon
                    :name="ICONS.gallery"
                    class="size-6 "
                  />
                </UButton>
              </UTooltip>
            </div>

            <!-- image -->
            <div class="relative flex items-center justify-center xl:m-16">
              <img
                v-if="image"
                ref="imageEl"
                :src="`/images/${image.pathname}`"
                :alt="image.pathname"
                class="rounded object-contain transition-all duration-200 block w-full"
                :class="{ imageEl: route.params.slug?.[0] === image.pathname.split('.')[0] }"
                crossorigin="anonymous"
              >
            </div>

            <!-- next image (if not the last image) -->
            <UTooltip
              v-if="!isLastImg"
              text="Next"
              :shortcuts="['→']"
            >
              <UButton
                variant="ghost"
                color="gray"
                :to="images && images[currentIndex + 1]?.pathname ? `/detail/${images[currentIndex + 1]?.pathname.split('.')[0]}` : '/'"
                size="lg"
                :icon="ICONS.next"
                class="hidden md:flex mr-4 rounded-full"
                aria-label="Go to next image"
                @click="() => { active === image.pathname.split('.')[0] }"
              />
            </UTooltip>

            <!-- back to gallery if last image -->
            <UTooltip
              v-else
              text="Back to gallery"
              :shortcuts="['Esc']"
            >
              <div class="flex">
                <UButton
                  variant="ghost"
                  color="gray"
                  to="/"
                  size="xl"
                  class="back hidden md:flex mr-4 transition-colors duration-200"
                  aria-label="Back to gallery"
                  @click="() => { active === image.pathname.split('.')[0] }"
                >
                  <UIcon
                    :name="ICONS.gallery"
                    class="size-6 "
                  />
                </UButton>
              </div>
            </UTooltip>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<style scoped lang="postcss">
@media (min-width: 768px) {
  .imageEl {
    view-transition-name: vtn-image;
  }

  .bottom-menu {
    view-transition-name: vtn-bottom-menu;
  }

  .bottom-menu-description {
    view-transition-name: vtn-bottom-menu-description;
  }

  .bottom-menu-button {
    view-transition-name: vtn-bottom-menu-button;
  }

  .back {
    view-transition-name: vtn-back-button;
  }
}
</style>
