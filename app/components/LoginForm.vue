<script setup lang="ts">
const emit = defineEmits<{ close: [boolean] }>()

const { fetch: refreshSession } = useUserSession()
const password = ref('')
const loading = ref(false)

const { t } = useI18n()
const toast = useToast()

async function login() {
  if (loading.value || !password.value) return
  loading.value = true
  await $fetch('/api/auth', {
    method: 'POST',
    body: { password: password.value }
  })
    .then(async () => {
      await refreshSession()
      emit('close', true)
    })
    .catch((err) => {
      toast.add({
        title: t('login.errorTitle', { code: err.statusCode }),
        description: t('login.errorDescription', { message: err.data?.message || err.message }),
        color: 'red'
      })
    })
  loading.value = false
}
</script>

<template>
  <form
    class="flex flex-col gap-y-4 p-4 items-center"
    @submit.prevent="login"
  >
    <UInput
      v-model="password"
      type="password"
      :placeholder="t('login.passwordPlaceholder')"
      :icon="ICONS.key"
      class="w-60!"
    />

    <UButton
      :loading="loading"
      type="submit"
      :label="t('login.action')"
      color="primary"
      variant="ghost"
      class="px-4"
      size="lg"
      :disabled="!password"
    />
  </form>
</template>
