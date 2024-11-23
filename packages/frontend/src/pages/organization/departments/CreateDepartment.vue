<template>
  <v-container>
    <h1>Create New Department</h1>
    <v-stepper :items="['Department Information', 'Recall Options', 'Forms']" v-model="activeStep" :hide-actions="true">
      <template v-slot:item.1>
        <v-card flat>
          <v-form ref="step1Form" v-model="step1Valid">
            <v-text-field v-model="formData.topic" label="Topic" required></v-text-field>

            <v-select v-model="formData.status" :items="statusOptions" label="Status" required></v-select>

            <v-radio-group inline v-model="formData.type" label="Type" row required>
              <v-radio label="Public" value="public"></v-radio>
              <v-radio label="Private" value="private"></v-radio>
            </v-radio-group>

            <v-select v-model="formData.parentTopic" :items="parentTopicOptions" label="Parent Topic"
              required></v-select>

            <v-textarea v-model="formData.internalNote" label="Internal Note" outlined rows="5"></v-textarea>
          </v-form>
          <v-row>
            <v-col>
              <v-btn color="primary" @click="nextStep" :disabled="!step1Valid">Next</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </template>

      <template v-slot:item.2>
        <v-card flat>
          <v-form ref="step2Form" v-model="step2Valid">
            <v-select v-model="formData.secretery" :items="secreteryOptions" label="Secretary" required></v-select>

            <v-radio-group inline color="primary" v-model="formData.callNumberFormat" label="Call Number Format" row required>
              <v-radio label="System Default" value="system-default"></v-radio>
              <v-radio label="Custom" value="custom"></v-radio>
            </v-radio-group>

            <v-select v-model="formData.status" :items="statusOptions" label="Status" required></v-select>

            <v-select v-model="formData.priority" :items="priorityOptions" label="Priority" required></v-select>

            <v-select v-model="formData.slaPlan" :items="slaPlanOptions" label="SLA Plan" required></v-select>

            <v-select v-model="formData.thankYouPage" :items="thankYouPageOptions" label="Thank You Page"
              required></v-select>

            <v-select v-model="formData.assignTo" :items="assignToOptions" label="Assign To" required></v-select>

            <v-checkbox v-model="formData.automaticResponseDisabled" label="Automatic Response"></v-checkbox>
          </v-form>
          <v-row>
            <v-col>
              <v-btn color="secondary" @click="previousStep">Back</v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn color="primary" @click="nextStep">Next</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </template>

      <template v-slot:item.3>
        <v-card flat>
          <!-- TODO: content for forms here -->
          <v-row>
            <v-col>
              <v-btn color="secondary" @click="previousStep">Back</v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn color="success" @click="submitForm">Add Topic</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </v-stepper>
  </v-container>
</template>

<script lang="ts">
import { ref, reactive } from "vue";

export default {
  name: "AddNewDepartment",
  setup() {
    const activeStep = ref(1);

    const formData = reactive({
      topic: "",
      status: "",
      type: "",
      parentTopic: "",
      internalNote: "",
      secretery: "",
      callNumberFormat: "",
      priority: "",
      slaPlan: "",
      thankYouPage: "",
      assignTo: "",
      automaticResponseDisabled: false,
    });

    const statusOptions = ["Active", "Inactive"];
    const parentTopicOptions = ["Topic 1", "Topic 2", "Topic 3"];
    const secreteryOptions = ["Secretary 1", "Secretary 2", "Secretary 3"];
    const priorityOptions = ["High", "Medium", "Low"];
    const slaPlanOptions = ["Plan 1", "Plan 2", "Plan 3"];
    const thankYouPageOptions = ["Page 1", "Page 2", "Page 3"];
    const assignToOptions = ["Team A", "Team B", "Team C"];

    const step1Valid = ref(false);
    const step2Valid = ref(false);

    const step1Form = ref();
    const step2Form = ref();

    const nextStep = () => {
      if (activeStep.value === 1 && step1Form.value) {
        step1Form.value.validate();
      } else if (activeStep.value === 2 && step2Form.value) {
        step2Form.value.validate();
      }
      if (step1Valid.value || step2Valid.value) activeStep.value++;
    };

    const previousStep = () => {
      activeStep.value--;
    };

    const submitForm = () => {
      alert("Form submitted!");
      console.log(formData);
    };

    return {
      activeStep,
      formData,
      statusOptions,
      parentTopicOptions,
      secreteryOptions,
      priorityOptions,
      slaPlanOptions,
      thankYouPageOptions,
      assignToOptions,
      nextStep,
      previousStep,
      submitForm,
      step1Valid,
      step2Valid,
      step1Form,
      step2Form,
    };
  },
};
</script>

<style scoped></style>
