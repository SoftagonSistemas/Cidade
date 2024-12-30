<script setup lang="ts">
import fileService from '@/services/FileService'

const emit = defineEmits(['certificateAdded'])
const form = ref(null)
const newCertificate = ref({
  alias: '',
  expiration: '',
  password: '',
  file: null,
})

const certificateService = new fileService()
async function addCertificate() {
  if (form.value && form.value.validate()) {
    try {
      const filePath = ref()
      if (newCertificate.value.file) {
        filePath.value = await certificateService.uploadFile(newCertificate.value.file)
      }
      else {
        throw new Error('File is required')
      }

      const certificate = {
        alias: newCertificate.value.alias,
        expiration: new Date(newCertificate.value.expiration),
        password: newCertificate.value.password,
        file: filePath.value,
      }

      await certificateService.create(certificate)

      newCertificate.value = { alias: '', expiration: '', password: '', file: null }

      emit('certificateAdded')
    }
    catch (error) {
      console.error('Erro ao adicionar certificado:', error)
    }
  }
}

function editCertificate(index: number) {
  const certificate = certificates.value[index]
  newCertificate.value = { ...certificate }
  certificates.value.splice(index, 1)
}
function deleteCertificate(index: number) {
  certificates.value.splice(index, 1)
}
</script>

<template>
  <v-card id="add-certificate">
    <v-card-title />
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
        <v-btn @click="addCertificate">
          Adicionar Certificado
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
