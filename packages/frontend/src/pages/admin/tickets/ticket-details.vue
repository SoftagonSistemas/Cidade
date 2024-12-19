<script setup lang="ts">
import router from '@/router'

const dialog = ref(false)
const activeTab = ref('call')
const activeReplyTab = ref('reply')
const timelineItems = ref([
  {
    message: 'correcting, there are 25 cards',
    color: 'primary',
    author: 'Dhonny Cordeiro',
    datecreated: '11/26/2024 10:48 AM',
    edit: true,
    createTicket: true,
    createTask: true,
    status: 'Updated Call',
    type: 'card',
  },
  {
    message: `Dear Sir/Madam, Good morning!
  I hereby request the production of 18 cards for people with artistic appearance`,
    color: 'warning',
    author: 'francisco jonny silva',
    datecreated: '11/26/2024 10:48 AM',
    edit: true,
    createTicket: true,
    createTask: true,
    status: 'Updated Call',
    type: 'card',
  },
  {
    message: `The call is attributed to Pedro Ivan Marques de Sá  Marked late!`,
    color: 'warning',
    author: 'francisco jonny silva',
    datecreated: '11/26/2024 10:48 AM',
    edit: false,
    createTicket: false,
    createTask: false,
    status: '',
    type: 'alert',
  },
])

const replyFormData = ref({
  of: 'Secretariat of Administration and Planning',
  recipients: ['francisco jonny silva', 'Contributors'],
  replyTo: 'All ticket recipients',
  responseType: '',
  responseContent: '',
  signature: 'none',
  callStatus: 'Open (current)',
})
const responseOptions = ['Custom', 'Acknowledgment', 'Follow-Up']
const recipientsOptions = ['francisco jonny silva', 'Contributors']
const callStatusOptions = ['Open (current)', 'Resolved', 'Pending', 'Closed']
const replyToOptions = ['All ticket recipients', 'Ticket owner', 'Do not send Response email']
function transferToSecretary() {
  // console.log('Transfer popup here.')
}
function handleManageEmployee() {
  // console.log('Manage Employee popup here.')
}
function userPopup() {
  // console.log('User details popup here.')
}

function openDialog() {
  dialog.value = true
}
function closeDialog() {
  dialog.value = false
}
function postReply() {
  // console.log(replyFormData.value)
}
function cancelReply() {
  // console.log('Reply Cancelled')
}
</script>

