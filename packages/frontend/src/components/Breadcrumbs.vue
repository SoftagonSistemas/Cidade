<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Obtemos os dados dos breadcrumbs a partir da rota
const route = useRoute()
const breadcrumbs = computed(() => {
  // Adiciona um breadcrumb inicial fixo
  const initialBreadcrumb = [{ title: 'Início', to: '/admin' }]

  // Processa os breadcrumbs da rota
  const routeBreadcrumbs = route.matched.flatMap((record) => {
    const metaBreadcrumb = record.meta?.breadcrumb

    // Se for array, retorna todos os itens, caso contrário, retorna um único item
    return Array.isArray(metaBreadcrumb)
      ? metaBreadcrumb
      : metaBreadcrumb
        ? [metaBreadcrumb]
        : []
  })

  return [...initialBreadcrumb, ...routeBreadcrumbs]
})
</script>

<template>
  <v-row v-if="breadcrumbs.length > 1" justify="end" class="mr-3">
    <v-breadcrumbs class="text-decoration-underline text-caption">
      <v-breadcrumbs-item
        v-for="(item, index) in breadcrumbs"
        :key="index"
        :href="item.to"
        active-class="text--primary"
      >
        {{ item.title }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
  </v-row>
</template>
