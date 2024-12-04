<template>
  <v-container>
    <v-card-title class="text-h5">Update SLA plan - SLA Plan Title</v-card-title>
    <v-card-subtitle>
      Calls are marked as due when the grace period is violated.
    </v-card-subtitle>

    <v-card-text>
      <v-form ref="slaForm" v-model="valid">
        <!-- Nome -->
        <v-text-field label="Name" v-model="form.name" :rules="[rules.required]" required></v-text-field>

        <!-- Inline Row -->
        <v-row>
          <!-- Status -->
          <v-col>
            <v-radio-group v-model="form.status" label="Status" row inline>
              <v-radio label="Active" value="Active"></v-radio>
              <v-radio label="Disabled" value="Disabled"></v-radio>
            </v-radio-group>
          </v-col>

          <!-- Período de carência -->
          <v-col>
            <v-text-field label="Grace Period (in hours)" v-model="form.gracePeriod"
              :rules="[rules.required, rules.isNumber]" required type="number"></v-text-field>
          </v-col>

          <!-- Schedule -->
          <v-col>
            <v-select label="Schedule" v-model="form.programacao" :items="programacoes"></v-select>
          </v-col>
        </v-row>

        <!-- Transitório -->
        <v-checkbox label="SLA can be overridden when transferring a call or changing department"
          v-model="form.transitorio"></v-checkbox>

        <!-- Alertas de Chamados Vencidos -->
        <v-checkbox label="Disable past due call alerts. (Override global setting)"
          v-model="form.alertasChamados"></v-checkbox>

        <!-- Notas internas -->
        <v-textarea label="Internal Notes : Be liberal, they are internal" v-model="form.notasInternas"></v-textarea>
      </v-form>
    </v-card-text>

    <v-card-actions class="sticky-bottom">
      <v-btn color="primary" variant="elevated" @click="submitForm">Update</v-btn>
      <v-btn variant="text" @click="resetForm">Cancel</v-btn>
    </v-card-actions>

  </v-container>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
const valid = ref(false);
const slaForm = ref();
const form = reactive({
  name: '',
  status: 'ativo',
  gracePeriod: null as number | null,
  programacao: '-- Padrão do Sistema --',
  transitorio: false,
  alertasChamados: false,
  notasInternas: '',
});

const programacoes = ['-- Padrão do Sistema --'];

const rules = {
  required: (value: string | number) => !!value || 'Mandatory',
  isNumber: (value: string | number) =>
    !isNaN(Number(value)) || ' Not a number',
};

const submitForm = () => {
  if (slaForm.value.validate()) {
    console.log('Form submitted:', form);
    // Handle form submission logic here
  }
};

const resetForm = () => {
  slaForm.value.reset();
}
</script>
<style scoped>
.sticky-bottom {
  position: sticky;
  bottom: 0;
}
</style>
