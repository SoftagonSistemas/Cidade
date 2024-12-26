<script setup lang="ts">
import type { Department } from '@prisma/client'

import BaseService from '@/services/BaseService'

const departments = ref<Department[]>([])
const loading = ref(false)
const search = ref('')
const itemsPerPage = ref(6)
const currentPage = ref(1)

const isDialogOpen = ref(false)

// Callback para quando um departamento é criado
async function handleDepartmentCreated() {
  await fetchDepartments()
}

async function fetchDepartments() {
  loading.value = true
  const departmentService = new BaseService('department')
  try {
    const allDepartments = await departmentService.getAll()
    departments.value = allDepartments
  }
  catch (error) {
    toast.error('Erro ao buscar departamentos. Verifique o servidor.')
    console.error('Erro ao buscar departamentos:', error)
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDepartments()
})
</script>

<template>
  <v-container>
    <v-row>
      <!-- Título e Botão Alinhados -->
      <v-col cols="6">
        <h1>Departamentos e Secretarias</h1>
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <v-btn
          color="primary"
          variant="elevated"
          prepend-icon="mdi-plus"
          @click="$router.push('/admin/instituicao/secretarias/adicionar')"
        >
          Novo Departamento
        </v-btn>
      </v-col>
    </v-row>

    <!-- Data Iterator -->
    <v-row>
      <v-col cols="12">
        <v-data-iterator
          v-model:items-per-page="itemsPerPage"
          v-model:page="currentPage"
          :items="departments"
          :loading="loading"
          :search="search"
        >
          <!-- Barra de Busca -->
          <template #header>
            <v-text-field
              v-model="search"
              label="Buscar Departamento"
              prepend-icon="mdi-magnify"
              dense
              outlined
            />
          </template>

          <!-- Lista de Departamentos -->
          <template #default="{ items }">
            <v-row v-if="items.length">
              <v-col
                v-for="department in items"
                :key="department.id"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card>
                  <!-- Nome do Departamento -->
                  <v-card-title class="text-h6 text-center">
                    {{ department.name }}
                  </v-card-title>

                  <!-- Descrição e Tipo -->
                  <v-card-subtitle class="text-center">
                    <p>{{ department.description || "Sem descrição" }}</p>
                    <p><strong>Tipo:</strong> {{ department.isSecretariat ? "Secretaria" : "Departamento" }}</p>
                  </v-card-subtitle>

                  <!-- Instituição -->
                  <v-card-text>
                    <p><strong>Instituição:</strong> {{ department.institution?.name || "Não vinculada" }}</p>
                    <p><strong>Chefe:</strong> {{ department.head?.name || "Não definido" }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Nenhum Departamento -->
            <v-row v-else>
              <v-col cols="12" class="text-center">
                <v-icon size="48" color="grey">
                  mdi-office-building-off
                </v-icon>
                <p class="text-h5">
                  Ainda não há departamentos cadastrados.
                </p>
              </v-col>
            </v-row>
          </template>

          <!-- Paginação -->
          <template #footer>
            <v-pagination
              v-model="currentPage"
              :length="Math.ceil(departments.length / itemsPerPage)"
              total-visible="5"
              color="primary"
            />
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>
