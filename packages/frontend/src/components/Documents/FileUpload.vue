<script setup lang="ts">
import type { Document } from '@prisma/client'
import BaseService from '@/services/BaseService'
import FileService from '@/services/FileService'
import { useAuthStore } from '@/stores/AuthStore'
import { reactive, ref, watch } from 'vue'

/** Responsável por comunicação com o componente pai */
const emit = defineEmits(['update:modelValue'])
const model = defineModel() // presumivelmente vindo de Vue Macros

/** Estados e reatividade */
const file = ref<File | null>(null)
const isLoading = ref(false)
const uploadResponse = reactive<{ path: string | null, versionId: string | null }>({
  path: null,
  versionId: null,
})
const documentData = reactive<{ title: string, keywords: string[] }>({
  title: '',
  keywords: [],
})

const documentId = ref<string | null>(null)

const dragActive = ref(false)
const uploadProgress = ref(0)

function onDragEnter(e: DragEvent) {
  e.preventDefault()
  dragActive.value = true
}

function onDragLeave(e: DragEvent) {
  e.preventDefault()
  dragActive.value = false
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  dragActive.value = false

  const droppedFiles = e.dataTransfer?.files
  if (droppedFiles?.length) {
    file.value = droppedFiles[0]
    uploadFile()
  }
}

const fileInput = ref<any>(null)

function openFileSelector() {
  fileInput.value?.$el.querySelector('input').click()
}

/** Store e serviços */
const authStore = useAuthStore()
const service = new FileService()
const documentService = new BaseService('document')

/** Upload de arquivo */
async function uploadFile(): Promise<void> {
  if (!file.value)
    return

  try {
    isLoading.value = true
    uploadProgress.value = 0

    const userData = {
      userId: authStore.user.id,
      email: authStore.user.email,
      userName: authStore.user.name,
      orgId: authStore.organization.id,
      orgName: authStore.organization.name,
    }

    // Upload do arquivo físico com progresso
    const response: any = await service.uploadFile(
      file.value,
      userData,
      (progress) => {
        uploadProgress.value = Math.round(progress)
      },
    )

    // Criar registro do documento no banco
    const documentPayload = {
      title: file.value.name,
      filePath: response.path,
      versionId: response.versionId,
      mimeType: file.value.type,
      keywords: [],
      ownerId: authStore.user.id,
      tenantId: authStore.organization.id,
    }

    const document: Partial<Document> = await documentService.create(documentPayload) as Document

    documentId.value = document.id || null
    // Atualizar estado local
    uploadResponse.path = response.path
    uploadResponse.versionId = response.versionId
    documentData.title = file.value.name
    emit('update:modelValue', response.path)
  }
  catch (err) {
    console.error('Erro no upload:', err)
  }
  finally {
    isLoading.value = false
    // Não zerar o progresso imediatamente para mostrar 100% brevemente
    setTimeout(() => {
      uploadProgress.value = 0
    }, 500)
  }
}

/** Atualização do título */
async function updateDocumentTitle(): Promise<void> {
  if (!uploadResponse.versionId)
    return

  try {
    isLoading.value = true

    const data = await documentService.update(uploadResponse.versionId, {
      title: documentData.title,
    })
    console.warn('Título atualizado:', data)
  }
  catch (err) {
    console.error('Erro ao atualizar título:', err)
  }
  finally {
    isLoading.value = false
  }
}

/** Remoção de arquivo */
async function removeFile(): Promise<void> {
  const path = uploadResponse.path || model.value
  if (!path || typeof path !== 'string')
    return

  try {
    isLoading.value = false

    await service.deleteFile(path)

    // Fazer soft delete do documento no banco
    if (documentId.value) {
      await documentService.softDelete(documentId.value)
    }

    // Limpar estado local
    emit('update:modelValue', null)
    uploadResponse.path = null
    uploadResponse.versionId = null
    file.value = null
    documentData.title = ''
    documentData.keywords = []
    toast.info('Documento removido com sucesso')
  }
  catch (err) {
    console.error('Erro ao remover arquivo:', err)
  }
  finally {
    isLoading.value = false
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0)
    return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
}
</script>

