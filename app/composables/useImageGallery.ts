import type { UseSwipeDirection } from '@vueuse/core'
import type { BlobObject } from '@nuxthub/core/blob'
import type { FilePlugin } from '../../types'
import { encodeImageSlug, decodeImageSlug, isImageMatch } from '~/utils/url'

export function useImageGallery() {
  const nuxtApp = useNuxtApp()
  const router = useRouter()
  const route = useRoute()

  const file = nuxtApp.$file as FilePlugin

  const currentIndex: ComputedRef<number> = computed(() => {
    if (!route.params.slug || !route.params.slug[0] || !file.images.value) {
      return -1
    }

    const decodedSlug = decodeImageSlug(route.params.slug[0])
    return file.images.value.findIndex((image: BlobObject) => image.pathname.split('.')[0] === decodedSlug)
  })

  const isFirstImg: ComputedRef<boolean> = computed(() => {
    if (!route.params.slug || !route.params.slug[0] || !file.images.value || file.images.value.length === 0) {
      return false
    }

    return file.images.value[0] !== undefined
      ? isImageMatch(file.images.value[0].pathname, route.params.slug[0])
      : false
  })

  const isLastImg: ComputedRef<boolean> = computed(() => {
    if (!route.params.slug || !route.params.slug[0] || !file.images.value || file.images.value.length === 0) {
      return false
    }

    const lastImage = file.images.value[file.images.value.length - 1]
    return lastImage ? isImageMatch(lastImage.pathname, route.params.slug[0]) : false
  })

  const navigateToImage = (index: number) => {
    if (!file.images.value || index < 0 || index >= file.images.value.length || !file.images.value[index]) {
      return
    }

    const encodedSlug = encodeImageSlug(file.images.value[index]!.pathname)
    router.push(`/detail/${encodedSlug}`)
  }

  const initSwipe = (el: Ref<HTMLImageElement | undefined>) => {
    useSwipe(el, {
      passive: false,

      onSwipeEnd(e: TouchEvent, direction: UseSwipeDirection) {
        const current = currentIndex.value

        if (direction === 'left') {
          if (isLastImg.value) {
            router.push('/')
          }
          else {
            navigateToImage(current + 1)
          }
        }
        else {
          if (isFirstImg.value) {
            router.push('/')
          }
          else {
            navigateToImage(current - 1)
          }
        }
      }
    })
  }

  const downloadImage = async (filename: string) => {
    await useFetch(`/images/${filename}`).then((response) => {
      const blob = response.data.value as unknown as Blob
      const url: string = URL.createObjectURL(blob)
      const link: HTMLAnchorElement = document.createElement('a')

      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.click()
    })
  }

  return {
    downloadImage,
    initSwipe,
    currentIndex,
    isFirstImg,
    isLastImg
  }
}
