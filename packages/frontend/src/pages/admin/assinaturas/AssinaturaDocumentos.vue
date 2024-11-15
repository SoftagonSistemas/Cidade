<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const documentTitle = ref('')
const documentContent = ref('')
const signature = ref('')

function signDocument() {
  // Logic to sign the document
  console.log('Document signed:', {
    title: documentTitle.value,
    content: documentContent.value,
    signature: signature.value,
  })
  // Redirect or show a success message
  router.push('/admin/assinaturas/ValidacaoAssinaturas')
}
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <h1>Assinatura de Documentos</h1>
        <p>Assinatura integrada diretamente no sistema.</p>
        <p>Garantia de integridade e validade jurídica.</p>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" md="6">
        <VTextField v-model="documentTitle" label="Título do Documento" />
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VTextarea v-model="documentContent" label="Conteúdo do Documento" rows="10" />
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" md="6">
        <VTextField v-model="signature" label="Assinatura" />
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VBtn color="primary" @click="signDocument">
          Assinar Documento
        </VBtn>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
h1 {
    margin-bottom: 20px;
}
</style>
