// Vercel rejects request bodies above 4.5 MB before the server runs, so photos are shrunk in the browser first
const MAX_SIDE_IN_PIXELS = 2560
const ENCODING_QUALITY = 0.85

export function fitWithin(width: number, height: number, maxSide: number): { width: number, height: number } {
  const longestSide = Math.max(width, height)

  if (longestSide <= maxSide) {
    return { width, height }
  }

  const scale = maxSide / longestSide

  return { width: Math.round(width * scale), height: Math.round(height * scale) }
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string): Promise<Blob | null> {
  return new Promise(resolve => canvas.toBlob(resolve, type, ENCODING_QUALITY))
}

// Returns a smaller WebP (or JPEG) copy of the photo, or the original file when it cannot be improved
export async function prepareImageForUpload(file: File): Promise<File> {
  // A canvas keeps a single frame, which would flatten an animated GIF
  if (file.type === 'image/gif') {
    return file
  }

  let bitmap: ImageBitmap

  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  }
  catch {
    // The browser cannot decode this format (for example HEIC outside Safari): send it untouched
    return file
  }

  const { width, height } = fitWithin(bitmap.width, bitmap.height, MAX_SIDE_IN_PIXELS)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')

  if (!context) {
    bitmap.close()
    return file
  }

  context.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const webp = await canvasToBlob(canvas, 'image/webp')
  // Safari cannot encode WebP and silently returns a PNG, so fall back to JPEG
  const encoded = webp?.type === 'image/webp' ? webp : await canvasToBlob(canvas, 'image/jpeg')

  if (!encoded || encoded.size >= file.size) {
    return file
  }

  const extension = encoded.type === 'image/webp' ? 'webp' : 'jpg'
  const nameWithoutExtension = file.name.replace(/\.[^.]+$/, '')

  return new File([encoded], `${nameWithoutExtension}.${extension}`, { type: encoded.type })
}
