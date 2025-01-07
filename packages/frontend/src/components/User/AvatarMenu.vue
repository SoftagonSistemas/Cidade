<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
const router = useRouter()
const user = ref({
  fullName: 'John Doe',
  email: 'hermes@ja.com',
  initials: 'HA',
})

const drawer = ref(props.modelValue)

const authStore = useAuthStore()

async function logout() {
  authStore.logout()

  toast.info('Você foi desconectado.')
  setTimeout(async () => {
    await router.push('/auth/')
  }, 1000)
}

watch(() => props.modelValue, (newValue) => {
  drawer.value = newValue
})

watch(drawer, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :absolute="true"
    temporary
    location="right"
    :mobile="true"
    class="user-drawer"
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
      :title="user.fullName"
    />

    <v-divider />

    <v-list density="compact" nav class="d-flex flex-column" style="height: 90%;">
      <v-list-item title="Meu perfil" value="profile" />
      <v-list-item title="Configurações" value="settings" />
      <v-list-item title="Ajuda" value="help" />
      <v-spacer />
      <v-list-item prepend-icon="mdi-logout" bg-color="primary" title="Sair" class="mt-auto" @click="logout" />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.user-drawer {
  z-index: 2000; /* Ajuste o valor conforme necessário */
}
</style>
