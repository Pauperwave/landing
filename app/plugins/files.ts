import type { FilePlugin } from '../../types'

export default defineNuxtPlugin(() => {
  const images = ref()
  // https://hub.nuxt.com/docs/blob/upload
  // One photo per request: NuxtHub puts every file of a request in one body, and Vercel caps a body at 4.5 MB
  const upload = useUpload('/api/images/upload', { multiple: false })

  async function getImages() {
    const file = await $fetch('/api/images')

    images.value = file
  }

  async function uploadImage(image: File) {
    await upload(image)

    getImages()
  }

  async function deleteImage(pathname: string) {
    await $fetch(`/api/images/${pathname}`, { method: 'DELETE' })

    getImages()
  }

  async function deleteImages(pathnames: string[]) {
    await $fetch('/api/images/delete', { method: 'POST', body: { pathnames } })

    getImages()
  }

  return {
    provide: {
      file: {
        getImages,
        images,
        uploadImage,
        deleteImage,
        deleteImages
      } as FilePlugin
    }
  }
})
