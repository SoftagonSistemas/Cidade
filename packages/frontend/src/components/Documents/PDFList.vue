<script setup>
import { computed, defineEmits, onMounted, ref } from 'vue'

const emit = defineEmits(['view'])
const search = ref('')
const isGridView = ref(true)
const pdfs = ref([
  // Exemplo de dados; substitua pela lógica de obtenção dos PDFs
  { name: 'Bíblia Católica', url: '/pdfs/Biblia-Catolica-Ave-Maria.pdf', thumbnail: '/thumbnails/application-pdf.png' },
  { name: 'Vire à Direita', url: '/pdfs/03.pdf', thumbnail: '/thumbnails/thumb-file.png' },
  { name: 'Livro sobre ChatGPT', url: '/pdfs/Livro-Sobre-ChatGPT.pdf', thumbnail: '/thumbnails/thumb-file.png' },
])

const filteredPDFs = computed(() => {
  return pdfs.value.filter(pdf =>
    pdf.name.toLowerCase().includes(search.value.toLowerCase()),
  )
})

function toggleView() {
  isGridView.value = !isGridView.value
}

function viewPDF(name, url) {
  emit('view', name, url)
}

function downloadPDF() {
  // Lógica para baixar o PDF
}

function deletePDF() {
  // Lógica para excluir o PDF
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <v-text-field
          v-model="search"
          label="Pesquisar PDFs"
          append-icon="mdi-magnify"
          @click:append="filterPDFs"
        />
        <v-btn @click="toggleView">
          <v-icon>{{ isGridView ? 'mdi-view-list' : 'mdi-view-grid' }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="pdf in filteredPDFs"
        :key="pdf.name"
        cols="12"
        md="4"
        lg="3"
      >
        <v-card>
          <v-img
            :src="pdf.thumbnail"
            aspect-ratio="1.7"
            @click="viewPDF(pdf.name, pdf.url)"
          />
          <v-card-title>{{ pdf.name }}</v-card-title>
          <v-card-actions>
            <v-btn icon @click="downloadPDF(pdf.url)">
              <v-icon>mdi-download</v-icon>
            </v-btn>
            <v-btn icon @click="deletePDF(pdf.name)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Estilos adicionais */
</style>
