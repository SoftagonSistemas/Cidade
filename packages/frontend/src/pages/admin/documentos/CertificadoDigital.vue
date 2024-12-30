<script setup lang="ts">
import type { DigitalCertificate } from '@prisma/client'
import BaseService from '@/services/BaseService'

const tabs = ref(0)
const certificates = ref<DigitalCertificate[]>([])

const certificateService = new BaseService<DigitalCertificate>('digital_certificate')

async function fetchCertificates() {
  certificates.value = await certificateService.getAll() as DigitalCertificate[]
}

onMounted(fetchCertificates)
</script>

<template>
  <v-container>
    <v-row>
      <h1>Gerenciar Certificados Digitais</h1>
      <v-col cols="12">
        <v-tabs v-model="tabs" center-active color="secondary">
          <v-tab>Cadastrados</v-tab>
          <v-tab>Novo certificado</v-tab>
        </v-tabs>
        <v-tabs-window v-model="tabs">
          <v-tabs-window-item id="list-certificate" value="one">
            <v-list lines="two">
              <template v-if="certificates.length === 0">
                <v-list-item>
                  <v-list-item-title>Nenhum certificado registrado ainda.</v-list-item-title>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item
                  v-for="(certificate, index) in certificates"
                  :key="index"
                  :subtitle="`vencimento ${certificate.expiration}`"
                  :title="certificate.alias"
                >
                  <template #append>
                    <v-btn
                      color="grey-lighten-1"
                      icon="mdi-tag-edit"
                      variant="text"
                      @click="(index)"
                    />
                  </template>
                </v-list-item>
              </template>
              <v-divider inset />
            </v-list>
          </v-tabs-window-item>

          <v-tabs-window-item id="insert-certificate" value="two">
            <NewCertificate />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-container {
  padding-top: 20px;
}

h1 {
  font-size: 2rem;
}

@media (max-width: 600px) {
  h1 {
    font-size: 1.5rem;
  }
}
</style>
