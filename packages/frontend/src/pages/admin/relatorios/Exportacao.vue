<script setup lang="ts">
import { ref } from 'vue'
import { VBtn, VCol, VContainer, VRow, VSelect } from 'vuetify/components'

const reportType = ref('')
const reportOptions = [
  { label: 'PDF', value: 'pdf' },
  { label: 'Excel', value: 'excel' },
]

function generateReport() {
  if (reportType.value) {
    // Lógica para gerar o relatório
    console.log(`Gerando relatório em ${reportType.value}`)
  }
  else {
    console.log('Selecione um tipo de relatório')
  }
}
</script>

<template>
  <VContainer>
    <h1>Exportação de Relatórios</h1>
    <VRow>
      <VCol cols="12" md="6">
        <VSelect
          v-model="reportType"
          :items="reportOptions"
          label="Selecione o tipo de relatório"
        />
      </VCol>
      <VCol cols="12" md="6">
        <VBtn color="primary" @click="generateReport">
          Gerar Relatório
        </VBtn>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
h1 {
    margin-bottom: 20px;
}
</style>
