<script setup>
import PDFViewer from '@/components/Documents/PDFViewer.vue'
import { ref } from 'vue'

const pdfViewerRef = ref(null)

function fetchPDFs() {
  // Lógica para buscar a lista atualizada de PDFs
}

function openPDFViewer(name, url) {
  pdfViewerRef.value.openPDFViewer(name, url)
}
</script>

<template>
  <v-container>
    <h1> Meus documentos</h1>
    <PDFUpload @uploaded="fetchPDFs" />
    <PDFList @view="openPDFViewer" />
    <PDFViewer ref="pdfViewerRef" />
  </v-container>
</template>

<style scoped>
/* Estilos adicionais */
</style>
