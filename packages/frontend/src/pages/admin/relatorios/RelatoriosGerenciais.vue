<script setup lang="ts">
import { ref } from 'vue'

const stats = ref({
  sent: 120,
  received: 95,
  pending: 30,
})

const flows = ref([
  { id: 1, name: 'Fluxo 1', executionTime: '2h 30m' },
  { id: 2, name: 'Fluxo 2', executionTime: '1h 45m' },
])

const actions = ref([
  { id: 1, user: 'Usuário 1', description: 'Ação 1' },
  { id: 2, user: 'Usuário 2', description: 'Ação 2' },
])
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <h1>Relatórios Gerenciais</h1>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" md="4">
        <VCard>
          <VCardTitle>Estatísticas de Documentos</VCardTitle>
          <VCardText>
            <VList>
              <VListItem>
                <VListItemTitle>Enviados</VListItemTitle>
                <VListItemSubtitle>{{ stats.sent }}</VListItemSubtitle>
              </VListItem>
              <VListItem>
                <VListItemTitle>Recebidos</VListItemTitle>
                <VListItemSubtitle>{{ stats.received }}</VListItemSubtitle>
              </VListItem>
              <VListItem>
                <VListItemTitle>Pendentes</VListItemTitle>
                <VListItemSubtitle>{{ stats.pending }}</VListItemSubtitle>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="4">
        <VCard>
          <VCardTitle>Dados de Fluxos</VCardTitle>
          <VCardText>
            <VList>
              <VListItem v-for="flow in flows" :key="flow.id">
                <VListItemTitle>{{ flow.name }}</VListItemTitle>
                <VListItemSubtitle>Tempo de Execução: {{ flow.executionTime }}</VListItemSubtitle>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="4">
        <VCard>
          <VCardTitle>Histórico de Ações</VCardTitle>
          <VCardText>
            <VList>
              <VListItem v-for="action in actions" :key="action.id">
                <VListItemTitle>{{ action.user }}</VListItemTitle>
                <VListItemSubtitle>{{ action.description }}</VListItemSubtitle>
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
