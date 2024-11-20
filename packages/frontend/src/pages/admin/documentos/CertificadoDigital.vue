<script setup lang="ts">
const tabs = ref(0)

const certificates = ref([
  // Exemplo de certificado
  { name: 'Certificado Exemplo', expirationDate: '2025-12-31', password: '123456', file: null },
])
</script>

<template>
  <v-row>
    <v-row no-gutters class="pl-2 pt-4">
      <v-col cols="9">
        <v-sheet>
          <h1>Gerenciar Certificados Digitais</h1>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pt-8   ">
          <v-fab
            color="primary"
            icon="mdi-plus"
            variant="flat"
            class="ms-4"
            @click="tabs = 1"
          />
        </v-sheet>
      </v-col>
    </v-row>
    <v-col cols="12">
      <v-tabs v-model="tabs" center-active color="secondary" class="mb-4">
        <v-tab>Cadastrados</v-tab>
        <v-tab>Novo certificado</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tabs">
        <v-tabs-window-item id="list-certificate" value="one">
          <v-list lines="two">
            <v-list-item
              v-for="(certificate, index) in certificates"
              :key="index"
              :subtitle="`vencimento ${certificate.expirationDate}`"
              :title="certificate.name"
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
            <v-divider inset />
          </v-list>
        </v-tabs-window-item>

        <v-tabs-window-item id="insert-certificate" value="two">
          <NewCertificate />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-col>
  </v-row>
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
