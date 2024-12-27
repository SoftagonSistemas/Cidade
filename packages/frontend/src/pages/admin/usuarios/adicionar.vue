<script setup lang="ts">
import { roles } from '@/data/roles'
import { AuthService } from '@/services/AuthService'
import BaseService from '@/services/BaseService'
import generateSecurePassword from '@/utils/generateSecurePassword'
import { phoneMaskOptions } from '@/utils/phoneMask'
import { z } from 'zod'

const router = useRouter()
// Zod Schema para Validação
const userSchema = z.object({
  name: z.string().min(3, 'Nome é obrigatório.').regex(/^[A-ZÀ-ÿ\s]+$/i, 'Nome não pode conter números.'),
  email: z.string().email('Email inválido.'),
  phoneNumber: z.string().optional(),
  jobTitle: z.string().optional(),
  profilePhoto: z.string().optional(),
  dateOfBirth: z.string().optional(),
  addressId: z.string().optional(),
})
definePage({
  meta: {
    breadcrumb: [
      { title: 'Usuários', to: '/admin/usuarios/' },
    ],
  },
})
// Novo Usuário
const newUser = ref({
  name: '',
  email: '',
  phoneNumber: '',
  jobTitle: '',
  role: 'member',
  apiUserId: '',
  profilePhoto: '',
  dateOfBirth: '',
})

const items = ref<string[]>(['Servidor público', 'Secretário Municipal', 'Vice-Prefeito', 'Prefeito'])

function onSearchUpdate(query: string) {
  if (
    query
    && !items.value.includes(query)
  ) {
    items.value = [...items.value, query] // Adiciona o novo item dinamicamente
  }
}

const isFormValid = ref(false)

function resetDialog() {
  newUser.value = {
    name: '',
    email: '',
    phoneNumber: '',
    jobTitle: '',
    apiUserId: '',
    role: 'member',
    profilePhoto: '',
    dateOfBirth: '',
  }
}

async function submitUser() {
  const validation = userSchema.safeParse(newUser.value)
  if (!validation.success) {
    validation.error.errors.forEach((err) => {
      toast.error(err.message)
    })
    console.error('Erros de validação:', validation.error.errors)
    return
  }

  const userService = new BaseService('user')
  try {
    const authService = new AuthService()
    const authUserCreated = await authService.register(newUser.value.email, generateSecurePassword(), newUser.value.name)
    if (!authUserCreated) {
      toast.error('Erro ao criar usuário no Auth')
      throw new Error('Erro ao criar usuário no Auth')
    }

    newUser.value.apiUserId = authUserCreated.id
    const createdUser = await userService.create(newUser.value)
    if (createdUser) {
      toast.success('Usuário criado com sucesso.')
      router.push('/admin/usuarios')
      resetDialog()
    }
  }
  catch (error) {
    toast.error('Erro ao criar usuário. Servidor falhou.')
    console.error('Erro ao criar usuário:', error)
  }
}
</script>

<template>
  <v-container>
    <h1>Criar Novo Usuário</h1>
    <v-form v-model="isFormValid">
      <v-text-field v-model="newUser.name" label="Nome completo" outlined required />
      <span>Foto do Usuário</span>
      <UploadImage v-model="newUser.profilePhoto" />
      <v-text-field v-model="newUser.email" label="E-mail" outlined required />
      <v-text-field
        v-model="newUser.phoneNumber"
        v-maskito="phoneMaskOptions"
        label="Telefone"
        outlined
      />
      <Nascimento v-model="newUser.dateOfBirth" />
      <v-autocomplete
        v-model="newUser.jobTitle"
        :items="items"
        label="Cargo/Função"
        clearable
        no-data-text="Digite para adicionar"
        hint="Siga o organograma"
        class="mb-4"
        @update:search="onSearchUpdate"
      />
      <v-select
        v-model="newUser.role"
        :items="roles"
        item-title="label"
        item-value="value"
        label="Permissão do sistema"
        outlined
      />
    </v-form>
    <v-btn color="secondary" @click="resetDialog">
      Cancelar
    </v-btn>
    <v-btn :disabled="!isFormValid" color="primary" @click="submitUser">
      Salvar
    </v-btn>
  </v-container>
</template>
