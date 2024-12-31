<script setup lang="ts">
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { computed, defineEmits, onMounted, ref } from 'vue'

const emit = defineEmits<{
  (e: 'view', name: string, url: string): void
}>()

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

// Tipos personalizados
interface PDF {
  name: string
  url: string
  thumbnail?: string
}

const search = ref<string>('')
const isGridView = ref<boolean>(true)
const pdfs = ref<PDF[]>([
  { name: 'Bíblia Católica', url: '/pdfs/Biblia-Catolica-Ave-Maria.pdf' },
  { name: 'Vire à Direita', url: '/pdfs/03.pdf' },
  { name: 'Livro sobre ChatGPT', url: '/pdfs/Livro-Sobre-ChatGPT.pdf' },
])

const filteredPDFs = computed(() =>
  pdfs.value.filter(pdf =>
    pdf.name.toLowerCase().includes(search.value.toLowerCase()),
  ),
)

// Gera os thumbnails dinamicamente ao montar o componente
onMounted(() => {
  generateThumbnails()
})

async function generateThumbnails(): Promise<void> {
  for (const pdf of pdfs.value) {
    try {
      pdf.thumbnail = await generateThumbnail(pdf.url)
    }
    catch (error) {
      console.error(`Erro ao gerar thumbnail para ${pdf.name}:`, error)
      pdf.thumbnail = '/thumbnails/default-thumbnail.png' // Imagem padrão
    }
  }
}

async function generateThumbnail(pdfUrl: string): Promise<string> {
  const pdf = await pdfjsLib.getDocument(pdfUrl).promise
  const page = await pdf.getPage(1)

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d') as CanvasRenderingContext2D

  const viewport = page.getViewport({ scale: 0.5 }) // Escala menor para thumbnail
  canvas.width = viewport.width
  canvas.height = viewport.height

  const renderContext = {
    canvasContext: context,
    viewport,
  }
  await page.render(renderContext).promise

  return canvas.toDataURL('image/png') // Retorna o thumbnail como Data URL
}

function toggleView(): void {
  isGridView.value = !isGridView.value
}

function viewPDF(name: string, url: string): void {
  emit('view', name, url)
}

function downloadPDF(url: string): void {
  const link = document.createElement('a')
  link.href = url
  link.download = ''
  link.click()
}

function deletePDF(name: string): void {
  pdfs.value = pdfs.value.filter(pdf => pdf.name !== name)
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <v-text-field
          v-model="search"
          label="Pesquisar PDFs"
          append-icon="mdi-magnify"
        />
        <v-btn @click="toggleView">
          <v-icon>{{ isGridView ? 'mdi-view-list' : 'mdi-view-grid' }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="pdf in filteredPDFs"
        :key="pdf.name"
        cols="12"
        md="4"
        lg="3"
      >
        <v-card class="pdf-card">
          <v-img
            :src="pdf.thumbnail || '/thumbnails/default-thumbnail.png'"
            aspect-ratio="1.7"
            @click="viewPDF(pdf.name, pdf.url)"
          />
          <v-card-title>{{ pdf.name }}</v-card-title>
          <v-card-actions>
            <v-btn icon @click="downloadPDF(pdf.url)">
              <v-icon>mdi-download</v-icon>
            </v-btn>
            <v-btn icon @click="deletePDF(pdf.name)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.pdf-card {
  transition: transform 0.3s ease;
}
.pdf-card:hover {
  transform: scale(1.03);
}
</style>
