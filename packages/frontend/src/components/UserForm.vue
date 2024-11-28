<script setup lang="ts">
import BaseService from '@/services/BaseService'
import { ref } from 'vue'
import { z } from 'zod'

// Define o schema para validação do formulário
const userSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  phoneNumber: z.string().optional(),
  jobTitle: z.string().optional(),
  role: z.enum(['user', 'admin']).default('user'),
  profilePhoto: z.string().optional(), // Adicionado campo para foto do perfil
})

// Dados do formulário
const formData = ref({
  name: '',
  email: '',
  phoneNumber: '',
  jobTitle: '',
  role: 'user',
  profilePhoto: null, // Adicionado valor inicial para a foto do perfil
})

// Validação e estado
const isSubmitting = ref(false)
const errors = ref<string[]>([])

const userService = new BaseService('users')

// Função para validar os dados antes de enviar
function validateForm() {
  const result = userSchema.safeParse(formData.value)
  if (!result.success) {
    errors.value = result.error.errors.map(err => err.message)
    return false
  }
  errors.value = []
  return true
}

// Função para enviar o formulário
async function submitForm() {
  if (!validateForm())
    return

  isSubmitting.value = true
  try {
    const result = await userService.create(formData.value)
    console.log('Usuário cadastrado com sucesso:', result)

    // Feedback ao usuário
    toast.success('Usuário cadastrado com sucesso!')

    // Resetar o formulário após sucesso
    formData.value = {
      name: '',
      email: '',
      phoneNumber: '',
      jobTitle: '',
      role: 'user',
      profilePhoto: null,
    }
  }
  catch (error) {
    console.error(error)
    toast.error('Erro ao cadastrar o usuário.')
  }
  finally {
    isSubmitting.value = false
  }
}

// Função para carregar a imagem do usuário
function handlePhotoUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      formData.value.profilePhoto = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <v-container>
    <!-- Avatar com upload de foto -->
    <div class="d-flex flex-column align-center mb-4">
      <v-avatar size="100" class="mb-2">
        <v-img :src="formData.profilePhoto || 'https://via.placeholder.com/100'" />
      </v-avatar>
      <v-btn color="primary" small outlined>
        <label for="photo-upload" style="cursor: pointer;">Alterar Foto</label>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          style="display: none;"
          @change="handlePhotoUpload"
        >
      </v-btn>
    </div>

    <v-form>
      <v-text-field
        v-model="formData.name"
        label="Nome"
        required
        :error-messages="errors.includes('O nome é obrigatório') ? ['O nome é obrigatório'] : []"
        class="mb-4"
      />

      <v-text-field
        v-model="formData.email"
        label="E-mail"
        type="email"
        required
        :error-messages="errors.includes('E-mail inválido') ? ['E-mail inválido'] : []"
        class="mb-4"
      />

      <v-text-field
        v-model="formData.phoneNumber"
        label="Telefone"
        class="mb-4"
      />

      <v-text-field
        v-model="formData.jobTitle"
        label="Cargo"
        class="mb-4"
      />

      <v-select
        v-model="formData.role"
        :items="['user', 'admin']"
        label="Papel"
        required
        class="mb-4"
      />
    </v-form>
    <v-btn
      :loading="isSubmitting"
      :disabled="isSubmitting"
      color="primary"
      block
      @click="submitForm"
    >
      Salvar
    </v-btn>
  </v-container>
</template>
