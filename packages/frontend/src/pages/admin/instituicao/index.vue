<script setup lang="ts">
import UploadImage from '@/components/UploadImage.vue'
import { z } from 'zod'

const formData = ref({
  nome: 'Prefeitura de Teste',
  bandeira: 'bandeira-teste.png',
  brasao: 'brasao-teste.png',
  telefone: '123456789',
  whatsapp: '987654321',
  email: 'teste@prefeitura.com',
  endereco: 'Rua de Teste, 123',
  cidade: 'Cidade Teste',
  estado: 'Estado Teste',
  prefeito: { id: 1, name: 'João Prefeito' },
  vicePrefeito: { id: 2, name: 'Maria Vice' },
})

const usuarios = ref([
  { id: 1, name: 'João Prefeito' },
  { id: 2, name: 'Maria Vice' },
]) // Exemplo de dados pré-existentes

const isFormValid = ref(false)

const schema = z.object({
  nome: z.string().min(1, 'Campo obrigatório'),
  bandeira: z.any().refine(val => val !== null, 'Campo obrigatório'),
  brasao: z.any().refine(val => val !== null, 'Campo obrigatório'),
  telefone: z.string().optional(),
  whatsapp: z.string().min(1, 'Campo obrigatório'),
  email: z.string().email('E-mail inválido').min(1, 'Campo obrigatório'),
  endereco: z.string().min(1, 'Campo obrigatório'),
  cidade: z.string().min(1, 'Campo obrigatório'),
  estado: z.string().min(1, 'Campo obrigatório'),
  prefeito: z.object({ id: z.number(), name: z.string() }).refine(val => val !== null, 'Campo obrigatório'),
  vicePrefeito: z.object({ id: z.number(), name: z.string() }).refine(val => val !== null, 'Campo obrigatório'),
})

function validateForm() {
  const result = schema.safeParse(formData.value)
  isFormValid.value = result.success
  return result
}

function cadastrarUsuario(tipo) {
  console.log(`Abrindo modal para cadastrar ${tipo}...`)
  // Implementar lógica para abrir modal de cadastro de usuário
}

function submitForm() {
  const validation = validateForm()
  if (validation.success) {
    console.log('Dados enviados:', formData.value)
  }
  else {
    console.log('Erros de validação:', validation.error.errors)
  }
}

function resetForm() {
  formData.value = {
    nome: '',
    bandeira: null,
    brasao: null,
    telefone: '',
    whatsapp: '',
    email: '',
    endereco: '',
    cidade: '',
    estado: '',
    prefeito: null,
    vicePrefeito: null,
  }
  isFormValid.value = false
}
</script>

<template>
  <h1>Instituição</h1>
  <v-container>
    <v-form v-model="isFormValid" @submit.prevent="submitForm">
      <v-row>
        <!-- Nome da Prefeitura -->
        <v-col cols="12">
          <v-text-field
            v-model="formData.nome"
            label="Nome da Prefeitura"
            :rules="[() => validateForm().success || 'Campo obrigatório']"
            required
          />
        </v-col>

        <!-- Bandeira e Brasão -->
        <v-col cols="6">
          <UploadImage v-model="formData.bandeira" />
        </v-col>
        <v-col cols="6">
          <UploadImage v-model="formData.brasao" />
        </v-col>

        <!-- Contatos -->
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.telefone"
            label="Telefone"
            type="tel"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.whatsapp"
            label="WhatsApp"
            type="tel"
            :rules="[() => validateForm().success || 'Campo obrigatório']"
            required
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="formData.email"
            label="E-mail"
            type="email"
            :rules="[() => validateForm().success || 'E-mail inválido']"
            required
          />
        </v-col>

        <!-- Endereço -->
        <v-col cols="12">
          <v-text-field
            v-model="formData.endereco"
            label="Endereço"
            :rules="[() => validateForm().success || 'Campo obrigatório']"
            required
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="formData.cidade"
            label="Cidade"
            :rules="[() => validateForm().success || 'Campo obrigatório']"
            required
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="formData.estado"
            label="Estado"
            :rules="[() => validateForm().success || 'Campo obrigatório']"
            required
          />
        </v-col>

        <!-- Prefeito e Vice -->
        <v-col cols="12" sm="6">
          <v-select
            v-model="formData.prefeito"
            label="Prefeito"
            :items="usuarios"
            item-text="name"
            item-value="id"
            :rules="[() => validateForm().success || 'Campo obrigatório']"
            required
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
            v-model="formData.vicePrefeito"
            label="Vice-Prefeito"
            :items="usuarios"
            item-text="name"
            item-value="id"
            :rules="[() => validateForm().success || 'Campo obrigatório']"
            required
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

        <!-- Botões -->
        <v-col cols="12" class="d-flex justify-end">
          <v-btn type="submit" :disabled="!isFormValid" color="primary">
            Salvar
          </v-btn>
          <v-btn type="reset" class="ml-2" @click="resetForm">
            Limpar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
