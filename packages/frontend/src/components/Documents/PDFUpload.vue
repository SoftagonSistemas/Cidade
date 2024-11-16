<script setup>
import { ref } from 'vue'

const file = ref(null)

function uploadPDF() {
  if (file.value) {
    // Lógica para fazer upload do arquivo
  }
}
</script>

<template>
  <v-container>
    <v-file-input
      v-model="file"
      label="Selecione um PDF"
      accept=".pdf"
      @change="uploadPDF"
    />
  </v-container>
</template>

  <style scoped>
  /* Estilos adicionais */
  </style>
