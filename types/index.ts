import type { BlobObject } from '@nuxthub/core/blob'

export interface FilePlugin {
  getImages: () => Promise<void>
  images: Ref<BlobObject[]>
  uploadImage: (image: File) => Promise<void>
  deleteImage: (pathname: string) => Promise<void>
  deleteImages: (pathnames: string[]) => Promise<void>
}

export type QueuedPhotoStatus = 'waiting' | 'compressing' | 'ready' | 'uploading' | 'uploaded' | 'failed'

export interface QueuedPhoto {
  id: string
  original: File
  // The smaller copy sent to the server; null until the reduction has run
  prepared: File | null
  previewUrl: string
  status: QueuedPhotoStatus
  errorMessage: string | null
}

export type UploadPhase = 'compressing' | 'review' | 'uploading' | 'done'
