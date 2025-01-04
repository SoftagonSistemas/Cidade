<script setup lang="ts">
import type { Document } from '@prisma/client'
import FileUpload from '@/components/Documents/FileUpload.vue'
import PDFViewer from '@/components/Documents/PDFViewer.vue'
import BaseService from '@/services/BaseService'
import FileService from '@/services/FileService'
import { onMounted, ref } from 'vue'

const documents = ref<Document[]>([])
const loading = ref(false)
const search = ref('')
const pdfViewerRef = ref(null)
const fileService = new FileService()
const documentService = new BaseService('document')
const dialog = ref(false)

async function fetchDocuments() {
  loading.value = true
  try {
    const data = await documentService.getAll() as Document[]
    documents.value = data
  }
  catch (error) {
    console.error('Erro ao buscar documentos:', error)
    toast.error('Erro ao carregar documentos')
  }
  finally {
    loading.value = false
  }
}

function openPDFViewer(name: string, url: string) {
  pdfViewerRef.value?.openPDFViewer(name, url)
}

function downloadDocument(path: string) {
  fileService.downloadFile(path)
}

async function deleteDocument(path: string, documentId: string) {
  try {
    await fileService.deleteFile(path)
    await documentService.softDelete(documentId)
    await fetchDocuments() // Recarrega a lista
    toast.success('Documento excluído com sucesso')
  }
  catch (error) {
    console.error('Erro ao excluir documento:', error)
    toast.error('Erro ao excluir documento')
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getFileIcon(mimeType: string) {
  if (mimeType === 'application/pdf')
    return 'mdi-file-pdf-box'
  return 'mdi-file-document-outline'
}

function closeDialog() {
  fetchDocuments()
  dialog.value = false
}

onMounted(() => {
  fetchDocuments()
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex align-center mb-4">
          <h1 class="text-h4 font-weight-bold">
            Meus Documentos
          </h1>
          <v-spacer />
          <v-btn
            color="primary"
            prepend-icon="mdi-plus"
            @click="dialog = true"
          >
            <span class="hidden-sm-and-down">Novo Documento</span>
            <span class="hidden-md-and-up">Novo</span>
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Dialog para upload -->
    <v-dialog
      v-model="dialog"
      width="auto"
      persistent
    >
      <v-card min-width="400">
        <v-card-title class="text-h5">
          Adicionar Documento
          <v-spacer />
          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            @click="closeDialog"
          />
        </v-card-title>
        <v-card-text>
          <FileUpload
            @upload-complete="() => {
              fetchDocuments()
              closeDialog()
            }"
          />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          label="Buscar documentos"
          density="comfortable"
          variant="outlined"
          hide-details
          class="mb-4"
        />

        <v-row>
          <v-col
            v-for="doc in documents"
            :key="doc.id"
            cols="12"
            sm="6"
            md="4"
            lg="4"
          >
            <v-card
              elevation="2"
              class="doc-card"
            >
              <v-card-item>
                <template #prepend>
                  <v-icon
                    size="32"
                    :color="doc.signed ? 'success' : 'primary'"
                    :icon="getFileIcon(doc.mimeType)"
                  />
                </template>
                <v-card-title class="text-truncate">
                  {{ doc.title }}
                </v-card-title>
                <v-card-subtitle>
                  {{ formatDate(doc.createdAt) }}
                </v-card-subtitle>
              </v-card-item>

              <v-card-text class="pt-2">
                <v-chip
                  size="small"
                  :color="doc.signed ? 'success' : 'warning'"
                  class="mr-2"
                >
                  {{ doc.signed ? 'Assinado' : 'Não assinado' }}
                </v-chip>
                <v-chip
                  size="small"
                  color="info"
                >
                  {{ doc.mimeType.split('/')[1].toUpperCase() }}
                </v-chip>
              </v-card-text>

              <v-divider />

              <v-card-actions>
                <v-tooltip text="Visualizar">
                  <template #activator="{ props }">
                    <v-btn
                      v-bind="props"
                      icon="mdi-eye"
                      variant="text"
                      size="small"
                      @click="openPDFViewer(doc.title, doc.filePath)"
                    />
                  </template>
                </v-tooltip>

                <v-tooltip text="Download">
                  <template #activator="{ props }">
                    <v-btn
                      v-bind="props"
                      icon="mdi-download"
                      variant="text"
                      size="small"
                      @click="downloadDocument(doc.filePath)"
                    />
                  </template>
                </v-tooltip>

                <v-spacer />

                <v-tooltip text="Excluir">
                  <template #activator="{ props }">
                    <v-btn
                      v-bind="props"
                      icon="mdi-delete"
                      variant="text"
                      color="error"
                      size="small"
                      @click="deleteDocument(doc.filePath, doc.id)"
                    />
                  </template>
                </v-tooltip>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-if="documents.length === 0" justify="center">
          <v-col cols="12" class="text-center">
            <v-icon size="64" color="grey" icon="mdi-file-document-outline" />
            <div class="text-body-1 text-grey mt-2">
              Nenhum documento encontrado
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <PDFViewer ref="pdfViewerRef" />
  </v-container>
</template>

<style scoped>
.doc-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.doc-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12) !important;
}

.v-card-title {
  font-size: 1.1rem;
  line-height: 1.4;
}
</style>
