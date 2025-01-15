<script setup lang="ts">
import type { Department } from '@prisma/client'
import BaseService from '@/services/BaseService'
import { useAuthStore } from '@/stores/AuthStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  title: '',
  status: 'ACTIVE',
  departmentId: '',
  tag: [],
  document: '',
  cost: '',
  schedule: '',
  deadline: '',
  inPerson: false,
  online: false,
  serviceCategory: '',
  city: 0,
  location: '',
  icon: '',
})

const departments = ref<Department[]>([])
const serviceCardsService = new BaseService('service-cards')
const loading = ref(false)

// Load departments when component mounts
onMounted(async () => {
  try {
    const response = await serviceCardsService.getAll()
    departments.value = response.data
  }
  catch (error) {
    console.error('Error loading departments:', error)
  }
})

async function saveService() {
  try {
    loading.value = true
    const response = await serviceCardsService.create({
      ...form.value,
      createdBy: authStore.user?.id,
    })
    router.push('/admin/servicos')
  }
  catch (error) {
    console.error('Error saving service:', error)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container>
    <v-form @submit.prevent="saveService">
      <h1>Carta de Serviços</h1>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="form.title"
            label="Título do Serviço"
            required
            outlined
            dense
          />
        </v-col>

        <v-col cols="12">
          <v-select
            v-model="form.departmentId"
            :items="departments"
            item-title="name"
            item-value="id"
            label="Departamento"
            required
            outlined
            dense
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="form.cost"
            label="Custo"
            outlined
            dense
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="form.schedule"
            label="Horário de Atendimento"
            outlined
            dense
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="form.deadline"
            label="Prazo"
            outlined
            dense
          />
        </v-col>

        <v-col cols="6">
          <v-switch
            v-model="form.inPerson"
            label="Atendimento Presencial"
          />
        </v-col>

        <v-col cols="6">
          <v-switch
            v-model="form.online"
            label="Atendimento Online"
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="form.serviceCategory"
            label="Categoria do Serviço"
            outlined
            dense
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="form.location"
            label="Localização"
            outlined
            dense
          />
        </v-col>

        <v-col cols="12" class="d-flex justify-end">
          <v-btn
            color="secondary"
            class="mr-4"
            @click="router.back()"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            type="submit"
            :loading="loading"
          >
            Salvar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
