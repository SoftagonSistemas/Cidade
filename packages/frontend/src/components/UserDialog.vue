<script setup lang="ts">
import BaseService from '@/services/BaseService'
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
  name: '',
  email: '',
  phoneNumber: '',
  jobTitle: '',
})

const isFormValid = ref(false)

function resetDialog() {
  newUser.value = { name: '', email: '', phoneNumber: '', jobTitle: '' }
  dialogOpen.value = false
}

async function submitUser() {
  const validation = userSchema.safeParse(newUser.value)
  if (!validation.success) {
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
          <v-text-field v-model="newUser.jobTitle" label="Cargo" outlined />
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
