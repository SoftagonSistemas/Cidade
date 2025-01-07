<script setup lang="ts">
import BaseService from '@/services/BaseService'
import { useAuthStore } from '@/stores/AuthStore'

import { onMounted, ref } from 'vue'

const loading = ref(true)
const stats = ref({
  users: 0,
  documents: 0,
  tickets: 0,
})

async function fetchStats() {
  try {
    const userService = new BaseService('user')
    const documentService = new BaseService('document')
    const ticketService = new BaseService('ticket')

    const [users, documents, tickets] = await Promise.all([
      userService.countEntries(),
      documentService.countEntries(),
      ticketService.countEntries(),
    ])

    stats.value = {
      users,
      documents,
      tickets,
    }
  }
  catch (error) {
    console.error('Erro ao carregar estatísticas:', error)
  }
  finally {
    loading.value = false
  }
}

const statsCards = [
  {
    title: 'Usuários',
    value: () => stats.value.users,
    icon: 'mdi-account-group',
    color: 'primary',
  },
  {
    title: 'Documentos',
    value: () => stats.value.documents,
    icon: 'mdi-file-document',
    color: 'success',
  },
  {
    title: 'Protocolos',
    value: () => stats.value.tickets,
    icon: 'mdi-ticket-outline',
    color: 'warning',
  },
]
const org = useAuthStore().organization
onMounted(() => {
  fetchStats()
})
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-2">
          Indicadores
        </h1>
        <h2 class="text-h7 mb-4">
          Resumo {{ org.name }}
        </h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="card in statsCards"
        :key="card.title"
        cols="12"
        sm="12"
        md="4"
      >
        <v-card
          :loading="loading"
          :color="card.color"
          theme="dark"
          class="mx-auto h-100"
        >
          <v-card-item>
            <template #prepend>
              <v-icon
                :icon="card.icon"
                size="large"
                class="mr-2"
              />
            </template>

            <v-card-title class="text-h6">
              {{ card.title }}
            </v-card-title>

            <v-card-subtitle class="text-h4 mt-2">
              {{ loading ? '...' : card.value() }}
            </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12">
        <v-card elevation="2" rounded="lg">
          <v-card-item>
            <template #prepend>
              <v-icon icon="mdi-chart-timeline-variant" size="large" class="mr-2" />
            </template>
            <v-card-title class="text-h6">
              Estados dos Protocolos
            </v-card-title>
          </v-card-item>

          <v-card-text class="pt-4">
            <v-row
              v-for="(status) in [
                { label: 'Em Aberto', value: 30, icon: 'mdi-folder-open', color: 'error' },
                { label: 'Em Análise', value: 45, icon: 'mdi-progress-clock', color: 'warning' },
                { label: 'Concluídos', value: 25, icon: 'mdi-check-circle', color: 'success' },
              ]"
              :key="status.label"
              class="mb-4"
            >
              <v-col cols="12" sm="3" class="d-flex align-center">
                <v-icon :icon="status.icon" :color="status.color" class="mr-2" />
                <span class="text-subtitle-1">{{ status.label }}</span>
              </v-col>
              <v-col cols="12" sm="9">
                <v-progress-linear
                  :model-value="status.value"
                  :color="status.color"
                  height="20"
                  rounded
                >
                  <template #default="{ value }">
                    <span class="white--text font-weight-bold">{{ Math.ceil(value) }}%</span>
                  </template>
                </v-progress-linear>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-5px);
}

.h-100 {
  height: 100%;
}

.v-progress-linear {
  border-radius: 10px;
}
</style>
