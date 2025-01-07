<script setup lang="ts">
import type { DigitalCertificate } from '@prisma/client'
import BaseService from '@/services/BaseService'
import FileService from '@/services/FileService'
import { useAuthStore } from '@/stores/AuthStore'

defineProps({
  showNewCertificateModal: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['certificateAdded', 'update:showNewCertificateModal'])
const form = ref(null)
const newCertificate = ref({
  alias: '',
  expiration: '',
  password: '',
  file: null,
})

const certificateService = new BaseService('digital_certificate')
const fileService = new FileService()

async function addCertificate() {
  if (form.value) {
    try {
      const filePath = ref()
      if (newCertificate.value.file) {
        filePath.value = await fileService.uploadFile(newCertificate.value.file)
      }
      else {
        toast.error('Certificado digital é obrigatório')
        throw new Error('File is required')
      }

      const certificate: Partial<DigitalCertificate> = {
        alias: newCertificate.value.alias,
        expiration: new Date(newCertificate.value.expiration),
        password: newCertificate.value.password,
        filePath: filePath.value?.path,
        userId: useAuthStore().user.id,
      }

      await certificateService.create(certificate)
      newCertificate.value = { alias: '', expiration: '', password: '', file: null }
      toast.success('Certificado adicionado com sucesso')
      emit('certificateAdded')
    }
    catch (error) {
      console.error('Erro ao adicionar certificado:', error)
    }
  }
}

function closeModal() {
  emit('update:showNewCertificateModal', false)
}
</script>

<template>
  <v-card id="add-certificate">
    <v-card-title>Adicionar Novo Certificado</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="newCertificate.alias"
          label="Nome do Certificado"
          required
        />
        <v-text-field
          v-model="newCertificate.expiration"
          label="Data de Expiração"
          type="date"
          required
        />
        <v-text-field
          v-model="newCertificate.password"
          label="Senha do Certificado"
          type="password"
          required
        />
        <v-file-input
          v-model="newCertificate.file"
          label="Upload do Arquivo P12/PFX"
          accept=".p12,.pfx"
          required
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="addCertificate">
        Adicionar Certificado
      </v-btn>
      <v-btn @click="closeModal">
        Cancelar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
