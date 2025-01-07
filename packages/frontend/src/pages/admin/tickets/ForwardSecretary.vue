<script lang="ts" setup>
import { ref } from 'vue'

interface Secretary {
  id: number
  name: string
}
const props = defineProps<{
  ticket: any
}>()
const emit = defineEmits<(e: 'close') => void>()
const selectedSecretary = ref<number | null>(null)
const maintainReferralAccess = ref(false)
const description = ref('')
const secretaryList = ref<Secretary[]>([
  { id: 1, name: 'Secretary 1' },
  { id: 2, name: 'Secretary 2' },
  { id: 3, name: 'Secretary 3' },
])

function transferTicket() {
  // Handle Ticket transfer
  closeDialog()
}

function closeDialog() {
  emit('close')
}
</script>

<template>
  <v-card>
    <v-card-title>
      Ticket #{{ ticket.id }} : Transfer
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="selectedSecretary"
              :items="secretaryList"
              label="Select Secretary"
              item-title="name"
              item-value="id"
              outlined
            />
          </v-col>

          <v-col cols="12">
            <v-checkbox
              v-model="maintainReferralAccess"
              label="Maintain referral access to current department"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="description"
              label="Description"
              outlined
              rows="4"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="transferTicket">
        Transfer
      </v-btn>
      <v-btn color="grey" variant="text" @click="closeDialog">
        Cancel
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.v-card {
  width: 100%;
}
</style>
