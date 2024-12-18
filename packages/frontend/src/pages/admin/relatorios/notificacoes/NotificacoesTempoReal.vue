<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Notification {
  id: number
  title: string
  message: string
  timestamp: string
}

const notifications = ref<Notification[]>([])

function fetchNotifications() {
  // Simulate fetching notifications from an API
  notifications.value = [
    { id: 1, title: 'Documento Aprovado', message: 'Seu documento foi aprovado.', timestamp: '2023-10-01 10:00' },
    { id: 2, title: 'Tarefa Concluída', message: 'A tarefa foi concluída com sucesso.', timestamp: '2023-10-01 11:00' },
    // Add more notifications as needed
  ]
}

onMounted(() => {
  fetchNotifications()
  // Simulate real-time updates
  setInterval(fetchNotifications, 5000)
})
</script>

<template>
  <VContainer>
    <h1>Notificações em Tempo Real</h1>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardText>
            <VList>
              <VListItem v-for="notification in notifications" :key="notification.id">
                <VListItemTitle>{{ notification.title }}</VListItemTitle>
                <VListItemSubtitle>{{ notification.message }}</VListItemSubtitle>
                <VListItemSubtitle>{{ notification.timestamp }}</VListItemSubtitle>
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
