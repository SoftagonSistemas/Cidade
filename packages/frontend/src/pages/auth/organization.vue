<script setup lang="ts">
import { AuthService } from '@/services/AuthService'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const organizations = ref<{ id: string, name: string, logo: string, metadata: string, createdAt: Date, slug: string }[]>([])

const authService = new AuthService()
const router = useRouter()

onMounted(async () => {
  try {
    const orgs = await authService.listOrganizations()
    organizations.value = orgs
  }
  catch (error) {
    console.error('Failed to load organizations:', error)
  }
})

async function selectOrganization(organizationId: string) {
  try {
    await authService.setActiveOrganization(organizationId)
    router.push('/admin/dashboard')
  }
  catch (error) {
    console.error('Failed to set active organization:', error)
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Escolha uma Organização</h1>
        </v-col>
        <v-col v-if="organizations.length" cols="12">
          <v-row>
            <v-col v-for="org in organizations" :key="org.id" cols="12" md="4">
              <v-card class="organization-card" @click="selectOrganization(org.id)">
                <v-card-item>
                  <v-row no-gutters>
                    <v-col cols="auto" class="mr-4">
                      <v-img
                        :src="org.logo"
                        :alt="org.name"
                        :width="150"
                        aspect-ratio="16/9"
                      />
                    </v-col>
                    <v-col>
                      <v-card-title class="px-0">
                        {{ org.name }}
                      </v-card-title>
                      <v-card-subtitle class="px-0">
                        {{ org.slug }}
                      </v-card-subtitle>
                    </v-col>
                  </v-row>
                </v-card-item>
                <v-card-actions>
                  <v-btn color="primary" block>
                    Selecionar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-else cols="12">
          <p>Carregando organizações...</p>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.organization-card {
    cursor: pointer;
    transition: transform 0.2s;
}

.organization-card:hover {
    transform: translateY(-4px);
}
</style>
