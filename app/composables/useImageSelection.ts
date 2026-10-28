import { computed, ref } from 'vue'

// The photos the admin has ticked while the gallery is in selection mode
export function useImageSelection() {
  const isSelecting = ref(false)
  const selectedPathnames = ref<string[]>([])
  const selectedCount = computed(() => selectedPathnames.value.length)

  function startSelecting() {
    isSelecting.value = true
  }

  function stopSelecting() {
    isSelecting.value = false
    selectedPathnames.value = []
  }

  function isSelected(pathname: string): boolean {
    return selectedPathnames.value.includes(pathname)
  }

  function toggle(pathname: string) {
    selectedPathnames.value = isSelected(pathname)
      ? selectedPathnames.value.filter(selectedPathname => selectedPathname !== pathname)
      : [...selectedPathnames.value, pathname]
  }

  // Selects every photo, or clears the selection when every photo is already selected
  function toggleAll(allPathnames: string[]) {
    const isEverythingSelected = allPathnames.length > 0 && allPathnames.every(isSelected)

    selectedPathnames.value = isEverythingSelected ? [] : [...allPathnames]
  }

  return {
    isSelecting, selectedPathnames, selectedCount,
    startSelecting, stopSelecting, isSelected, toggle, toggleAll
  }
}
