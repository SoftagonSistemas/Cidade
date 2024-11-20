<script setup lang="ts">
const form = ref(null)
const newCertificate = ref({
  name: '',
  expirationDate: '',
  password: '',
  file: null,
})

function addCertificate() {
  if (form.value.validate()) {
    certificates.value.push({ ...newCertificate.value })
    newCertificate.value = { name: '', expirationDate: '', password: '', file: null }
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
          v-model="newCertificate.name"
          label="Nome do Certificado"
          required
        />
        <v-text-field
          v-model="newCertificate.expirationDate"
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
          label="Upload do Arquivo P12"
          accept=".p12"
          required
        />
        <v-btn @click="addCertificate">
          Adicionar Certificado
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
