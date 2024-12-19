<script setup lang="ts">
import type { Ref } from 'vue'
import type { SLAItem } from '../../../data/models'
import { ref } from 'vue'
import { useDate } from 'vuetify'

const date = useDate()

const slaList: Ref<SLAItem[]> = ref([
  {
    name: 'Maximum 72 hours',
    status: 'Active',
    gracePeriodHrs: 72,
    dateCreated: new Date(),
    dateUpdated: new Date(),
  },
  {
    name: 'Solve in a month',
    status: 'Active',
    gracePeriodHrs: 720,
    dateCreated: new Date(),
    dateUpdated: new Date(),
  },
])
const selectedItems: Ref<string[]> = ref([])
function deleteItem(item: any) {
  slaList.value = slaList.value.filter(
    (d: any) => d.topic !== item.topic,
  )
}
function editItem(item: any) {
  console.log('Edit item:', item)
}
function deleteSelected() {
  slaList.value = slaList.value.filter(
    (d: SLAItem) => !selectedItems.value.includes(d.name),
  )
  selectedItems.value = []
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table :items="slaList" item-value="name" show-select class="elevation-1">
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>
                <h5>Service Level Agreement (SLA)</h5>
              </v-toolbar-title>
              <v-spacer />
              <v-btn v-if="selectedItems.length > 0" color="error" icon="mdi-delete" @click="deleteSelected" />
              <v-btn color="success" variant="elevated" to="/admin/tickets/sla-config-add">
                Create SLA plan
              </v-btn>
              <v-menu>
                <template #activator="{ props }">
                  <v-btn v-bind="props" color="primary" variant="text">
                    More
                    <v-icon end>
                      mdi-chevron-down
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="">
                    <v-list-item-title>Enabled</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="">
                    <v-list-item-title>Disable</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="">
                    <v-list-item-title>Switch Off</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </template>

          <template #item.status="{ item }">
            <v-chip :color="item.status == 'Active' ? 'success' : 'primary'" dark>
              {{ item.status }}
            </v-chip>
          </template>
          <template #item.dateCreated="{ item }">
            {{ date.format(item.dateCreated, "fullDate") }}
          </template>
          <template #item.dateUpdated="{ item }">
            {{ date.format(item.dateUpdated, "fullDate") }}
          </template>

          <template #item.actions="{ item }">
            <v-btn icon color="primary" @click="editItem(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="error" @click="deleteItem(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/** **/
</style>
