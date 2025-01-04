<script setup lang="ts">
import FileService from '@/services/FileService'
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

// Inicializa o worker do PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

const isDialogOpen = ref(false)
const pdfName = ref('')
const pdfUrl = ref('')
const currentPage = ref(1)
const numPages = ref(0)
const scale = ref(1.0)
const loading = ref(false)
const error = ref('')
const canvasRef = ref<HTMLCanvasElement | null>(null)

// Cache de páginas renderizadas
const pageCache = new Map()
const maxCachedPages = 5 // Número máximo de páginas em cache

let pdfDoc: any = null
const fileService = new FileService()

const dialogMounted = ref(false)

// Watch para quando o diálogo for aberto
watch(isDialogOpen, async (newValue) => {
  if (newValue) {
    dialogMounted.value = false
    await nextTick()
    dialogMounted.value = true
  }
  else {
    pageCache.clear()
    if (pdfDoc) {
      pdfDoc.cleanup()
      pdfDoc.destroy()
      pdfDoc = null
    }
  }
})

// Watch para quando o canvas estiver pronto e o diálogo montado
watch([() => canvasRef.value, dialogMounted], async ([canvas, mounted]) => {
  if (canvas && mounted && pdfDoc) {
    await renderPage()
  }
}, { immediate: true })

async function renderPage() {
  if (!pdfDoc || !canvasRef.value)
    return

  try {
    const canvas = canvasRef.value

    // Verifica se a página já está em cache
    const cachedPage = pageCache.get(currentPage.value)
    if (cachedPage) {
      const ctx = canvas.getContext('2d')
      if (!ctx)
        throw new Error('Failed to get canvas context')

      canvas.height = cachedPage.height
      canvas.width = cachedPage.width
      ctx.putImageData(cachedPage.imageData, 0, 0)
      return
    }

    const page = await pdfDoc.getPage(currentPage.value)
    const viewport = page.getViewport({ scale: scale.value })

    canvas.height = viewport.height
    canvas.width = viewport.width

    const ctx = canvas.getContext('2d')
    if (!ctx)
      throw new Error('Failed to get canvas context')

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const renderContext = {
      canvasContext: ctx,
      viewport,
    }

    await page.render(renderContext).promise

    // Armazena a página renderizada em cache
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    pageCache.set(currentPage.value, {
      imageData,
      height: canvas.height,
      width: canvas.width,
    })

    // Limita o tamanho do cache
    if (pageCache.size > maxCachedPages) {
      const firstKey = pageCache.keys().next().value
      pageCache.delete(firstKey)
    }

    // Limpa a página da memória
    page.cleanup()
  }
  catch (e) {
    console.error('Erro ao renderizar página:', e)
    error.value = 'Erro ao renderizar página'
  }
}

async function loadPDF(path: string) {
  loading.value = true
  error.value = ''
  pageCache.clear() // Limpa o cache ao carregar novo PDF

  try {
    const versionId = await fileService.getFileVersion(path)
    const response = await fileService.viewFile(versionId, path)
    const pdfBlob = await response.blob()

    // Carrega o PDF com configurações otimizadas e standardFontDataUrl
    pdfDoc = await pdfjsLib.getDocument({
      data: await pdfBlob.arrayBuffer(),
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
      cMapPacked: true,
      standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/standard_fonts/',
      disableFontFace: true, // Desabilita carregamento de fontes embutidas
      maxImageSize: 1024 * 1024, // Limita tamanho máximo de imagens
    }).promise

    numPages.value = pdfDoc.numPages
    currentPage.value = 1
  }
  catch (e) {
    error.value = 'Erro ao carregar o PDF'
    console.error('Erro ao carregar PDF:', e)
  }
  finally {
    loading.value = false
  }
}

async function openPDFViewer(name: string, path: string) {
  pdfName.value = name
  pdfUrl.value = path
  isDialogOpen.value = true
  loadPDF(path)
}

async function nextPage() {
  if (currentPage.value < numPages.value) {
    currentPage.value++
    await renderPage()
  }
}

async function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
    await renderPage()
  }
}

async function zoomIn() {
  scale.value = Math.min(scale.value + 0.2, 3.0)
  await renderPage()
}

async function zoomOut() {
  scale.value = Math.max(scale.value - 0.2, 0.5)
  await renderPage()
}

defineExpose({ openPDFViewer })
</script>

<template>
  <v-dialog
    v-model="isDialogOpen"
    max-width="1000px"
    class="pdf-viewer-dialog"
    @after-enter="dialogMounted = true"
  >
    <v-card>
      <v-toolbar density="comfortable">
        <v-toolbar-title class="text-truncate">
          {{ pdfName }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn-group>
          <v-btn icon :disabled="loading" @click="zoomOut">
            <v-icon>mdi-magnify-minus</v-icon>
          </v-btn>
          <v-btn icon :disabled="loading" @click="zoomIn">
            <v-icon>mdi-magnify-plus</v-icon>
          </v-btn>
        </v-btn-group>
        <v-btn-group class="mx-4">
          <v-btn icon :disabled="currentPage === 1 || loading" @click="prevPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn disabled>
            {{ currentPage }} / {{ numPages }}
          </v-btn>
          <v-btn icon :disabled="currentPage === numPages || loading" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-btn-group>
        <v-btn icon @click="isDialogOpen = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pdf-container">
        <div v-if="loading" class="d-flex justify-center align-center" style="height: 600px">
          <v-progress-circular indeterminate color="primary" />
        </div>

        <div v-else-if="error" class="d-flex justify-center align-center" style="height: 600px">
          <v-alert type="error" :text="error" />
        </div>

        <div v-else class="canvas-container">
          <canvas ref="canvasRef" style="display: block" />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.pdf-viewer-dialog {
  overflow: hidden;
}

.pdf-container {
  overflow: auto;
  max-height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
}

.canvas-container {
  display: flex;
  justify-content: center;
  min-height: 600px;
}

canvas {
  max-width: 100%;
  height: auto !important;
}
</style>
