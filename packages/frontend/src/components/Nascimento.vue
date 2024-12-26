<script setup lang="ts">
import dateMask from '@/utils/dateMask'
import { z } from 'zod'

// Estado do modelo para a data de nascimento
const birthDate = ref<string>('')
const model = defineModel()
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

// Validação ao atingir exatamente 10 caracteres
watch(birthDate, (newValue) => {
  if (newValue.length === 10) { // Valida apenas quando o valor tem 10 caracteres
    try {
      birthDateSchema.parse(newValue)
      model.value = newValue
      const [day, month, year] = newValue.split('/')
      model.value = `${month}/${day}/${year}`
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Erro de validação:', error.errors[0].message)
        toast.error(error.errors[0].message) // Exibe o erro ao usuário
      }
    }
  }
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
  />
</template>
