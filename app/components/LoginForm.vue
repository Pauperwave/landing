<script setup lang="ts">
const emit = defineEmits<{ close: [boolean] }>()

const { fetch: refreshSession } = useUserSession()
const password = ref('')
const loading = ref(false)

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
        title: `Errore ${err.statusCode}`,
        description: `${err.data?.message || err.message}. Riprova.`,
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
      placeholder="Inserisci la password"
      icon="i-heroicons-key"
      class="w-60!"
    />

    <UButton
      :loading="loading"
      type="submit"
      label="Accedi"
      color="primary"
      variant="ghost"
      class="px-4"
      size="lg"
      :disabled="!password"
    />
  </form>
</template>
