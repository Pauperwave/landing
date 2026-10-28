<script setup lang="ts">
const {
  loggedIn,
  hasImages,
  isSigningOut
} = defineProps<{
  loggedIn: boolean
  hasImages: boolean
  isSigningOut: boolean
}>()

const { t } = useI18n()

const isOpen = ref(false)

const emit = defineEmits<{
  startSelecting: []
  signOut: []
}>()
</script>

<template>
  <BottomMenu class="bottom-menu">
    <template #logo>
      <img
        src="/logo.svg"
        alt=""
        width="29"
        height="20"
      >
    </template>
    <template #description>
      <p class="bottom-menu-description text-sm/tight sm:text-base/normal">
        {{ t('home.menuTitle') }}
      </p>
    </template>
    <template #buttons>
      <div class="flex gap-x-2">
        <UButton
          v-if="loggedIn && hasImages"
          :icon="ICONS.select"
          color="neutral"
          variant="ghost"
          :aria-label="t('selection.start')"
          @click="emit('startSelecting')"
        />
        <UButton
          v-if="loggedIn"
          :loading="isSigningOut"
          :icon="ICONS.signOut"
          color="red"
          variant="ghost"
          @click="emit('signOut')"
        />
        <UModal
          v-model:open="isOpen"
          :title="t('login.title')"
          :close="{
            color: 'gray',
            variant: 'outline',
            class: 'rounded-full'
          }"
        >
          <UButton
            v-if="!loggedIn"
            :label="t('login.action')"
            color="primary"
            variant="ghost"
            :aria-label="t('login.action')"
            class="mr-4 sm:mr-0"
          />
          <template #body>
            <LoginForm @close="isOpen = false" />
          </template>
        </UModal>
      </div>
    </template>
  </BottomMenu>
</template>

<style scoped>
@media (min-width: 768px) {
  .bottom-menu-description {
    view-transition-name: vtn-bottom-menu-description;
  }
}
</style>
