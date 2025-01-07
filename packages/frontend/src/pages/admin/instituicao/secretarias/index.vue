<script setup lang="ts">
import type { DepartmentWithRelations } from '@/services/DepartmentService'
import DepartmentService from '@/services/DepartmentService'

const departments = ref<DepartmentWithRelations[]>([])
const loading = ref(false)
const search = ref('')
const showOnlySecretariats = ref(false)
const itemsPerPage = ref(6)
const currentPage = ref(1)

const filteredDepartments = computed(() => {
  return departments.value.filter((dept) => {
    if (showOnlySecretariats.value) {
      return dept.isSecretariat
    }
    return true
  })
})

const switchLabel = computed(() =>
  showOnlySecretariats.value ? 'Secretarias' : 'Mostrar Todos',
)

async function fetchDepartments() {
  loading.value = true
  const departmentService = new DepartmentService()
  try {
    const allDepartments = await departmentService.getDepartmentsWithRelations()
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
      <v-col cols="8">
        <div class="text-h6 text-sm-h4 text-md-h5">
          Departamentos e Secretarias
        </div>
      </v-col>
      <v-col cols="4" class="d-flex justify-end">
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          @click="$router.push('/admin/instituicao/secretarias/adicionar')"
        >
          Novo
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-data-iterator
          v-model:items-per-page="itemsPerPage"
          v-model:page="currentPage"
          :items="filteredDepartments"
          :loading="loading"
          :search="search"
        >
          <template #header>
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="search"
                  label="Buscar Local"
                  prepend-icon="mdi-magnify"
                  density="compact"
                />
              </v-col>
              <v-col cols="4" class="d-flex align-center">
                <v-switch
                  v-model="showOnlySecretariats"
                  color="primary"
                  :label="switchLabel"
                  hide-details
                />
              </v-col>
            </v-row>
          </template>

          <template #default="{ items }">
            <v-row v-if="items.length">
              <v-col
                v-for="department in items"
                :key="department.raw.id"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card
                  :elevation="department.raw.isSecretariat ? 4 : 1"
                  :color="department.raw.isSecretariat ? 'primary' : undefined"
                  class="cursor-pointer v-card--hover" :class="{
                    'text-white': department.raw.isSecretariat,
                  }"
                  @click="$router.push(`/admin/instituicao/secretarias/ver/${department.raw.id}`)"
                >
                  <v-card-title class="text-center">
                    {{ department.raw.name }}
                  </v-card-title>

                  <v-card-text>
                    <div>
                      {{ department.raw.description || 'Sem descrição' }}
                    </div>

                    <div>
                      <strong>Responsável:</strong> {{ department.raw.head?.name || 'Sem responsável' }}
                    </div>

                    <div v-if="department.raw.parentDepartment">
                      <strong>Vinculado à:</strong> {{ department.raw.parentDepartment?.name || 'Nenhum' }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row v-else>
              <v-col cols="12" class="text-center">
                <p class="text-h5">
                  Ainda não há departamentos cadastrados.
                </p>
              </v-col>
            </v-row>
          </template>

          <template #footer>
            <v-pagination
              v-model="currentPage"
              :length="Math.ceil(departments.length / itemsPerPage)"
              :total-visible="5"
              color="primary"
            />
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.v-card--hover {
  transition: opacity 0.2s ease-in-out;
}

.v-card--hover:hover {
  opacity: 0.9;
}
</style>
