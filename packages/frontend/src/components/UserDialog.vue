<script setup lang="ts">
import { roles } from '@/data/roles'
import BaseService from '@/services/BaseService'
import { useAuthStore } from '@/stores/AuthStore'
import { phoneMaskOptions } from '@/utils/phoneMask'
import { z } from 'zod'
// Props
const props = defineProps<{
  modelValue: boolean
  onUserCreated: (user: any) => void
}>()

const emit = defineEmits(['update:modelValue'])
const dialogOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

// Zod Schema para Validação
const userSchema = z.object({
  name: z.string().min(3, 'Nome é obrigatório.').regex(/^[A-Z\s]+$/i, 'Nome não pode conter números.'),
  email: z.string().email('Email inválido.'),
  phoneNumber: z.string().optional(),
  jobTitle: z.string().optional(),
})

// Novo Usuário
const newUser = ref({
  name: 'Hermes',
  email: 'hermes@softagon.com.br',
  phoneNumber: '87 99200 5656',
  jobTitle: 'Servidor',
  role: 'member',
  apiUserId: useAuthStore().user.id,
})

const items = ref<string[]>(['Servidor público', 'Secretário Municipal', 'Vice-Prefeito', 'Prefeito'])
const selectedValue = ref<string | null>(null)

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
  newUser.value = { name: '', email: '', phoneNumber: '', jobTitle: '' }
  dialogOpen.value = false
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
    const createdUser = await userService.create(newUser.value)
    if (createdUser) {
      props.onUserCreated(createdUser) // Notifica o sucesso
      resetDialog()
    }
  }
  catch (error) {
    toast.error('Erro ao criar usuário. Back falhou.')
    console.error('Erro ao criar usuário:', error)
  }
}
</script>

<template>
  <v-dialog v-model="dialogOpen" persistent max-width="500">
    <v-card>
      <v-card-title>Criar Novo Usuário</v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid">
          <v-text-field v-model="newUser.name" label="Nome" outlined required />
          <v-text-field v-model="newUser.email" label="Email" outlined required />
          <v-text-field
            v-model="newUser.phoneNumber"
            v-maskito="phoneMaskOptions"
            label="Telefone"
            outlined
          />
          <v-autocomplete
            v-model="selectedValue"
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
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click="resetDialog">
          Cancelar
        </v-btn>
        <v-btn :disabled="!isFormValid" color="primary" @click="submitUser">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
