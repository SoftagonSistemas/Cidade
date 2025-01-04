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
const pdfViewerRef = ref<InstanceType<typeof PDFViewer> | null>(null)
const fileService = new FileService()
const documentService = new BaseService('document')
const dialog = ref(false)
const itemsPerPage = ref(6)
const currentPage = ref(1)

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
  fileService.viewFile(path)
}

async function deleteDocument(path: string, documentId: string) {
  try {
    await fileService.deleteFile(path)
    await documentService.softDelete(documentId)
    await fetchDocuments()
    toast.success('Documento excluído com sucesso')
  }
  catch (error) {
    console.error('Erro ao excluir documento:', error)
    toast.error('Erro ao excluir documento')
  }
}

function formatDate(date: string | Date) {
  const dateObject = date instanceof Date ? date : new Date(date)
  return dateObject.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getFileIcon(mimeType: string) {
  return mimeType === 'application/pdf' ? 'mdi-file-pdf-box' : 'mdi-file-document-outline'
}

async function closeDialog() {
  dialog.value = false
  await fetchDocuments()
}

onMounted(fetchDocuments)
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
          <v-btn color="primary" prepend-icon="mdi-plus" @click="dialog = true">
            <span class="hidden-sm-and-down">Novo Documento</span>
            <span class="hidden-md-and-up">Novo</span>
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      persistent
      transition="dialog-bottom-transition"
      :scrim="true"
      :width="$vuetify.display.smAndDown ? '95%' : '600'"
    >
      <v-card class="upload-dialog rounded-lg" elevation="8">
        <v-toolbar color="primary" class="px-4 rounded-t-lg" height="64">
          <v-toolbar-title class="text-white text-truncate d-flex align-center">
            <span class="text-h6 font-weight-medium">Adicionar Documento</span>
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon="mdi-close" variant="text" size="x-large" color="white" @click="closeDialog" />
        </v-toolbar>

        <v-card-text class="pa-4 pa-sm-6">
          <FileUpload @upload-complete="closeDialog" />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col cols="12">
        <v-data-iterator
          v-model:items-per-page="itemsPerPage"
          v-model:page="currentPage"
          :items="documents"
          :loading="loading"
          :search="search"
        >
          <template #header>
            <v-text-field
              v-model="search"
              prepend-icon="mdi-magnify"
              label="Buscar documentos"
              density="comfortable"
              variant="outlined"
              hide-details
              class="mb-4"
            />
          </template>
          <template #default="{ items }">
            <v-row v-if="items.length">
              <v-col
                v-for="doc in items"
                :key="doc.raw.id"
                cols="12"
                sm="6"
                md="4"
                lg="4"
              >
                <v-card elevation="2" class="doc-card">
                  <v-card-item>
                    <template #prepend>
                      <v-icon
                        size="32"
                        :color="doc.raw.signed ? 'success' : 'primary'"
                        :icon="getFileIcon(doc.raw.mimeType)"
                      />
                    </template>
                    <v-card-title class="text-truncate">
                      {{ doc.raw.title }}
                    </v-card-title>
                    <v-card-subtitle>{{ formatDate(doc.raw.createdAt) }}</v-card-subtitle>
                  </v-card-item>

                  <v-card-text class="pt-2">
                    <v-chip size="small" :color="doc.raw.signed ? 'success' : 'warning'" class="mr-2">
                      {{ doc.raw.signed ? 'Assinado' : 'Não assinado' }}
                    </v-chip>
                    <v-chip size="small" color="info">
                      {{ doc.raw.mimeType.split('/')[1].toUpperCase() }}
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
                          @click="openPDFViewer(doc.raw.title, doc.raw.filePath)"
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
                          @click="downloadDocument(doc.raw.filePath)"
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
                          @click="deleteDocument(doc.raw.filePath, doc.raw.id)"
                        />
                      </template>
                    </v-tooltip>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>

            <v-row v-else justify="center" style="min-height: 300px">
              teste
              <v-col cols="12" class="text-center">
                <v-icon size="64" color="grey-lighten-1" icon="mdi-file-document-outline" class="mb-4" />
                <h3 class="text-h6 text-grey-darken-1 mb-2">
                  {{ search ? 'Nenhum documento encontrado' : 'Você ainda não tem documentos' }}
                </h3>
                <p class="text-body-1 text-medium-emphasis mb-4">
                  {{ search ? 'Tente usar outros termos na busca' : 'Comece adicionando seu primeiro documento' }}
                </p>
                <v-btn
                  v-if="!search"
                  color="primary"
                  prepend-icon="mdi-plus"
                  @click="dialog = true"
                >
                  Adicionar Documento
                </v-btn>
              </v-col>
            </v-row>
          </template>
          <template #no-data>
            <v-row justify="center" align="center" style="min-height: 300px">
              <v-col cols="12" class="text-center">
                <v-icon size="64" color="grey-lighten-1" icon="mdi-file-document-outline" class="mb-4" />
                <h3 class="text-h6 text-grey-darken-1 mb-2">
                  {{ search ? 'Nenhum documento encontrado' : 'Você ainda não tem documentos' }}
                </h3>
                <p class="text-body-1 text-medium-emphasis mb-4">
                  {{ search ? 'Tente usar outros termos na busca' : 'Comece adicionando seu primeiro documento' }}
                </p>
                <v-btn
                  v-if="!search"
                  color="primary"
                  prepend-icon="mdi-plus"
                  @click="dialog = true"
                >
                  Adicionar Documento
                </v-btn>
              </v-col>
            </v-row>
          </template>
          <template #footer>
            <v-pagination
              v-model="currentPage"
              :length="Math.ceil(documents.length / itemsPerPage)"
              :total-visible="5"
              color="primary"
              class="mt-4"
            />
          </template>
        </v-data-iterator>
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

.upload-dialog {
  overflow: hidden;
  border: 1px solid rgba(var(--v-border-color), 0.12);
  max-width: 100%;
}

:deep(.v-dialog-transition-enter-active),
:deep(.v-dialog-transition-leave-active) {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.v-dialog-transition-enter-from),
:deep(.v-dialog-transition-leave-to) {
  transform: translateY(20px);
  opacity: 0;
}

:deep(.v-overlay__scrim) {
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.32) !important;
}
</style>
