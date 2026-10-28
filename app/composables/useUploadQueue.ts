import type { QueuedPhoto, UploadPhase } from '../../types'

// The photos picked by the admin go through two steps in series: shrinking, then (after a confirmation) uploading
export function useUploadQueue() {
  const { uploadImage } = useFile()

  const photos = ref<QueuedPhoto[]>([])
  const isUploading = ref(false)
  let isShrinking = false

  const readyCount = computed(() => photos.value.filter(photo => photo.status === 'ready').length)

  const phase = computed<UploadPhase>(() => {
    if (isUploading.value) {
      return 'uploading'
    }

    const isShrinkPending = photos.value.some(photo => photo.status === 'waiting' || photo.status === 'compressing')

    if (isShrinkPending) {
      return 'compressing'
    }

    return readyCount.value > 0 ? 'review' : 'done'
  })

  function addFiles(files: File[]) {
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        continue
      }

      photos.value.push({
        id: crypto.randomUUID(),
        original: file,
        prepared: null,
        previewUrl: URL.createObjectURL(file),
        status: 'waiting',
        errorMessage: null
      })
    }

    shrinkWaitingPhotos()
  }

  async function shrinkWaitingPhotos() {
    if (isShrinking) {
      return
    }

    isShrinking = true

    try {
      let photo = photos.value.find(candidate => candidate.status === 'waiting')

      while (photo) {
        photo.status = 'compressing'
        photo.prepared = await prepareImageForUpload(photo.original)

        if (photo.prepared.size > MAX_UPLOAD_SIZE_IN_BYTES) {
          photo.status = 'failed'
          photo.errorMessage = 'Troppo pesante anche dopo la riduzione'
        }
        else {
          photo.status = 'ready'
        }

        photo = photos.value.find(candidate => candidate.status === 'waiting')
      }
    }
    finally {
      isShrinking = false
    }
  }

  async function uploadReadyPhotos() {
    isUploading.value = true

    try {
      for (const photo of photos.value.filter(candidate => candidate.status === 'ready')) {
        photo.status = 'uploading'

        try {
          await uploadImage(photo.prepared ?? photo.original)
          photo.status = 'uploaded'
        }
        catch (error) {
          const uploadError = error as { data?: { message?: string }, message?: string }

          photo.status = 'failed'
          photo.errorMessage = uploadError.data?.message || uploadError.message || 'Caricamento non riuscito'
        }
      }
    }
    finally {
      isUploading.value = false
    }
  }

  function removePhoto(id: string) {
    const index = photos.value.findIndex(photo => photo.id === id)
    const removedPhoto = photos.value[index]

    if (!removedPhoto) {
      return
    }

    URL.revokeObjectURL(removedPhoto.previewUrl)
    photos.value.splice(index, 1)
  }

  function reset() {
    for (const photo of photos.value) {
      URL.revokeObjectURL(photo.previewUrl)
    }

    photos.value = []
  }

  return {
    photos,
    phase,
    readyCount,
    addFiles,
    uploadReadyPhotos,
    removePhoto,
    reset
  }
}
