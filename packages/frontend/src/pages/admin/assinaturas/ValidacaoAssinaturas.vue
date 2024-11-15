<script setup lang="ts">
import { ref } from 'vue'
import { VBtn, VCard, VCardText, VCol, VContainer, VList, VListItem, VListItemSubtitle, VListItemTitle, VRow, VTextField } from 'vuetify/components'

const documentId = ref('')
const signatures = ref([
  { id: 1, user: 'User A', status: 'Valid', timestamp: '2023-10-01 10:00' },
  { id: 2, user: 'User B', status: 'Invalid', timestamp: '2023-10-01 11:00' },
  // Add more signatures as needed
])

function verifySignatures() {
  // Logic to verify signatures
  console.log(`Verifying signatures for document ID: ${documentId.value}`)
}
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="12" md="6">
        <VTextField v-model="documentId" label="ID do Documento" />
      </VCol>
      <VCol cols="12" md="6">
        <VBtn color="primary" @click="verifySignatures">
          Verificar Assinaturas
        </VBtn>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardText>
            <VList>
              <VListItem v-for="signature in signatures" :key="signature.id">
                <VListItemTitle>{{ signature.user }}</VListItemTitle>
                <VListItemSubtitle>{{ signature.status }} - {{ signature.timestamp }}</VListItemSubtitle>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
h1 {
    margin-bottom: 20px;
}
</style>
