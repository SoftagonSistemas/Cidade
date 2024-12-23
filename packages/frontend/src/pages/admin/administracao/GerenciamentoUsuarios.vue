<script setup lang="ts">
// Dados
import type { User } from '@prisma/client'
import UserDialog from '@/components/UserDialog.vue'

import BaseService from '@/services/BaseService'

const users = ref<User[]>([])
const loading = ref(false)
const search = ref('')
const itemsPerPage = ref(6)
const currentPage = ref(1)

const isDialogOpen = ref(false)

// Callback para quando um usuário é criado
async function handleUserCreated() {
  await fetchUsers()
}

async function fetchUsers() {
  loading.value = true
  const userService = new BaseService('user')
  try {
    const allUsers = await userService.getAll()
    users.value = allUsers
    console.log('Usuários:', users.value)
  }
  catch (error) {
    toast.error('Erro ao buscar usuários. Back falhou.')
    console.error('Erro ao buscar usuários:', error)
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <v-container>
    <v-row>
      <!-- Título e Botão Alinhados -->
      <v-col cols="6">
        <h1>Listagem de Usuários</h1>
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <v-btn
          color="primary"
          variant="elevated"
          prepend-icon="mdi-plus"
          @click="isDialogOpen = true"
        >
          Novo Usuário
        </v-btn>
      </v-col>
    </v-row>

    <!-- Data Iterator -->
    <v-row>
      <v-col cols="12">
        <v-data-iterator
          v-model:items-per-page="itemsPerPage"
          v-model:page="currentPage"
          :items="users"
          :loading="loading"
          :search="search"
        >
          <!-- Barra de Busca -->
          <template #header>
            <v-text-field
              v-model="search"
              label="Buscar Usuário"
              prepend-icon="mdi-magnify"
              dense
              outlined
            />
          </template>

          <!-- Lista de Usuários -->
          <template #default="{ items }">
            <v-row v-if="items.length">
              <v-col
                v-for="user in items"
                :key="user.id"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card>
                  <v-img
                    :src="user.profilePhoto || '/default-avatar.png'"
                    height="120"
                  />
                  <v-card-title class="text-h6">
                    {{ user.name }}
                  </v-card-title>
                  <v-card-subtitle>
                    {{ user.jobTitle || "Sem Cargo" }}
                  </v-card-subtitle>
                  <v-card-text>
                    <p>Email: {{ user.email }}</p>
                    <p>Telefone: {{ user.phoneNumber || "Não informado" }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Nenhum Usuário -->
            <v-row v-else>
              <v-col cols="12" class="text-center">
                <v-icon size="48" color="grey">
                  mdi-account-off
                </v-icon>
                <p class="text-h5">
                  Ainda não há usuários cadastrados.
                </p>
              </v-col>
            </v-row>
          </template>

          <!-- Paginação -->
          <template #footer>
            <v-pagination
              v-model="currentPage"
              :length="Math.ceil(users.length / itemsPerPage)"
              total-visible="5"
              color="primary"
            />
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>

    <!-- Dialog de Novo Usuário -->
    <UserDialog
      v-model="isDialogOpen"
      :on-user-created="handleUserCreated"
    />
  </v-container>
</template>
