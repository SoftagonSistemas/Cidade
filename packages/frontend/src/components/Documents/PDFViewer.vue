<script setup>
import { ref } from 'vue'

const isDialogOpen = ref(false)
const pdfName = ref('')
const pdfUrl = ref('')

function openPDFViewer(name, url) {
  pdfName.value = name
  pdfUrl.value = url
  isDialogOpen.value = true
}

defineExpose({ openPDFViewer })
</script>

<template>
  <v-dialog v-model="isDialogOpen" max-width="800px">
    <v-card>
      <v-toolbar dense>
        <v-toolbar-title>{{ pdfName }}</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="isDialogOpen = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <iframe :src="pdfUrl" width="100%" height="600px" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
/* Estilos adicionais */
</style>
