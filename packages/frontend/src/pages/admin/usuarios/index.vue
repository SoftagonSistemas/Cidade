<script setup lang="ts">
// Dados
import type { User } from '@prisma/client'
import { roles } from '@/data/roles'
import BaseService from '@/services/BaseService'
import FileService from '@/services/FileService'

const users = ref<User[]>([])
const loading = ref(false)
const search = ref('')
const itemsPerPage = ref(6)
const currentPage = ref(1)
const fileService = new FileService()

const router = useRouter()

function getRoleLabel(roleValue: string): string {
  const role = roles.find(r => r.value === roleValue)
  return role ? role.label : 'Não informado'
}

async function fetchUsers() {
  loading.value = true
  const userService = new BaseService('user')
  try {
    const allUsers = await userService.getAll()
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].profilePhoto) {
        allUsers[i].profilePhoto = await fileService.urlFile(allUsers[i].profilePhoto)
      }
      else {
        allUsers[i].profilePhoto = '/avatar.webp'
      }
    }
    users.value = allUsers
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
        <h1>Usuários</h1>
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <v-btn
          color="primary"
          variant="elevated"
          prepend-icon="mdi-plus"
          @click="$router.push('/admin/usuarios/adicionar')"
        >
          Usuário
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
                :key="user.raw.id"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card
                  class="hover-card"
                  @click="router.push(`/admin/usuarios/editar/${user.raw.id}`)"
                >
                  <!-- Imagem do usuário ou padrão -->
                  <v-img
                    :src="user.raw.profilePhoto || '/avatar.webp'"
                    alt="Foto do Usuário"
                    height="150"
                  />

                  <!-- Nome do usuário -->
                  <v-card-title class="text-h6 text-center">
                    {{ user.raw.name || "Nome não disponível" }}
                  </v-card-title>

                  <!-- Cargo e email -->
                  <v-card-subtitle class="text-center">
                    <p>{{ user.raw.jobTitle || "Sem Cargo" }}</p>
                    <p> <strong>{{ user.raw.email || "Não informado" }}</strong></p>
                  </v-card-subtitle>

                  <!-- Informações adicionais -->
                  <v-card-text>
                    <p><strong>Telefone:</strong> {{ user.raw.phoneNumber || "Não informado" }}</p>
                    <p><strong>Função:</strong> {{ getRoleLabel(user.raw.role) }}</p>
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
  </v-container>
</template>

<style scoped>
.hover-card {
  cursor: pointer;
  transition: transform 0.2s;
}
.hover-card:hover {
  transform: scale(1.05);
}
</style>
