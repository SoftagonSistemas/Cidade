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
  <VContainer>
    <h1>Gerenciamento de Usuários e Secretarias</h1>
    <VRow>
      <VCol cols="12" md="6">
        <VCard>
          <VCardText>
            <h2>Cadastro de Usuário</h2>
            <VTextField v-model="newUser.name" label="Nome" />
            <VTextField v-model="newUser.email" label="Email" />
            <VSelect v-model="newUser.secretary" :items="secretaries" item-text="name" item-value="id" label="Secretaria" />
            <h3>Permissões</h3>
            <VCheckbox v-for="permission in permissions" :key="permission.id" v-model="newUser.permissions" :label="permission.name" :value="permission.id" />
            <VBtn color="primary" @click="addUser">
              Adicionar Usuário
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="6">
        <VCard>
          <VCardText>
            <h2>Lista de Usuários</h2>
            <VList>
              <VListItem v-for="user in users" :key="user.email">
                <VListItemTitle>{{ user.name }}</VListItemTitle>
                <VListItemSubtitle>{{ user.email }} - {{ user.secretary }}</VListItemSubtitle>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
h1 {
    margin-bottom: 20px;
}
</style>
