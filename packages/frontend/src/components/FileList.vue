<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { FileService } from '../services/FileService'

const pdfFiles = ref([])

onMounted(async () => {
  pdfFiles.value = await FileService.listPdfFiles()
})

function viewPdf(file) {
  const filePath = `/private/pdfs/${file}`
  window.open(filePath, '_blank')
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-list>
          <v-list-item
            v-for="file in pdfFiles"
            :key="file"
            @click="viewPdf(file)"
          >
            <v-list-item-content>{{ file }}</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
