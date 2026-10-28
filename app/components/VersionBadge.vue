<script setup lang="ts">
// Ported from PrestaBici's PbVersionBadge
import { formatElapsed, formatUpdatedAt } from '~/utils/timeSince'

const { t, localeProperties } = useI18n()
const language = localeProperties.value.language ?? 'it-IT'

const {
  public: { gitCommitSha, gitCommitDate, gitCommitCount }
} = useRuntimeConfig()

const shortSha = gitCommitSha ? gitCommitSha.slice(0, 7) : ''

// `now` is set on mount: the label depends on the current time, which differs between the
// prerendered page and the browser, so rendering it earlier would cause a hydration mismatch
const now = ref<Date | null>(null)
let tick: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  now.value = new Date()
  tick = setInterval(() => {
    now.value = new Date()
  }, 60_000)
})
onUnmounted(() => clearInterval(tick))

const elapsed = computed(() => {
  if (!gitCommitDate || !now.value) {
    return null
  }
  return formatElapsed(gitCommitDate, now.value, language)
})

const updatedTime = computed(() => {
  if (!elapsed.value) {
    return ''
  }
  return elapsed.value.isNow ? t('version.justNow') : elapsed.value.text
})
const updatedAtText = gitCommitDate ? formatUpdatedAt(gitCommitDate, language) : ''
</script>

<template>
  <p
    v-if="shortSha || updatedTime"
    class="m-0 font-mono whitespace-nowrap"
  >
    <template v-if="gitCommitCount">
      <span>v{{ gitCommitCount }}</span>
      <span v-if="shortSha || updatedTime"> • </span>
    </template>
    <span v-if="shortSha">{{ shortSha }}</span>
    <span v-if="shortSha && updatedTime"> • </span>
    <UTooltip
      v-if="updatedTime"
      :text="updatedAtText"
    >
      <span class="cursor-default">{{ updatedTime }}</span>
    </UTooltip>
  </p>
</template>
