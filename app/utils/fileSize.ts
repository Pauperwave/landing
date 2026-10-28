const UNITS = ['B', 'KB', 'MB', 'GB']

export function formatFileSize(bytes: number): string {
  let value = bytes
  let unitIndex = 0

  while (value >= 1024 && unitIndex < UNITS.length - 1) {
    value /= 1024
    unitIndex++
  }

  const digits = unitIndex === 0 ? 0 : 1

  return `${value.toLocaleString('it-IT', { minimumFractionDigits: digits, maximumFractionDigits: digits })} ${UNITS[unitIndex]}`
}

export function savedPercentage(originalSize: number, preparedSize: number): number {
  if (originalSize <= 0) {
    return 0
  }

  return Math.round((1 - preparedSize / originalSize) * 100)
}
