<script setup lang="ts">
import type { DigitalCertificate } from '@prisma/client'
import BaseService from '@/services/BaseService'
import { onMounted, ref } from 'vue'

const certificates = ref<DigitalCertificate[]>([])
const showNewCertificateModal = ref(false)

const certificateService = new BaseService<DigitalCertificate>('digital_certificate')

async function fetchCertificates() {
  certificates.value = await certificateService.getAll() as DigitalCertificate[]
}

function onCertificateAdded() {
  fetchCertificates() // Atualiza a lista após adicionar um certificado
  showNewCertificateModal.value = false // Fecha o modal
}

onMounted(fetchCertificates)
</script>

<template>
  <v-container>
    <v-row>
      <h1>Gerenciar Certificados Digitais</h1>
      <v-col cols="12">
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
        <v-btn
          color="primary"
          class="mt-4"
          @click="showNewCertificateModal = true"
        >
          Novo Certificado
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="showNewCertificateModal" persistent max-width="600px">
      <template #default>
        <NewCertificate
          :show-new-certificate-modal="showNewCertificateModal"
          @certificate-added="onCertificateAdded"
          @update:show-new-certificate-modal="showNewCertificateModal = $event"
        />
      </template>
    </v-dialog>
  </v-container>
</template>
