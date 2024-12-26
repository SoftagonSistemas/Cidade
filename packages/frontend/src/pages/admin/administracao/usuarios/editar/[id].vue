<script setup lang="ts">
import { roles } from '@/data/roles'
import BaseService from '@/services/BaseService'
import { phoneMaskOptions } from '@/utils/phoneMask'
import { z } from 'zod'

const router = useRouter()
const route = useRoute()

// Zod Schema para Validação
const userSchema = z.object({
  name: z.string().min(3, 'Nome é obrigatório.').regex(/^[A-ZÀ-ÿ\s]+$/i, 'Nome não pode conter números.'),
  email: z.string().email('Email inválido.'),
  phoneNumber: z.string().optional(),
  jobTitle: z.string().optional(),
  profilePhoto: z.string().optional(),
  dateOfBirth: z.string().optional(),
})

// Usuário a ser editado
const user = ref({
  id: '',
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

function formatDate(dateString: string) {
  if (!dateString)
    return ''
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const birthDate = ref('')

async function fetchUser() {
  const userService = new BaseService('user')
  try {
    const userId = route.params.id
    const fetchedUser = await userService.getById(userId)
    user.value = fetchedUser
    user.value.dateOfBirth = formatDate(fetchedUser.dateOfBirth)
  }
  catch (error) {
    toast.error('Erro ao buscar usuário.')
    console.error('Erro ao buscar usuário:', error)
  }
}

async function submitUser() {
  const validation = userSchema.safeParse(user.value)
  if (!validation.success) {
    validation.error.errors.forEach((err) => {
      toast.error(err.message)
    })
    console.error('Erros de validação:', validation.error.errors)
    return
  }

  const userService = new BaseService('user')
  try {
    const updatedUser = await userService.update(user.value.id, user.value)
    if (updatedUser) {
      toast.success('Usuário atualizado com sucesso.')
      router.push('/admin/administracao/usuarios')
    }
  }
  catch (error) {
    toast.error('Erro ao atualizar usuário. Servidor falhou.')
    console.error('Erro ao atualizar usuário:', error)
  }
}

// Busca os dados do usuário ao montar o componente
onMounted(() => {
  fetchUser()
})
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>Editar Usuário</v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid">
          <v-text-field v-model="user.name" label="Nome completo" outlined required />
          <span>Foto do Usuário</span>
          <UploadImage v-model="user.profilePhoto" />
          <v-text-field v-model="user.email" label="E-mail" outlined required />
          <v-text-field
            v-model="user.phoneNumber"
            v-maskito="phoneMaskOptions"
            label="Telefone"
            outlined
          />
          <Nascimento v-model="user.dateOfBirth" />
          <v-autocomplete
            v-model="user.jobTitle"
            :items="items"
            label="Cargo/Função"
            clearable
            no-data-text="Digite para adicionar"
            hint="Siga o organograma"
            class="mb-4"
            @update:search="onSearchUpdate"
          />
          <v-select
            v-model="user.role"
            :items="roles"
            item-title="label"
            item-value="value"
            label="Permissão do sistema"
            outlined
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click="router.push('/admin/administracao/usuarios')">
          Cancelar
        </v-btn>
        <v-btn :disabled="!isFormValid" color="primary" @click="submitUser">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
