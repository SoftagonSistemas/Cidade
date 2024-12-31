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

    const userData = {
      userId: authStore.user.id,
      email: authStore.user.email,
      userName: authStore.user.name,
      orgId: authStore.organization.id,
      orgName: authStore.organization.name,
    }

    const response = await service.uploadFile(file.value, userData)

    // Preencher informações iniciais com a resposta
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
  }
}

/** Atualização do título */
async function updateDocumentTitle(): Promise<void> {
  if (!uploadResponse.versionId)
    return

  try {
    isLoading.value = true

    await documentService.update(uploadResponse.versionId, {
      title: documentData.title,
    })
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
  if (!path)
    return

  try {
    isLoading.value = true

    const versionId = await service.getFileVersion(path)
    await service.deleteFile(versionId, path)

    emit('update:modelValue', null)
    uploadResponse.path = null
    uploadResponse.versionId = null
    file.value = null
    documentData.title = ''
    documentData.keywords = []
  }
  catch (err) {
    console.error('Erro ao remover arquivo:', err)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <v-container class="pa-2 pa-sm-4">
    <v-progress-linear v-if="isLoading" indeterminate color="primary" class="mb-4" />

    <v-card v-if="!uploadResponse.path && !isLoading" variant="outlined" class="pa-2 pa-sm-4">
      <v-card-title class="text-primary d-flex flex-wrap align-center gap-2">
        <v-icon icon="mdi-cloud-upload" size="24" />
        <span class="text-wrap">Upload de Documento</span>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-file-input
              v-model="file"
              label="Selecione o arquivo"
              show-size
              accept=".doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar,.7z"
              prepend-icon="mdi-file-document-outline"
              variant="outlined"
              density="comfortable"
              class="mb-2"
              hide-details
              @change="uploadFile"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card v-else-if="uploadResponse.path" variant="outlined" class="pa-2 pa-sm-4">
      <v-card-title class="text-primary d-flex flex-wrap align-center gap-2 mb-2">
        <v-icon icon="mdi-cloud-upload" size="24" />
        <span class="text-wrap">Upload de Documento</span>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="documentData.title"
              label="Título"
              hint="Você pode editar o título"
              prepend-icon="mdi-file-edit"
              variant="outlined"
              density="comfortable"
              class="mb-2"
              @blur="updateDocumentTitle"
            />
          </v-col>

          <v-col cols="12" class="mt-n10 mx-auto">
            <v-combobox
              v-model="documentData.keywords"
              multiple
              chips
              label="Palavras-chave"
              hint="Adicione palavras-chave"
              clearable
              :delimiters="[',']"
              prepend-icon="mdi-tag-multiple"
              variant="outlined"
              density="comfortable"
            >
              <template #chip="{ props, item }">
                <v-chip
                  v-bind="props"
                  color="primary"
                  label
                  size="small"
                >
                  {{ item }}
                </v-chip>
              </template>
            </v-combobox>
          </v-col>
        </v-row>

        <v-row class="mt-2">
          <v-col cols="12" sm="8">
            <div class="d-flex flex-wrap align-center gap-2">
              <v-icon icon="mdi-file-check" color="success" />
              <span class="text-body-1 text-wrap">{{ uploadResponse.path }}</span>
            </div>
          </v-col>
          <v-col cols="12" sm="4" class="d-flex justify-end mt-2 mt-sm-0">
            <v-btn
              color="error"
              variant="tonal"
              prepend-icon="mdi-delete"
              @click="removeFile"
            >
              Remover arquivo
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-card {
  transition: all 0.3s ease;
}
.v-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
