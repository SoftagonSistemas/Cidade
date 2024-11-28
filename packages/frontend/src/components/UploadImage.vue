<script setup lang="ts">
import BaseService from '@/services/BaseService'
import { z } from 'zod'

const props = defineProps<{ modelValue: string | null }>()
const emit = defineEmits(['update:modelValue'])

const file = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const isValid = ref(false)
const service = new BaseService('images')
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
  const validation = validateFile()
  if (validation.success && file.value) {
    try {
      const response = await service.uploadFile(file.value)
      uploadResponse.path = response.path
      uploadResponse.versionId = response.versionId
      emit('update:modelValue', response.path)

      // Obter a URL de visualização do arquivo
      const viewResponse = await service.viewFile(response.versionId, response.path)
      previewUrl.value = URL.createObjectURL(await viewResponse.blob())
    }
    catch (error) {
      console.error('Erro no upload:', error)
    }
  }
  else {
    console.warn('Erro de validação:', validation.error?.errors)
  }
}

async function removeImage() {
  if (uploadResponse.path && uploadResponse.versionId) {
    try {
      await service.deleteFile(uploadResponse.versionId, uploadResponse.path)
      emit('update:modelValue', null)
      previewUrl.value = null
      uploadResponse.path = null
      uploadResponse.versionId = null
      file.value = null
    }
    catch (error) {
      console.error('Erro ao remover a imagem:', error)
    }
  }
}

watch(() => props.modelValue, (newValue) => {
  previewUrl.value = newValue || null
})
</script>

<template>
  <v-container>
    <!-- Campo de Upload de Arquivo -->
    <v-file-input
      v-if="!previewUrl"
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
      v-if="previewUrl"
      class="mx-auto"
      elevation="12"
      max-width="400"
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
      />
    </v-card>
  </v-container>
</template>
