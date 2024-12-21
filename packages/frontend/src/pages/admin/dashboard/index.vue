<script setup lang="ts">
import { OrganizationService } from '@/services/OrganizationService'
import { onMounted, ref } from 'vue'

const organizations = ref(null)
const organizationService = new OrganizationService()

onMounted(async () => {
  try {
    organizations.value = await organizationService.listOrganizations()
  }
  catch (error) {
    console.error('Failed to load organizations:', error)
  }
})
// ...existing code...
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    {{ organizations }}
    <div v-if="organizations">
      <ul>
        <li v-for="org in organizations" :key="org.id">
          {{ org.name }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Loading organizations...</p>
    </div>
  </div>
</template>

<style scoped>
</style>
