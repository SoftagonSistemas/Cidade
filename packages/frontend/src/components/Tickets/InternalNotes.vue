<script setup lang="ts">
import { ref } from 'vue'

const valid = ref(false)
const noteTitle = ref('')
const noteDetails = ref('')
const uploadedFile = ref<File | null>(null)
const callStatus = ref('Waiting for Authorization')
const statuses = [
  'Waiting for Authorization',
  'In Progress',
  'Completed',
  'Cancelled',
]

function sendNote() {
  /* Note Sent */
}
</script>

<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title>Internal Note</v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field v-model="noteTitle" label="Internal Note Title" outlined required />
          <v-textarea v-model="noteDetails" label="Note Details" outlined rows="5" clearable />
          <v-file-input v-model="uploadedFile" label="Upload File" outlined clearable show-size />
          <v-select v-model="callStatus" :items="statuses" label="Call Status" outlined />
          <v-btn :disabled="!valid" color="primary" @click="sendNote">
            Send Internal Note
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.pa-5 {
  padding: 20px;
}
</style>
