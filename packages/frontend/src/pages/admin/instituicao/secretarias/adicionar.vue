<script setup lang="ts">
import BaseService from '@/services/BaseService'
import { onMounted, ref } from 'vue'

// Dados do formulário
const form = ref({
  name: '',
  description: '',
  isSecretariat: false,
  parentDepartmentId: null,
  headId: null,
  address: {
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  },
  contacts: [
    { type: 'phone', value: '' },
    { type: 'email', value: '' },
    { type: 'instagram', value: '' },
  ],
})

// Dados auxiliares
const parentDepartments = ref([])
const users = ref([])

// Status de carregamento e salvamento
const isLoading = ref(false)
const isSaving = ref(false)

// Função para buscar dados auxiliares
async function fetchData() {
  isLoading.value = true
  try {
    const departmentService = new BaseService('department')
    const userService = new BaseService('user')
    parentDepartments.value = await departmentService.getAll()
    users.value = await userService.getAll()
  }
  catch (error) {
    toast.error('Erro ao buscar dados auxiliares.')
    console.error('Erro ao buscar dados auxiliares:', error)
  }
  finally {
    isLoading.value = false
  }
}

// Função para salvar o departamento/secretaria
async function saveDepartment() {
  isSaving.value = true
  const departmentService = new BaseService('department')
  try {
    await departmentService.create({
      ...form.value,
      institutionId: 'INSTITUTION_ID_FIXO', // Substituir pelo ID fixo ou dinâmico da instituição
    })
    toast.success('Departamento/Secretaria criado com sucesso!')
    resetForm()
  }
  catch (error) {
    toast.error('Erro ao salvar o departamento/secretaria.')
    console.error('Erro ao salvar departamento:', error)
  }
  finally {
    isSaving.value = false
  }
}

// Função para resetar o formulário
function resetForm() {
  form.value = {
    name: '',
    description: '',
    isSecretariat: false,
    parentDepartmentId: null,
    headId: null,
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    },
    contacts: [
      { type: 'phone', value: '' },
      { type: 'email', value: '' },
      { type: 'instagram', value: '' },
    ],
  }
}

// Busca os dados auxiliares ao montar o componente
onMounted(() => {
  fetchData()
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">
          Cadastro de Departamento ou Secretaria
        </h1>
      </v-col>
    </v-row>

    <v-form>
      <!-- Nome e Descrição -->
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="form.name"
            label="Nome"
            required
            outlined
            dense
          />
        </v-col>
        <v-col cols="6">
          <v-textarea
            v-model="form.description"
            label="Descrição"
            outlined
            dense
          />
        </v-col>
      </v-row>

      <!-- Tipo e Departamento Pai -->
      <v-row>
        <v-col cols="6">
          <v-switch
            v-model="form.isSecretariat"
            label="É uma Secretaria?"
            inset
            dense
          />
        </v-col>
        <v-col cols="6">
          <v-select
            v-model="form.parentDepartmentId"
            label="Departamento Pai"
            :items="parentDepartments"
            item-text="name"
            item-value="id"
            outlined
            dense
            clearable
          />
        </v-col>
      </v-row>

      <!-- Endereço -->
      <v-row>
        <v-col cols="12">
          <h3 class="text-h5">
            Endereço
          </h3>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="form.address.street"
            label="Rua"
            outlined
            dense
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="form.address.city"
            label="Cidade"
            outlined
            dense
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="form.address.state"
            label="Estado"
            outlined
            dense
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="form.address.country"
            label="País"
            outlined
            dense
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="form.address.postalCode"
            label="CEP"
            outlined
            dense
          />
        </v-col>
      </v-row>

      <!-- Contatos -->
      <v-row>
        <v-col cols="12">
          <h3 class="text-h5">
            Contatos
          </h3>
        </v-col>
        <v-col v-for="(contact, index) in form.contacts" :key="index" cols="4">
          <v-text-field
            v-model="contact.value"
            :label="`Contato (${contact.type})`"
            outlined
            dense
          />
        </v-col>
      </v-row>

      <!-- Chefe do Departamento -->
      <v-row>
        <v-col cols="12">
          <v-select
            v-model="form.headId"
            label="Chefe do Departamento"
            :items="users"
            item-text="name"
            item-value="id"
            outlined
            dense
            clearable
          />
        </v-col>
      </v-row>

      <!-- Botões de Ação -->
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn color="secondary" @click="resetForm">
            Cancelar
          </v-btn>
          <v-btn :loading="isSaving" color="primary" @click="saveDepartment">
            Salvar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
