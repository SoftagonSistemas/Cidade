<script setup lang="ts">
import { ref } from 'vue'

const receivedDocuments = ref([
  { id: 1, message: 'Você recebeu um novo documento.' },
  { id: 2, message: 'Documento pendente de leitura.' },
])

const pendingFlows = ref([
  { id: 1, message: 'Fluxo aguardando sua ação.' },
  { id: 2, message: 'Ação pendente no fluxo de trabalho.' },
])

const emailNotifications = ref(false)
const systemNotifications = ref(true)
</script>

<template>
  <VContainer>
    <h1>Central de Notificações</h1>
    <VRow>
      <VCol cols="12" md="6">
        <VCard>
          <VCardTitle>Documentos Recebidos</VCardTitle>
          <VCardText>
            <VAlert v-for="document in receivedDocuments" :key="document.id" type="info">
              {{ document.message }}
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="6">
        <VCard>
          <VCardTitle>Fluxos Aguardando Ações</VCardTitle>
          <VCardText>
            <VAlert v-for="flow in pendingFlows" :key="flow.id" type="warning">
              {{ flow.message }}
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>Opções de Notificação</VCardTitle>
          <VCardText>
            <VCheckbox v-model="emailNotifications" label="Notificação por E-mail" />
            <VCheckbox v-model="systemNotifications" label="Notificação no Sistema" />
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
