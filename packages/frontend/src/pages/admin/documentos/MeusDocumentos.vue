<script setup lang="ts">
import FileUpload from '@/components/Documents/FileUpload.vue'
import PDFViewer from '@/components/Documents/PDFViewer.vue'
import BaseService from '@/services/BaseService'
import FileService from '@/services/FileService'
import { onMounted, ref } from 'vue'

const documents = ref([])
const loading = ref(false)
const search = ref('')
const itemsPerPage = ref(6)
const currentPage = ref(1)
const pdfViewerRef = ref(null)
const fileService = new FileService()
const documentService = new BaseService('document')
async function fetchDocuments() {
  loading.value = true
  try {
    const response = await documentService.getAll()
    documents.value = response.files || []
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

async function deleteDocument(path: string, versionId: string) {
  try {
    await fileService.deleteFile(versionId, path)
    await fetchDocuments() // Recarrega a lista
    toast.success('Documento excluído com sucesso')
  }
  catch (error) {
    console.error('Erro ao excluir documento:', error)
    toast.error('Erro ao excluir documento')
  }
}

onMounted(() => {
  fetchDocuments()
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Meus Documentos</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <FileUpload @upload-complete="fetchDocuments" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-data-iterator
          v-model:items-per-page="itemsPerPage"
          v-model:page="currentPage"
          :items="documents"
          :loading="loading"
          :search="search"
        >
          <!-- Barra de Busca -->
          <template #header>
            <v-text-field
              v-model="search"
              label="Buscar Documento"
              prepend-icon="mdi-magnify"
              density="compact"
              variant="outlined"
            />
          </template>

          <!-- Lista de Documentos -->
          <template #default="{ items }">
            <v-row>
              <v-col
                v-for="doc in items"
                :key="doc.file"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card class="hover-card">
                  <v-card-title class="text-truncate">
                    {{ doc.file.split('/').pop() }}
                  </v-card-title>

                  <v-card-text>
                    <p><strong>Data:</strong> {{ new Date(doc.versions[0].lastModified).toLocaleDateString() }}</p>
                    <p><strong>Tamanho:</strong> {{ doc.versions[0].size }}</p>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn
                      icon
                      variant="text"
                      @click="openPDFViewer(doc.file.split('/').pop(), doc.file)"
                    >
                      <v-icon>mdi-eye</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      variant="text"
                      @click="downloadDocument(doc.file)"
                    >
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      variant="text"
                      color="error"
                      @click="deleteDocument(doc.file, doc.versions[0].versionId)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </template>

          <!-- Paginação -->
          <template #footer>
            <v-pagination
              v-model="currentPage"
              :length="Math.ceil(documents.length / itemsPerPage)"
              total-visible="5"
              color="primary"
            />
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>

    <PDFViewer ref="pdfViewerRef" />
  </v-container>
</template>

<style scoped>
.hover-card {
  cursor: pointer;
  transition: transform 0.2s;
}
.hover-card:hover {
  transform: scale(1.02);
}
</style>
