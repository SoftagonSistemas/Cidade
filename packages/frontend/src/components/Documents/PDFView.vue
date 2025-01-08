<script setup lang="ts">
import FileService from '@/services/FileService'
import { Locales, useLicense, VPdfViewer } from '@vue-pdf-viewer/viewer'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  isOpen: boolean
  pdfPath: string
}>()

const emit = defineEmits(['update:isOpen'])
const licenseKey = import.meta.env.VITE_VPV_LICENSE
const loading = ref(true)
const error = ref('')
const pdfUrl = ref('')
const fileService = new FileService()
useLicense({ licenseKey })
const customLang = ref('pt_PT')
async function loadPDF() {
  loading.value = true
  error.value = ''

  try {
    if (!props.pdfPath) {
      error.value = 'Caminho do PDF não fornecido'
      return
    }

    const response = await fileService.viewFile(props.pdfPath)
    const blob = await response.blob()
    pdfUrl.value = URL.createObjectURL(blob)
  }
  catch (err) {
    console.error('Erro ao carregar PDF:', err)
    error.value = 'Erro ao carregar o PDF'
  }
  finally {
    loading.value = false
  }
}

watch(() => props.isOpen, (newValue) => {
  if (newValue)
    loadPDF()
  else if (pdfUrl.value)
    URL.revokeObjectURL(pdfUrl.value)
})

function closeDialog() {
  emit('update:isOpen', false)
}
</script>

<template>
  <v-dialog
    :model-value="isOpen"
    width="100%"
    class="pdf-viewer-dialog"
    @update:model-value="emit('update:isOpen', $event)"
  >
    <div class="pdf-container">
      <div v-if="loading" class="d-flex justify-center align-center" style="height: 600px">
        <v-progress-circular indeterminate color="primary" />
      </div>

      <div v-else-if="error" class="d-flex justify-center align-center" style="height: 600px">
        <v-alert type="error" :text="error" />
      </div>

      <div v-else class="pdf-content">
        <VPdfViewer
          :src="pdfUrl"
          :style="{ width: '100%', height: '700px' }"
          :locale="customLang"
        >
          <template #iconThemeDark>
            <button @click="closeDialog()">
              Fechar
            </button>
          </template>
        </VPdfViewer>
      </div>
    </div>
  </v-dialog>
</template>

<style scoped>
.pdf-viewer-dialog {
  overflow: hidden;
}

.pdf-container {
  overflow: auto;
  max-height: calc(100vh - 64px);
  padding: 0;
}

.pdf-content {
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 64px);
}

:deep(.vpv-container) {
  width: 100% !important;
  height: 100% !important;
}

:deep(.vpv-variables) {
  --vpv-container-width-sm: 0px;
}

@media (max-width: 600px) {
  .pdf-container {
    max-height: calc(100vh - 56px);
  }

  .pdf-content {
    height: calc(100vh - 56px);
  }
}
</style>
