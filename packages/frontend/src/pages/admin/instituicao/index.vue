<script setup lang="ts">
import type { Institution, User } from '@prisma/client'
import UploadImage from '@/components/UploadImage.vue'
import BaseService from '@/services/BaseService'
import { useAuthStore } from '@/stores/AuthStore'
import { phoneMaskOptions } from '@/utils/phoneMask'
import { z } from 'zod'

const formData = ref({
  name: '',
  address: '',
  city: '',
  state: '',
  phone: '',
  whatsapp: '',
  email: '',
  flag: '',
  emblem: '',
  mayorId: null,
  viceMayorId: null,
  tenantId: useAuthStore().organization?.id || '',
})

const isFormValid = ref(false)
const formErrors = ref({})

const schema = z.object({
  name: z.string().min(10, 'Campo obrigatório'),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().email('E-mail inválido').optional(),
  flag: z.string().nullable(),
  emblem: z.string().nullable(),
  mayorId: z.string().nullable(),
  viceMayorId: z.string().nullable(),
})

const institutionService = new BaseService('institution')
const userService = new BaseService('user')

const existingInstitution = ref<Institution>()
const usuarios = ref<Partial<User>[]>([])

function validateForm() {
  const result = schema.safeParse(formData.value)
  console.warn('Validação do formulário:', result)
  isFormValid.value = result.success

  if (!result.success) {
    formErrors.value = result.error.flatten().fieldErrors
    console.warn('Erros nos campos:', formErrors.value)
  }
  else {
    formErrors.value = {}
  }

  return result
}

async function submitForm() {
  const validation = validateForm()
  if (validation.success) {
    try {
      if (existingInstitution.value) {
        // Atualizar os dados da instituição existente
        await institutionService.update(existingInstitution.value.id, formData.value)
        toast.success('Dados atualizados com sucesso!')
      }
      else {
        // Criar nova instituição
        const newInstitution = await institutionService.create(formData.value) as Institution
        existingInstitution.value = newInstitution
        toast.success('Dados enviados com sucesso!')
      }
    }
    catch (error: any) {
      toast.error(`Erro ao enviar dados: ${error.message}`)
    }
  }
  else {
    const errorMessages = Object.entries(formErrors.value)
      .map(([field, errors]) => `${field}: ${(errors as string[]).join(', ')}`)
      .join(' | ')
    toast.error(`Erros de validação no formulário: ${errorMessages}`)
  }
}

function resetForm() {
  formData.value = {
    name: '',
    address: '',
    city: '',
    state: '',
    phone: '',
    whatsapp: '',
    email: '',
    flag: '',
    emblem: '',
    mayorId: null,
    viceMayorId: null,
    tenantId: useAuthStore().organization?.id || '',
  }
  isFormValid.value = false
}

async function getMembersFromOrganization() {
  const members = await userService.filter({ jobTitle: ['Prefeito', 'Vice-Prefeito'] })
  usuarios.value = members.map((member: any) => ({
    id: member.id,
    name: member.name || 'Sem Nome',
  }))
}

async function getInstitutionData() {
  try {
    const institutions = await institutionService.getAll()
    if (institutions.length > 0) {
      const institution = institutions[0]
      existingInstitution.value = institution
      formData.value = {
        name: institution.name || '',
        address: institution.address || '',
        city: institution.city || '',
        state: institution.state || '',
        phone: institution.phone || '',
        whatsapp: institution.whatsapp || '',
        email: institution.email || '',
        flag: institution.flag || '',
        emblem: institution.emblem || '',
        mayorId: institution.mayorId || null,
        viceMayorId: institution.viceMayorId || null,
        tenantId: institution.tenantId || '',
      }
    }
  }
  catch (error) {
    console.error('Erro ao buscar dados da instituição:', error)
  }
}

onMounted(async () => {
  await getMembersFromOrganization()
  await getInstitutionData()
})
</script>

<template>
  <h1>Instituição</h1>
  <v-container>
    <v-form v-model="isFormValid" @submit.prevent="submitForm">
      <v-row>
        <!-- Nome da Prefeitura -->
        <v-col cols="12">
          <v-text-field v-model="formData.name" label="Nome da Prefeitura" required />
        </v-col>

        <!-- Endereço -->
        <v-col cols="12">
          <v-text-field v-model="formData.address" label="Endereço" />
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="formData.city" label="Cidade" />
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="formData.state" label="Estado" />
        </v-col>

        <!-- Contatos -->
        <v-col cols="12" sm="6">
          <v-text-field v-model="formData.phone" v-maskito="phoneMaskOptions" label="Telefone" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="formData.whatsapp" v-maskito="phoneMaskOptions" label="WhatsApp" />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="formData.email" label="E-mail" />
        </v-col>

        <!-- Bandeira e Brasão -->
        <v-col cols="6">
          <span>Bandeira</span>
          <UploadImage v-model="formData.flag" />
        </v-col>
        <v-col cols="6">
          <span>Emblema</span>
          <UploadImage v-model="formData.emblem" />
        </v-col>

        <!-- Prefeito e Vice -->
        <v-col cols="12" sm="6">
          <v-select
            v-model="formData.mayorId"
            label="Prefeito"
            :items="usuarios"
            item-title="name"
            item-value="id"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="formData.viceMayorId"
            label="Vice-Prefeito"
            :items="usuarios"
            item-title="name"
            item-value="id"
          />
        </v-col>

        <v-col cols="12" class="d-flex justify-end">
          <!-- Botão Salvar -->
          <v-btn
            type="submit"
            :disabled="!isFormValid"
            color="primary"
            variant="elevated"
          >
            {{ existingInstitution ? 'Atualizar' : 'Salvar' }}
          </v-btn>

          <!-- Botão Limpar -->
          <v-btn
            type="reset"
            color="secondary"
            variant="outlined"
            class="ml-2"
            @click="resetForm"
          >
            Limpar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
