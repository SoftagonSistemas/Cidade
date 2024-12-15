<template>
  <div class="create-ticket-form">
    <h2>Create Ticket</h2>
    <v-form @submit.prevent="handleSubmit">
      <v-row>
        <!-- User -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="ticket.user"
            label="User"
            placeholder="Enter user"
            outlined
            required
          ></v-text-field>
        </v-col>

        <!-- Cc -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="ticket.cc"
            label="Cc"
            placeholder="Enter cc"
            outlined
          ></v-text-field>
        </v-col>

        <!-- Call Alert -->
        <v-col cols="12" md="6">
          <v-switch
            v-model="ticket.callAlert"
            label="Call Alert: Notify all"
            :label-position="'right'"
          ></v-switch>
        </v-col>

        <!-- Origin of the call -->
        <v-col cols="12" md="6">
          <v-select
            v-model="ticket.origin"
            :items="['telephone', 'email', 'web', 'chat']"
            label="Origin of the call"
            outlined
          ></v-select>
        </v-col>

        <!-- Department -->
        <v-col cols="12" md="6">
          <v-select
            v-model="ticket.department"
            :items="['administration', 'support']"
            label="Department"
            outlined
          ></v-select>
        </v-col>

        <!-- Secretary -->
        <v-col cols="12" md="6">
          <v-select
            v-model="ticket.secretary"
            :items="secretaries"
            item-text="name"
            item-value="id"
            label="Secretary"
            outlined
            return-object
          ></v-select>
        </v-col>

        <!-- SLA Plan -->
        <v-col cols="12" md="6">
          <v-select
            v-model="ticket.slaPlan"
            :items="['default', 'custom']"
            label="SLA Plan"
            outlined
          ></v-select>
        </v-col>

        <!-- Due Date -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="ticket.dueDate"
            label="Due Date"
            type="datetime-local"
            outlined
          >
            <template v-slot:append>
              <v-tooltip bottom>
                <template #activator="{isActive, props: {on, attrs} }">
                  <v-icon v-bind="attrs" v-on="on">mdi-information</v-icon>
                </template>
                <span>Time based on your time zone: America/Recife</span>
              </v-tooltip>
            </template>
          </v-text-field>
        </v-col>

        <!-- Attributed to -->
        <v-col cols="12" md="6">
          <v-select
            :items="agents"
            item-text="name"
            item-value="id"
            label="Attributed to"
            outlined
            return-object
          ></v-select>
        </v-col>

        <!-- Request Title -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="ticket.requestTitle"
            label="A title for your request"
            placeholder="Request title"
            outlined
          ></v-text-field>
        </v-col>

        <!-- Request Description -->
        <v-col cols="12">
          <v-textarea
            v-model="ticket.requestDescription"
            label="Describe the request"
            placeholder="Please be very specific"
            outlined
          ></v-textarea>
        </v-col>

        <!-- Priority -->
        <v-col cols="12" md="6">
          <v-select
            v-model="ticket.priority"
            :items="['low', 'medium', 'high']"
            label="Priority"
            outlined
          ></v-select>
        </v-col>

        <!-- Attachments -->
        <v-col cols="12" md="6">
          <v-file-input
            v-model="files"
            label="Attachments"
            multiple
            @change="handleFileUpload"
            outlined
          >
            <template v-slot:append>
              <v-btn icon @click="handleFileUpload">
                <v-icon>mdi-paperclip</v-icon>
              </v-btn>
            </template>
          </v-file-input>
          <p v-if="files.length">Files selected: {{ files.length }}</p>
        </v-col>

        <!-- Ready Answer -->
        <v-col cols="12" md="6">
          <v-select
            v-model="ticket.readyAnswer"
            :items="readyAnswers"
            item-text="text"
            item-value="id"
            label="Ready Answer"
            outlined
          ></v-select>
        </v-col>

        <!-- Call Status -->
        <v-col cols="12" md="6">
          <v-select
            v-model="ticket.callStatus"
            :items="['open', 'in-progress', 'closed']"
            label="Call Status"
            outlined
          ></v-select>
        </v-col>

        <!-- Signature -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="ticket.signature"
            label="Signature"
            placeholder="Your signature"
            outlined
          ></v-text-field>
        </v-col>

        <!-- Internal Notes -->
        <v-col cols="12">
          <v-textarea
            v-model="ticket.internalNotes"
            label="Internal Notes"
            placeholder="Internal notes"
            outlined
          ></v-textarea>
        </v-col>

        <!-- Submit Button -->
        <v-col cols="12">
          <v-btn type="submit" color="primary">Submit Ticket</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Agent {
  id: number;
  name: string;
}

interface Secretary {
  id: number;
  name: string;
}

interface ReadyAnswer {
  id: number;
  text: string;
}

interface Ticket {
  user: string;
  cc: string;
  callAlert: boolean;
  origin: string;
  department: string;
  secretary: string;
  slaPlan: string;
  dueDate: string;
  assigned: string;
  requestTitle: string;
  requestDescription: string;
  priority: string;
  readyAnswer: string;
  callStatus: string;
  signature: string;
  internalNotes: string;
}
const ticket = ref<Ticket>({
  user: '',
  cc: '',
  callAlert: false,
  origin: 'telephone',
  department: 'administration',
  secretary: '',
  slaPlan: 'default',
  dueDate: '',
  assigned: '',
  requestTitle: '',
  requestDescription: '',
  priority: 'low',
  readyAnswer: '',
  callStatus: 'open',
  signature: '',
  internalNotes: ''
});

const files = ref<File[]>([]);
const agents = ref<Agent[]>([
  { id: 1, name: 'Agent 1' },
  { id: 2, name: 'Agent 2' }
]);
const secretaries = ref<Secretary[]>([
  { id: 1, name: 'Secretary 1' },
  { id: 2, name: 'Secretary 2' }
]);
const readyAnswers = ref<ReadyAnswer[]>([
  { id: 1, text: 'Answer 1' },
  { id: 2, text: 'Answer 2' }
]);

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input && input.files) {
    files.value = Array.from(input.files);
  }
};

const handleSubmit = () => {
  // Submit the ticket
  console.log('Ticket submitted:', ticket.value);
};
</script>

<style scoped></style>
