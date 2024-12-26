<script setup lang="ts">
import dateMask from '@/utils/dateMask'
import { z } from 'zod'

// Estado do modelo para a data de nascimento
const model = defineModel()
const birthDate = ref<string>(typeof model.value === 'string' ? model.value : '')

// Calcula a data mínima e máxima
const today = new Date()
const minDate = new Date(today.getFullYear() - 90, today.getMonth(), today.getDate()) // Máximo de 90 anos atrás
const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()) // Mínimo de 18 anos atrás

// Schema de validação Zod
const birthDateSchema = z
  .string()
  .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data deve estar no formato DD/MM/AAAA.')
  .refine((date) => {
    const [day, month, year] = date.split('/').map(Number)
    const parsedDate = new Date(year, month - 1, day)
    return (
      !Number.isNaN(parsedDate.getTime())
      && parsedDate >= minDate
      && parsedDate <= maxDate
    )
  }, {
    message: `Data de nascimento inválida. Deve estar entre ${formatDate(minDate)} e ${formatDate(maxDate)}.`,
  })

// Função para formatar uma data no formato brasileiro
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// Função de validação chamada no @change
function validateBirthDate(newValue: string) {
  if (newValue.length === 10) { // Valida apenas quando o valor tem 10 caracteres
    try {
      birthDateSchema.parse(newValue)
      model.value = newValue
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Erro de validação:', error.errors[0].message)
        toast.error(error.errors[0].message) // Exibe o erro ao usuário
      }
    }
  }
}

watch(model, (newValue) => {
  birthDate.value = newValue as string
})
</script>

<template>
  <!-- Campo de entrada de data -->
  <v-text-field
    v-model="birthDate"
    v-maskito="dateMask"
    label="Data de Nascimento"
    placeholder="DD/MM/AAAA"
    outlined
    prepend-icon="mdi-cake-variant"
    @change="validateBirthDate(birthDate)"
  />
</template>
