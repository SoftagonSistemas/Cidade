<script setup lang="ts">
import { ref } from 'vue'
import { VBtn, VCard, VCardText, VCheckbox, VCol, VContainer, VRow, VSelect, VTextField } from 'vuetify/components'

interface User {
  name: string
  email: string
  secretary: string
  permissions: number[]
}

const users = ref<User[]>([])
const secretaries = ref<{ id: number, name: string }[]>([])
const permissions = ref<{ id: number, name: string }[]>([])

const newUser = ref({
  name: '',
  email: '',
  secretary: '',
  permissions: [],
})

function addUser() {
  users.value.push({ ...newUser.value })
  newUser.value = { name: '', email: '', secretary: '', permissions: [] }
}

function fetchSecretaries() {
  // Fetch secretaries from API or define them here
  secretaries.value = [
    { id: 1, name: 'Secretaria de Educação' },
    { id: 2, name: 'Secretaria de Saúde' },
    // Add more secretaries as needed
  ]
}

function fetchPermissions() {
  // Fetch permissions from API or define them here
  permissions.value = [
    { id: 1, name: 'Visualizar Relatórios' },
    { id: 2, name: 'Editar Usuários' },
    // Add more permissions as needed
  ]
}

onMounted(() => {
  fetchSecretaries()
  fetchPermissions()
})
</script>

<template>
  <h1>Usuários e Permissões</h1>
  <UserForm />
</template>

<style scoped>
h1 {
    margin-bottom: 20px;
}
</style>
