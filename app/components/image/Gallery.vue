<script setup lang="ts">
const isUploadModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isDeletingSelection = ref(false)

const dropZoneRef = ref<HTMLElement>()
const deletingImg = ref('')
const disconnect = ref(false)

const { t } = useI18n()
const toast = useToast()
const { deleteImage, deleteImages, images } = useFile()
const { loggedIn, clear } = useUserSession()
const {
  photos: queuedPhotos, phase: uploadPhase, readyCount: readyPhotoCount,
  addFiles, uploadReadyPhotos, removePhoto, reset: resetUploadQueue
} = useUploadQueue()

const {
  isSelecting, selectedPathnames, selectedCount,
  startSelecting, stopSelecting, isSelected, toggle, toggleAll
} = useImageSelection()

const active = useState()

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

function queuePhotos(files: File[]) {
  // Only the admin uploads; a visitor dropping files on the page gets nothing
  if (!loggedIn.value) {
    return
  }

  addFiles(files)

  if (queuedPhotos.value.length > 0) {
    isUploadModalOpen.value = true
  }
}

function onDrop(files: File[] | null) {
  if (files) {
    queuePhotos(files)
  }
}

async function deleteFile(pathname: string) {
  deletingImg.value = pathname

  await deleteImage(pathname)
    .catch(() => toast.add({ title: t('gallery.errorTitle'), description: t('gallery.errorDescription'), color: 'red' }))
    .finally(() => deletingImg.value = '')
}

async function deleteSelection() {
  isDeletingSelection.value = true

  await deleteImages(selectedPathnames.value)
    .then(() => {
      isDeleteModalOpen.value = false
      stopSelecting()
    })
    .catch(() => toast.add({ title: t('gallery.errorTitle'), description: t('gallery.errorDescription'), color: 'red' }))
    .finally(() => isDeletingSelection.value = false)
}

function isActive(pathname: string): boolean {
  return pathname.split('.')[0] === active.value
}

// In selection mode a click ticks the photo instead of opening it
function openOrSelect(event: Event, pathname: string) {
  if (isSelecting.value) {
    event.preventDefault()
    toggle(pathname)

    return
  }

  active.value = pathname.split('.')[0]
}

async function clearSession() {
  disconnect.value = true

  await clear().finally(() => disconnect.value = false)
}
</script>

<template>
  <div>
    <section
      v-if="images"
      ref="dropZoneRef"
      class="relative h-screen gap-5.5 p-4"
    >
      <ImageSelectionMenu
        v-if="isSelecting"
        :selected-count="selectedCount"
        @toggle-all="toggleAll(images.map(image => image.pathname))"
        @cancel="stopSelecting"
        @delete="isDeleteModalOpen = true"
      />
      <ImageToolbar
        v-else
        :logged-in="loggedIn"
        :has-images="images.length > 0"
        :is-signing-out="disconnect"
        @start-selecting="startSelecting"
        @sign-out="clearSession"
      />

      <div
        class="w-full"
        :class="{ 'masonry-container': images && images.length }"
      >
        <template v-if="loggedIn">
          <ImageUploadPanel
            v-model:open="isUploadModalOpen"
            :queued-photos="queuedPhotos"
            :upload-phase="uploadPhase"
            :ready-photo-count="readyPhotoCount"
            :is-over-drop-zone="isOverDropZone"
            @files="queuePhotos"
            @remove="removePhoto"
            @confirm="uploadReadyPhotos"
            @closed="resetUploadQueue"
          />
          <ImageDeleteModal
            v-model:open="isDeleteModalOpen"
            :count="selectedCount"
            :is-deleting="isDeletingSelection"
            @confirm="deleteSelection"
          />
        </template>
        <div
          v-else
          class="text-2xl text-white flex flex-col gap-y-4 items-center justify-center size-full  pb-8"
        >
          <h1 class="font-medium text-5xl">
            {{ t('app.name') }}
          </h1>
          <p class="text-gray-400">
            {{ t('home.tagline') }}
          </p>
        </div>

        <ImagePhotoGrid
          v-if="images && images.length"
          :images="images"
          :logged-in="loggedIn"
          :is-selecting="isSelecting"
          :is-selected="isSelected"
          :is-active="isActive"
          :deleting-pathname="deletingImg"
          @open="openOrSelect"
          @toggle="toggle"
          @delete="deleteFile"
        />
      </div>
    </section>
    <div
      v-else
      class="flex items-center space-x-4 z-10"
    >
      <USkeleton
        class="size-12  rounded-full bg-white-500"
      />
      <div class="space-y-2">
        <USkeleton class="h-4 w-62.5 bg-white-500" />
        <USkeleton class="h-4 w-50 bg-white-500" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 1024px) {
  .masonry-container {
    column-count: 3;
    column-gap: 20px;
    column-fill: balance;
    margin: 20px auto 0;
    padding: 2rem;
  }
}
</style>