<template>
  <v-container style="height: 100%; overflow-y: auto">
    <v-toolbar color="white">
      <v-btn icon="mdi-arrow-left" @click="router.back()" />
      <v-spacer />
      <v-btn icon="mdi-pencil" title="Edit" />
      <v-btn icon title="Reply">
        <v-icon>mdi-reply</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-note-text</v-icon>
      </v-btn>

      <!-- Assign Dropdown -->
      <v-menu offset-y>
        <template #activator="{ props: menu }">
          <v-btn icon v-bind="menu">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link prepend-icon="mdi-account">
            <v-list-item-title>Agent</v-list-item-title>
          </v-list-item>
          <v-list-item link prepend-icon="mdi-account-group">
            <v-list-item-title>Team</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Status Dropdown -->
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-flag</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link prepend-icon="mdi-reload">
            <v-list-item-title>Waiting for Authorization</v-list-item-title>
          </v-list-item>
          <v-list-item link prepend-icon="mdi-check-circle">
            <v-list-item-title>Solved</v-list-item-title>
          </v-list-item>
          <v-list-item link prepend-icon="mdi-close-circle">
            <v-list-item-title>Closed</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-toolbar color="white">
      <h4 class="text-black mb-2">
        Ticket #PMA-278974
      </h4>
      <v-spacer />
      <!-- Print Dropdown -->
      <v-menu dense>
        <template #activator="{ props: menu }">
          <v-btn icon v-bind="menu">
            <v-icon>mdi-printer</v-icon>
          </v-btn>
        </template>
        <v-list nav>
          <v-list-item prepend-icon="mdi-file" @click="() => { }">
            <v-list-item-title>Call Subject</v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-file" @click="() => { }">
            <v-list-item-title>Subject + Internal Notes</v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-folder" @click="() => { }">
            <v-list-item-title>Thread + Attachments</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y>
        <template #activator="{ props: menu }">
          <v-btn icon v-bind="menu">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link prepend-icon="mdi-account-switch">
            <v-list-item-title>Change Owner</v-list-item-title>
          </v-list-item>
          <v-list-item color="red" link prepend-icon="mdi-trash-can">
            <v-list-item-title>Delete Call</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-row class="mb-2">
      <v-col cols="auto">
        <div class="ticket-toolbar-label">
          STATUS
        </div>
        <v-chip size="small" color="primary" text-color="primary">
          Draft
          <v-icon right>
            mdi-chevron-down
          </v-icon>
        </v-chip>
      </v-col>
      <v-col cols="auto">
        <div class="ticket-toolbar-label">
          PRIORITY
        </div>
        <v-chip size="small" color="warning">
          Emergency
          <v-icon right>
            mdi-chevron-down
          </v-icon>
        </v-chip>
      </v-col>
      <v-col cols="auto">
        <div class="ticket-toolbar-label">
          DUE DATE
        </div>
        <v-chip size="small" color="red">
          11/26/2024 10:47 AM
          <v-icon right>
            mdi-chevron-down
          </v-icon>
        </v-chip>
      </v-col>
      <v-col cols="auto">
        <div class="ticket-toolbar-label">
          DATE CREATED
        </div>
        <v-text class="text-black ticket-toolbar-value">
          <small>11/26/2024 10:47 AM</small>
        </v-text>
      </v-col>

      <v-col cols="auto">
        <div class="ticket-toolbar-label">
          LAST MESSAGE
        </div>
        <v-text class="text-black ticket-toolbar-value">
          <small>Last Week</small>
        </v-text>
      </v-col>
      <v-col cols="auto">
        <div class="ticket-toolbar-label">
          LAST RESPONSE
        </div>
        <v-text class="text-black ticket-toolbar-value">
          <small>Monday</small>
        </v-text>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" md="8" lg="7">
        <v-card variant="tonal" rounded="large" color="grey" density="compact">
          <v-card-text>
            <v-row dense>
              <v-col cols="3">
                Attributed to
              </v-col>
              <v-col cols="8">
                <v-chip size="small" class="text-primary" @click="() => { }">
                  Pedro Ivan Marques de Sá <v-icon icon="mdi-pencil" end />
                </v-chip>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3">
                Secretary
              </v-col>
              <v-col cols="8">
                <v-tooltip location="top">
                  <template #activator="{ props: tooltip }">
                    <v-chip v-bind="tooltip" size="small" class="text-primary" @click="transferToSecretary">
                      Secretariat of Administration and Planning <v-icon icon="mdi-pencil" end />
                    </v-chip>
                  </template>
                  <span>Transfer</span>
                </v-tooltip>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="3">
                Department
              </v-col>
              <v-col cols="8">
                <v-tooltip location="top">
                  <template #activator="{ props: tooltip }">
                    <v-chip v-bind="tooltip" size="small" class="text-primary" @click="openDialog">
                      Administration / Purchasing Department <v-icon icon="mdi-pencil" end />
                    </v-chip>
                  </template>
                  <span>Transfer</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
        <v-card class="mb-4" variant="tonal" rounded="large" color="grey">
          <v-list nav>
            <v-list-item
              color="primary" rounded="lg" title="Francisco Jonny Silva (154)"
              subtitle="jonny.silva@araripina.pe.gov.br" @click="userPopup"
            >
              <template #prepend>
                <v-avatar color="grey-lighten-1">
                  <v-icon color="white">
                    mdi-account
                  </v-icon>
                </v-avatar>
              </template>

              <template #append>
                <v-btn color="grey-lighten-1" icon="mdi-information" variant="text" />
              </template>
            </v-list-item>
            <v-list-item>
              <template #prepend>
                <v-chip size="small" class="text-primary" @click="handleManageEmployee">
                  <v-icon icon="mdi-account" start />
                  Manage Employees
                </v-chip>
              </template>

              <template #append>
                <v-chip size="small">
                  Origin: Telephone <v-icon icon="mdi-pencil" />
                </v-chip>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Edit details</v-card-title>
        <v-card-subtitle>---</v-card-subtitle>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" variant="text" @click="closeDialog">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row dense>
      <v-col cols="12">
        <v-tabs v-model="activeTab" align-tabs="start" color="warning" density="compact">
          <v-tab value="call">
            Call Content (2)
          </v-tab>
          <v-tab value="tasks">
            Tasks
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
          <v-tab-item value="call">
            <v-container>
              <v-timeline density="compact">
                <v-timeline-item
                  v-for="(item, index) in timelineItems" :key="index" :color="item.color" small
                  :dot-color="item.color"
                >
                  <v-card v-if="item.type === 'card'" variant="tonal" :color="item.color ?? 'light'" density="compact">
                    <v-card-text>
                      <p>
                        <small><b>{{ item.author }}</b> <span class="text-black">posted</span> {{ item.datecreated
                        }}
                          <span class="text-black">{{ item.status }}</span></small>
                      </p>
                      <p class="text-black">
                        <small>{{ item.message }}</small>
                      </p>
                    </v-card-text>
                  </v-card>
                  <v-alert
                    v-if="item.type === 'alert'" variant="tonal" :color="item.color ?? 'light'" density="compact"
                    icon="mdi-alert"
                  >
                    <p class="text-black">
                      <small>{{ item.message }}</small>
                    </p>
                  </v-alert>
                </v-timeline-item>
              </v-timeline>
            </v-container>
          </v-tab-item>
          <v-tab-item value="tasks">
            <v-container />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      <v-col cols="12">
        <v-tabs v-model="activeReplyTab" density="compact" color="warning">
          <v-tab value="reply">
            Post Reply
          </v-tab>
          <v-tab value="internalNote">
            Publish Internal Note
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeReplyTab">
          <v-tab-item value="reply">
            <v-form ref="replyFormData" class="pa-4">
              <v-row dense>
                <v-col cols="12">
                  <v-select
                    v-model="replyFormData.of" label="Of"
                    :items="['Secretariat of Administration and Planning']" chips outlined
                  />
                </v-col>

                <v-col cols="12">
                  <v-select
                    v-model="replyFormData.recipients" label="Recipients" :items="recipientsOptions" multiple
                    eager chips outlined
                  />
                </v-col>

                <v-col cols="12">
                  <v-select
                    v-model="replyFormData.replyTo" label="Recipients" :items="replyToOptions" eager chips
                    outlined
                  />
                </v-col>

                <v-col cols="12">
                  <v-select v-model="replyFormData.responseType" label="Response" :items="responseOptions" outlined />

                  <!-- TODO: need to add some WYSIWYG Editor for Content -->

                  <v-textarea
                    v-if="replyFormData.responseType === 'Custom'" v-model="replyFormData.responseContent"
                    label="Response Content" outlined
                  />
                </v-col>

                <v-col cols="12">
                  <v-radio-group v-model="replyFormData.signature" inline label="Signature" row outlined>
                    <v-radio label="None" value="none" />
                    <v-radio label="My Subscription" value="mySubscription" />
                    <v-radio
                      label="Department Signature (Administration and Planning Secretariat)"
                      value="departmentSignature"
                    />
                  </v-radio-group>
                </v-col>

                <v-col cols="12">
                  <v-select
                    v-model="replyFormData.callStatus" label="Call Status" :items="callStatusOptions"
                    outlined
                  />
                </v-col>

                <v-col cols="12" class="d-flex justify-end">
                  <v-btn color="primary" @click="postReply">
                    Post Reply
                  </v-btn>
                  <v-btn color="secondary" class="ml-2" @click="cancelReply">
                    Cancel
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-tab-item>

          <v-tab-item value="internalNote">
            <v-container>
              <p>Content for Publish Internal Note tab goes here...</p>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.ticket-toolbar-label {
  font-size: 12px;
  margin-bottom: 5px;
}

.ticket-toolbar-value {
  font-size: 18px;
  margin-bottom: 5px;
  color: #000000;
}
</style>
