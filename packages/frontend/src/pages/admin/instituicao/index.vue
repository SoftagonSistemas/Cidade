<script setup lang="ts">
import UploadImage from '@/components/UploadImage.vue'
import BaseService from '@/services/BaseService'
import { OrganizationService } from '@/services/OrganizationService'
import { z } from 'zod'

const formData = ref({
  name: 'Prefeitura de Exemplo',
  address: 'Rua Exemplo, 123',
  city: 'Cidade Exemplo',
  state: 'Estado Exemplo',
  phone: '123456789',
  whatsapp: '987654321',
  email: 'exemplo@prefeitura.com',
  flag: 'bandeira-exemplo.png',
  emblem: 'brasao-exemplo.png',
  mayorId: null,
  viceMayorId: null,
})

const isFormValid = ref(false)

const schema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
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
const orgService = new OrganizationService()
const usuarios = ref([])

function validateForm() {
  const result = schema.safeParse(formData.value)
  isFormValid.value = result.success
  return result
}

function cadastrarUsuario(tipo: string) {
  console.warn(`Abrindo modal para cadastrar ${tipo}...`)
}

async function submitForm() {
  const validation = validateForm()
  if (validation.success) {
    try {
      await institutionService.create(formData.value)
      toast.success('Dados enviados com sucesso!')
    }
    catch (error: any) {
      toast.error(`Erro ao enviar dados: ${error.message}`)
    }
  }
  else {
    toast.error('Erros de validação no formulário.')
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
  }
  isFormValid.value = false
}

async function getMembersFromOrganization() {
  const members = await orgService.getMembers()
  usuarios.value = members.map((member: any) => ({
    id: member.user.id,
    name: member.user.name || 'Sem Nome',
  }))
}

onMounted(async () => {
  await getMembersFromOrganization()
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
          <v-text-field v-model="formData.phone" label="Telefone" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="formData.whatsapp" label="WhatsApp" />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="formData.email" label="E-mail" />
        </v-col>

        <!-- Bandeira e Brasão -->
        <v-col cols="6">
          <UploadImage v-model="formData.flag" />
        </v-col>
        <v-col cols="6">
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
            return-object
          >
            <template #append-item>
              <v-list-item
                value="new"
                class="d-flex align-center"
                @click="cadastrarUsuario('prefeito')"
              >
                <v-icon left>
                  mdi-plus
                </v-icon>
                Cadastrar Novo Prefeito
              </v-list-item>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="formData.viceMayorId"
            label="Vice-Prefeito"
            :items="usuarios"
            item-title="name"
            item-value="id"
            return-object
          >
            <template #append-item>
              <v-list-item
                value="new"
                class="d-flex align-center"
                @click="cadastrarUsuario('vice-prefeito')"
              >
                <v-icon left>
                  mdi-plus
                </v-icon>
                Cadastrar Novo Vice-Prefeito
              </v-list-item>
            </template>
          </v-select>
        </v-col>

        <v-col cols="12" class="d-flex justify-end">
          <!-- Botão Salvar -->
          <v-btn
            type="submit"
            :disabled="!isFormValid"
            color="primary"
            variant="elevated"
          >
            Salvar
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
