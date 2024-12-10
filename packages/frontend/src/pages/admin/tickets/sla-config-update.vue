<script lang="ts" setup>
import { reactive, ref } from 'vue'

const valid = ref(false)
const slaForm = ref()
const form = reactive({
  name: '',
  status: 'ativo',
  gracePeriod: null as number | null,
  programacao: '-- Padrão do Sistema --',
  transitorio: false,
  alertasChamados: false,
  notasInternas: '',
})

const programacoes = ['-- Padrão do Sistema --']

const rules = {
  required: (value: string | number) => !!value || 'Mandatory',
  isNumber: (value: string | number) =>
    !isNaN(Number(value)) || ' Not a number',
}

function submitForm() {
  if (slaForm.value.validate()) {
    console.log('Form submitted:', form)
    // Handle form submission logic here
  }
}

function resetForm() {
  slaForm.value.reset()
}
</script>

<template>
  <v-container>
    <v-card-title class="text-h5">
      Update SLA plan - SLA Plan Title
    </v-card-title>
    <v-card-subtitle>
      Calls are marked as due when the grace period is violated.
    </v-card-subtitle>

    <v-card-text>
      <v-form ref="slaForm" v-model="valid">
        <!-- Nome -->
        <v-text-field v-model="form.name" label="Name" :rules="[rules.required]" required />

        <!-- Inline Row -->
        <v-row>
          <!-- Status -->
          <v-col>
            <v-radio-group v-model="form.status" label="Status" row inline>
              <v-radio label="Active" value="Active" />
              <v-radio label="Disabled" value="Disabled" />
            </v-radio-group>
          </v-col>

          <!-- Período de carência -->
          <v-col>
            <v-text-field
              v-model="form.gracePeriod" label="Grace Period (in hours)"
              :rules="[rules.required, rules.isNumber]" required type="number"
            />
          </v-col>

          <!-- Schedule -->
          <v-col>
            <v-select v-model="form.programacao" label="Schedule" :items="programacoes" />
          </v-col>
        </v-row>

        <!-- Transitório -->
        <v-checkbox
          v-model="form.transitorio"
          label="SLA can be overridden when transferring a call or changing department"
        />

        <!-- Alertas de Chamados Vencidos -->
        <v-checkbox
          v-model="form.alertasChamados"
          label="Disable past due call alerts. (Override global setting)"
        />

        <!-- Notas internas -->
        <v-textarea v-model="form.notasInternas" label="Internal Notes : Be liberal, they are internal" />
      </v-form>
    </v-card-text>

    <v-card-actions class="sticky-bottom">
      <v-btn color="primary" variant="elevated" @click="submitForm">
        Update
      </v-btn>
      <v-btn variant="text" @click="resetForm">
        Cancel
      </v-btn>
    </v-card-actions>
  </v-container>
</template>

<style scoped>
.sticky-bottom {
  position: sticky;
  bottom: 0;
}
</style>
