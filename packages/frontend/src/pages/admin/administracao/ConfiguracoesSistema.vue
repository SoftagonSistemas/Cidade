<script setup lang="ts">
import { ref } from 'vue'

const responseDeadline = ref(7) // Default response deadline in days
const auditLogs = ref([
  { id: 1, action: 'Login', user: 'admin', timestamp: '2023-10-01 10:00' },
  { id: 2, action: 'Document Approved', user: 'user1', timestamp: '2023-10-01 11:00' },
  // Add more logs as needed
])

function updateResponseDeadline() {
  console.warn('Response deadline updated to:', responseDeadline.value, 'days')
}

function fetchAuditLogs() {
  // Simulate fetching audit logs from an API
  auditLogs.value = [
    { id: 1, action: 'Login', user: 'admin', timestamp: '2023-10-01 10:00' },
    { id: 2, action: 'Document Approved', user: 'user1', timestamp: '2023-10-01 11:00' },
    // Add more logs as needed
  ]
}

onMounted(() => {
  fetchAuditLogs()
})
</script>

<template>
  <VContainer>
    <h1>Configurações do Sistema</h1>
    <VRow>
      <VCol cols="12" md="6">
        <VCard>
          <VCardTitle>Definição de prazos padrão para respostas a documentos</VCardTitle>
          <VCardText>
            <VTextField v-model="responseDeadline" label="Prazo em dias" type="number" />
            <VBtn color="primary" @click="updateResponseDeadline">
              Atualizar Prazo
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>Monitoramento de logs de auditoria</VCardTitle>
          <VCardText>
            <VList>
              <VListItem v-for="log in auditLogs" :key="log.id">
                <VListItemTitle>{{ log.action }}</VListItemTitle>
                <VListItemSubtitle>{{ log.user }} - {{ log.timestamp }}</VListItemSubtitle>
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
