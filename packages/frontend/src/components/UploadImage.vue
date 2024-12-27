<script setup lang="ts">
import FileService from '@/services/FileService'
import { useAuthStore } from '@/stores/AuthStore'
import { onMounted, reactive, ref, watch } from 'vue'
import { z } from 'zod'

const emit = defineEmits(['update:modelValue'])
const model = defineModel()
const authStore = useAuthStore()

const file = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const isValid = ref(false)
const isLoading = ref(false) // Indica se está carregando
const service = new FileService()
const uploadResponse = reactive<{ path: string | null, versionId: string | null }>({ path: null, versionId: null })

const schema = z.object({
  file: z.instanceof(File).refine(file => file.type.startsWith('image/'), 'Arquivo deve ser uma imagem'),
})

function validateFile() {
  const result = schema.safeParse({ file: file.value })
  isValid.value = result.success
  return result
}

async function uploadImage() {
  const { id: userId, email, name: userName } = authStore.user
  const { id: orgId, name: orgName } = authStore.organization

  const extractedData = {
    userId,
    email,
    userName,
    orgId,
    orgName,
  }
  const validation = validateFile()
  if (validation.success && file.value) {
    try {
      isLoading.value = true
      const response = await service.uploadFile(file.value, extractedData)
      uploadResponse.path = response.path
      uploadResponse.versionId = response.versionId
      emit('update:modelValue', response.path)

      // Obter a URL de visualização do arquivo
      const viewResponse = await service.urlFile(response.path)
      previewUrl.value = viewResponse
    }
    catch (error) {
      console.error('Erro no upload:', error)
    }
    finally {
      isLoading.value = false
    }
  }
  else {
    console.warn('Erro de validação:', validation.error?.errors)
  }
}

async function removeImage() {
  const path = uploadResponse.path || model.value
  if (path) {
    try {
      isLoading.value = true
      const versionId = await service.getFileVersion(path)
      await service.deleteFile(versionId, path)
      emit('update:modelValue', null)
      previewUrl.value = null
      uploadResponse.path = null
      uploadResponse.versionId = null
      file.value = null
    }
    catch (error) {
      console.error('Erro ao remover a imagem:', error)
    }
    finally {
      isLoading.value = false
    }
  }
}

async function loadExistingImage() {
  if (model.value) {
    const maxRetries = 3
    const retryDelay = 1000 // 1 segundo entre tentativas
    let attempts = 0
    let success = false

    isLoading.value = true

    while (attempts < maxRetries && !success) {
      try {
        attempts++
        const viewResponse = await service.urlFile(model.value)
        previewUrl.value = viewResponse
        success = true
      }
      catch (error) {
        console.error(`Tentativa ${attempts} falhou ao carregar a imagem existente.`, error)
        if (attempts >= maxRetries) {
          console.error('Erro ao carregar a imagem após várias tentativas:', error)
        }
        else {
          await new Promise(resolve => setTimeout(resolve, retryDelay))
        }
      }
    }

    isLoading.value = false
  }
}

// Reativa a chamada para carregar a imagem caso `model.value` mude
watch(() => model.value, loadExistingImage, { immediate: true })
</script>

<template>
  <v-container>
    <!-- Barra de progresso enquanto carrega -->
    <v-progress-linear v-if="isLoading" indeterminate color="primary" class="mb-4" />

    <!-- Campo de Upload de Arquivo -->
    <v-file-input
      v-if="!previewUrl && !isLoading"
      v-model="file"
      label="Selecione uma imagem"
      accept="image/*"
      :rules="[() => validateFile().success || 'Arquivo deve ser uma imagem']"
      show-size
      required
      @change="uploadImage"
    />

    <!-- Pré-visualização da Imagem -->
    <v-card
      v-if="previewUrl && !isLoading"
      class="mx-auto"
      elevation="12"
      max-width="300"
      rounded="lg"
      style="position: relative;"
    >
      <!-- Botão de Remover no Topo -->
      <v-btn
        icon
        density="comfortable"
        size="x-small"
        color="red"
        class="position-absolute"
        style="top: 8px; right: 8px; z-index: 2;"
        @click="removeImage"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <!-- Imagem -->
      <v-img
        :src="previewUrl"
        max-width="100%"
        height="auto"
        alt="Imagem Selecionada"
        rounded="lg"
        :eager="true"
      />
    </v-card>
  </v-container>
</template>