<template>
  <v-container class="pa-2 pa-sm-4">
    <template v-if="isLoading">
      <div class="file-info mb-2">
        <div class="text-subtitle-1 font-weight-medium text-primary">
          {{ file?.name }}
        </div>
        <div class="text-body-2 text-medium-emphasis">
          {{ formatFileSize(file?.size || 0) }}
        </div>
      </div>
      <v-progress-linear
        :model-value="uploadProgress"
        color="primary"
        height="25"
        striped
        class="upload-progress mb-4"
        rounded
      >
        <template #default="{ value }">
          <div class="progress-text">
            <strong>{{ Math.ceil(value) }}%</strong>
          </div>
        </template>
      </v-progress-linear>
    </template>

    <v-card
      v-if="!uploadResponse.path && !isLoading"
      :class="[{ 'drag-active': dragActive }]"
      variant="outlined"
      class="pa-4 upload-card"
      @dragenter="onDragEnter"
      @dragover.prevent
      @dragleave="onDragLeave"
      @drop="onDrop"
      @click="openFileSelector"
    >
      <div class="d-flex flex-column align-center justify-center upload-area">
        <v-icon icon="mdi-cloud-upload" size="42" color="primary" class="mb-2" />
        <h3 class="text-h6 text-primary mb-1">
          Arraste seu arquivo aqui
        </h3>
        <p class="text-body-2 text-medium-emphasis">
          ou clique em qualquer lugar desta área
        </p>

        <v-file-input
          ref="fileInput"
          v-model="file"
          label="Selecione o arquivo"
          show-size
          accept=".doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar,.7z"
          variant="outlined"
          density="comfortable"
          hide-details
          class="upload-input"
          style="display: none"
          @change="uploadFile"
        >
          <template #prepend>
            <v-icon icon="mdi-file-document-outline" color="primary" />
          </template>
        </v-file-input>
      </div>
    </v-card>

    <v-card
      v-else-if="uploadResponse.path"
      variant="outlined"
      class="pa-4 upload-card"
      elevation="1"
    >
      <v-card-title class="text-primary d-flex align-center gap-2 mb-4">
        <v-icon icon="mdi-file-check" color="success" size="28" />
        <span class="ml-2">Documento Carregado</span>
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="documentData.title"
          label="Título do documento"
          variant="outlined"
          density="comfortable"
          @blur="updateDocumentTitle"
        >
          <template #prepend>
            <v-icon icon="mdi-file-edit" color="primary" class="d-none d-sm-flex" />
          </template>
        </v-text-field>

        <v-combobox
          v-model="documentData.keywords"
          multiple
          chips
          label="Palavras-chave"
          clearable
          :delimiters="[',']"
          variant="outlined"
          density="comfortable"
          class="mb-2"
        >
          <template #prepend>
            <v-icon icon="mdi-tag-multiple" color="primary" class="d-none d-sm-flex" />
          </template>
          <template #chip="{ props, item }">
            <v-chip
              v-bind="props"
              color="primary"
              variant="tonal"
              label
              size="small"
            >
              {{ item }}
            </v-chip>
          </template>
        </v-combobox>

        <v-divider class="mb-4" />

        <div class="d-flex flex-wrap align-center justify-space-between gap-4">
          <div class="d-flex align-center flex-grow-1">
            <v-icon icon="mdi-file-check" color="success" class="mr-2" />
            <span class="text-body-2 text-medium-emphasis text-truncate">
              {{ uploadResponse.path }}
            </span>
          </div>
          <v-btn
            color="error"
            variant="tonal"
            prepend-icon="mdi-delete"
            class="mt-2"
            @click="removeFile"
          >
            Remover
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.upload-card {
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px dashed rgba(var(--v-theme-primary), 0.4);
}

.upload-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.upload-area {
  min-height: 180px;
  padding: 1.5rem;
}

.drag-active {
  background-color: rgba(var(--v-theme-primary), 0.05);
  border-color: rgb(var(--v-theme-primary));
}

.upload-input {
  max-width: 300px;
}

.v-card-title {
  font-size: 1.25rem;
  font-weight: 500;
}

.upload-progress {
  min-width: 100px;
}

.progress-text {
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.file-info {
  padding: 4px 8px;
  border-radius: 4px;
  background-color: rgba(var(--v-theme-primary), 0.05);
}
</style>
