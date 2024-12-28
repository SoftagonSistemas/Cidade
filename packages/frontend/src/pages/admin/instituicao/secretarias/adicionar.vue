<script setup lang="ts">
import type { Department, User } from '@prisma/client'
import BaseService from '@/services/BaseService'
import { z } from 'zod'

// Validação do formulário com Zod
const departmentSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório'),
  description: z.string().optional(),
  isSecretariat: z.boolean(),
  parentDepartmentId: z.number().nullable(),
  headId: z.string().nullable(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
  }),
  contacts: z
    .array(
      z.object({
        type: z.string(),
        value: z.string().nonempty('O contato é obrigatório'),
      }),
    )
    .optional(),
  institutionId: z.string().uuid('Instituição inválida'),
})

// Dados do formulário
const form = ref<Department>({
  name: '',
  description: '',
  isSecretariat: false,
  parentDepartmentId: null,
  headId: null,
  institutionId: '', // Adicionado para refletir o modelo
  createdBy: '',
  updatedBy: '',
  tenantId: '',
  deletedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  contacts: [
    { type: 'phone', value: '' },
    { type: 'email', value: '' },
    { type: 'instagram', value: '' },
  ],
})

// Dados auxiliares
const parentDepartments = ref([])
const users = ref([])

// Status de carregamento
const isLoading = ref(false)
const isSaving = ref(false)

// Função para validar o formulário
function validateForm() {
  const result = departmentSchema.safeParse(form.value)
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    toast.error('Erro na validação do formulário.')
    console.error('Erros de validação:', errors)
    return false
  }
  return true
}
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
  if (!validateForm())
    return

  isSaving.value = true
  const departmentService = new BaseService('department')
  try {
    await departmentService.create({
      ...form.value,
      institutionId: 'INSTITUTION_ID_FIXO', // Substituir pelo ID dinâmico da instituição
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
    institutionId: '', // Adicionado para refletir o modelo
    createdBy: '',
    updatedBy: '',
    tenantId: '',
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    contacts: [
      { type: 'phone', value: '' },
      { type: 'email', value: '' },
      { type: 'instagram', value: '' },
    ],
  }
}

const addressId = ref<string>('')
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
      <!-- Nome -->
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="form.name"
            label="Nome"
            required
            outlined
            dense
          />
        </v-col>
      </v-row>

      <!-- Descrição -->
      <v-row>
        <v-col cols="12">
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
        <v-col cols="12">
          <v-switch
            v-model="form.isSecretariat"
            label="É uma Secretaria?"
            inset
            dense
          />
        </v-col>
        <v-col cols="12">
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
        <AddressDatabase v-model:address-id="addressId" />
        aqui  {{ addressId }}
      </v-row>

      <!-- Contatos -->
      <v-row>
        <v-col cols="12">
          <v-btn color="primary" @click="form.contacts.push({ type: '', value: '' })">
            Adicionar Contato
          </v-btn>
        </v-col>
        <v-col v-for="(contact, index) in form.contacts" :key="index" cols="12">
          <v-select
            v-model="contact.type"
            :items="['phone', 'email', 'instagram']"
            label="Tipo de Contato"
            outlined
            dense
          />
          <v-text-field
            v-model="contact.value"
            label="Valor"
            outlined
            dense
          />
          <v-btn icon color="red" @click="form.contacts.splice(index, 1)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
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

      <!-- Instituição -->
      <v-row>
        <v-col cols="12">
          <v-select
            v-model="form.institutionId"
            label="Instituição"
            :items="institutions"
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
