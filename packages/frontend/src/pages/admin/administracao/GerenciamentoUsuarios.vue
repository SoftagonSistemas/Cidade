<script setup lang="ts">
import { phoneMaskOptions } from '@/utils/phoneMask'
import { z } from 'zod'

// Zod Schema para Validação
const userSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório.'),
  email: z.string().email('Email inválido.'),
  phoneNumber: z.string().optional(),
  jobTitle: z.string().optional(),
})

// Dados
const users = ref([])
const loading = ref(false)
const search = ref('')
const itemsPerPage = ref(6)
const currentPage = ref(1)
const dialogOpen = ref(false)
const isFormValid = ref(false)

// Novo Usuário
const newUser = ref({
  name: '',
  email: '',
  phoneNumber: '',
  jobTitle: '',
})

function resetDialog() {
  newUser.value = {
    name: '',
    email: '',
    phoneNumber: '',
    jobTitle: '',
  }
  dialogOpen.value = false
}

function submitUser() {
  const validation = userSchema.safeParse(newUser.value)
  if (!validation.success) {
    console.error('Erros de validação:', validation.error.errors)
    return
  }
  users.value.push({ ...newUser.value, id: Date.now().toString() })
  resetDialog()
}

async function fetchUsers() {
  loading.value = true
  setTimeout(() => {
    users.value = [
      {
        id: '1',
        name: 'João da Silva',
        email: 'joao.silva@example.com',
        phoneNumber: '123456789',
        jobTitle: 'Prefeito',
        profilePhoto: '/default-avatar.png',
      },
      {
        id: '2',
        name: 'Maria Souza',
        email: 'maria.souza@example.com',
        phoneNumber: '987654321',
        jobTitle: 'Vice-Prefeita',
        profilePhoto: '/default-avatar.png',
      },
    ]
    loading.value = false
  }, 1000)
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
          @click="dialogOpen = true"
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
    <v-dialog v-model="dialogOpen" persistent max-width="500">
      <v-card>
        <v-card-title>Criar Novo Usuário</v-card-title>
        <v-card-text>
          <v-form v-model="isFormValid">
            <v-text-field
              v-model="newUser.name"
              label="Nome"
              outlined
              required
            />
            <v-text-field
              v-model="newUser.email"
              label="Email"
              outlined
              required
            />
            <v-text-field
              v-model="newUser.phoneNumber"
              v-maskito="phoneMaskOptions"
              label="Telefone"
              outlined
            />
            <v-text-field
              v-model="newUser.jobTitle"
              label="Cargo"
              outlined
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" @click="resetDialog">
            Cancelar
          </v-btn>
          <v-btn
            :disabled="!isFormValid"
            color="primary"
            @click="submitUser"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
