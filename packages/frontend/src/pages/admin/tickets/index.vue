<script lang="ts" setup>
import type { Ticket } from '@prisma/client'
import TicketService from '@/services/TicketService'
import { mergeProps, onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useDisplay } from 'vuetify'

const headers = ref([
  { title: '', value: 'reply', sortable: false, width: '20px' },
  { title: '#', value: 'id', sortable: true },
  { title: 'Last update', value: 'updatedAt', sortable: true },
  { title: 'Subject', value: 'subject', sortable: true },
  { title: 'Created by', value: 'createdBy.name', sortable: true },
  { title: 'Priority', value: 'priority.name', sortable: true },
  { title: 'Status', value: 'status.name', sortable: true },
  { title: 'Actions', value: 'actions', sortable: false },
])
const page = ref(1)
const itemsPerPage = ref(10)
const showActionDialog = ref(false)
const selectedItem = ref(null)

function showActions(item: any) {
  selectedItem.value = item
  showActionDialog.value = true
}

const filteredItems = computed(() => {
  return items.value.filter(item =>
    JSON.stringify(item).toLowerCase().includes(search.value.toLowerCase()),
  )
})

const items = ref<Ticket[]>([])
const search = ref('')
const loading = ref(false)
const selectedItems = ref<string[]>([])
const sortBy = ref('updatedAt')
const sortDesc = ref(true)

const ticketService = new TicketService()
const { mobile } = useDisplay()

async function loadTickets() {
  try {
    loading.value = true
    items.value = await ticketService.getAllTickets()
  }
  catch (error: any) {
    toast.error(`Error loading tickets: ${error.message}`)
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  loadTickets()
})

async function deleteItem(item: Ticket) {
  try {
    await ticketService.softDelete(item.id)
    toast.success('Ticket deleted successfully')
    await loadTickets()
  }
  catch (error: any) {
    toast.error(`Error deleting ticket: ${error.message}`)
  }
}

function deleteSelected() {
  console.warn('Delete selected items')
}

function editSelected() {
  console.warn('Edit selected items')
}

function handleTransfer(item: any) {
  console.warn('Handle Transfer:', item)
}

function handleSwitchOff(item: any) {
  console.warn('Handle Switch Off:', item)
}

function onFlagChange(item: any) {
  console.warn('On Flag change', item)
}

function assignTo(event: any) {
  console.warn('Assign to :', event)
}

function getSortedItems() {
  return [...items.value].sort((a, b) => {
    const aValue = a[sortBy.value]
    const bValue = b[sortBy.value]
    return sortDesc.value ? bValue?.localeCompare(aValue) : aValue?.localeCompare(bValue)
  })
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- Toolbar -->
        <v-card>
          <v-toolbar flat color="primary" density="compact">
            <v-toolbar-title>Tickets</v-toolbar-title>
            <v-spacer />

            <!-- Existing toolbar buttons -->
            <template v-if="!mobile">
              <v-menu>
                <template #activator="{ props: menu }">
                  <v-tooltip location="top">
                    <template #activator="{ props: tooltip }">
                      <v-btn color="info" icon="mdi-flag" v-bind="mergeProps(menu, tooltip)" />
                    </template>
                    <span>Change Status</span>
                  </v-tooltip>
                </template>
                <v-list>
                  <v-list-item
                    v-for="status in ['Open', 'Waiting for authorization', 'Solved', 'Closed']" :key="status"
                    @click="onFlagChange"
                  >
                    <v-list-item-title>{{ status }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-menu>
                <template #activator="{ props: menu }">
                  <v-tooltip location="top">
                    <template #activator="{ props: tooltip }">
                      <v-btn color="info" icon="mdi-account" v-bind="mergeProps(menu, tooltip)" />
                    </template>
                    <span>Assign</span>
                  </v-tooltip>
                </template>
                <v-list>
                  <v-list-item v-for="action in ['Claim', 'Agent', 'Team']" :key="action" @click="assignTo">
                    <v-list-item-title>{{ action }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-tooltip location="top">
                <template #activator="{ props: tooltip }">
                  <v-btn color="warning" icon="mdi-transfer" v-bind="tooltip" @click="handleTransfer" />
                </template>
                <span>Transfer</span>
              </v-tooltip>

              <v-tooltip location="top">
                <template #activator="{ props: tooltip }">
                  <v-btn color="secondary" icon="mdi-power" v-bind="tooltip" @click="handleSwitchOff" />
                </template>
                <span>To Switch off</span>
              </v-tooltip>

              <v-menu>
                <template #activator="{ props: menu }">
                  <v-btn color="info" icon="mdi-sort" v-bind="menu" />
                </template>
                <v-list>
                  <v-list-item
                    v-for="criteria in ['Priority', 'Due Date', 'Created', 'Updated']"
                    :key="criteria"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ criteria }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <!-- Search Box -->
              <v-text-field
                v-model="search" placeholder="Search..." clearable dense hide-details
                style="max-width: 200px;"
              />

              <v-btn color="error" icon="mdi-delete" @click="deleteSelected" />
              <v-btn color="primary" icon="mdi-pencil" @click="editSelected" />
              <v-btn color="success" variant="elevated" to="/admin/tickets/create-ticket" icon="mdi-plus" />
            </template>
            <v-menu v-else>
              <template #activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props" />
              </template>
              <v-list>
                <v-list-item prepend-icon="mdi-flag" @click="onFlagChange">
                  Change Status
                </v-list-item>
                <v-list-item prepend-icon="mdi-account" @click="assignTo">
                  Assign
                </v-list-item>
                <v-list-item prepend-icon="mdi-transfer" @click="handleTransfer">
                  Transfer
                </v-list-item>
                <v-list-item prepend-icon="mdi-power" @click="handleSwitchOff">
                  Switch Off
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>

          <!-- Search and Sort -->
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  label="Search..."
                  single-line
                  hide-details
                  density="compact"
                />
              </v-col>
              <v-col cols="12" sm="6" class="text-end">
                <v-btn-group density="comfortable">
                  <v-btn
                    :prepend-icon="sortDesc ? 'mdi-sort-descending' : 'mdi-sort-ascending'"
                    @click="sortDesc = !sortDesc"
                  >
                    {{ sortBy }}
                  </v-btn>
                </v-btn-group>
              </v-col>
            </v-row>
          </v-card-text>

          <!-- Desktop View -->
          <template v-if="!mobile">
            <v-table fixed-header height="500px">
              <thead>
                <tr>
                  <th v-for="header in headers" :key="header.value" class="text-left">
                    {{ header.title }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in getSortedItems()" :key="item.id" @click="$router.push(`/admin/tickets/details/${item.id}`)">
                  <td>
                    <v-checkbox-btn v-model="selectedItems" :value="item.id" @click.stop />
                  </td>
                  <td>
                    <v-chip color="primary" size="small">
                      {{ item.id.substring(0, 8) }}
                    </v-chip>
                  </td>
                  <td>{{ new Date(item.updatedAt || item.createdAt).toLocaleString() }}</td>
                  <td>{{ item.subject }}</td>
                  <td>{{ item.createdBy?.name }}</td>
                  <td>
                    <v-chip
                      :color="item.priority?.name === 'Urgente' ? 'error' : 'primary'"
                      size="small"
                    >
                      {{ item.priority?.name }}
                    </v-chip>
                  </td>
                  <td>{{ item.status?.name }}</td>
                  <td>
                    <v-btn icon="mdi-pencil" variant="text" size="small" color="primary" @click.stop="$router.push(`/admin/tickets/edit/${item.id}`)" />
                    <v-btn icon="mdi-delete" variant="text" size="small" color="error" @click.stop="deleteItem(item)" />
                  </td>
                </tr>
              </tbody>
            </v-table>
          </template>

          <!-- Mobile View -->
          <template v-else>
            <v-list>
              <v-list-item
                v-for="item in getSortedItems()"
                :key="item.id"
                :value="item"
                @click="$router.push(`/admin/tickets/details/${item.id}`)"
              >
                <template #prepend>
                  <v-checkbox-btn v-model="selectedItems" :value="item.id" @click.stop />
                </template>

                <v-list-item-title class="d-flex align-center">
                  <v-chip color="primary" size="small" class="me-2">
                    {{ item.id.substring(0, 8) }}
                  </v-chip>
                  {{ item.subject }}
                </v-list-item-title>

                <v-list-item-subtitle>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-icon size="small" class="me-1">
                        mdi-account
                      </v-icon>
                      {{ item.createdBy?.name }}
                    </v-col>
                    <v-col cols="12" class="d-flex align-center mt-1">
                      <v-chip
                        :color="item.priority?.name === 'Urgente' ? 'error' : 'primary'"
                        size="x-small"
                        class="me-2"
                      >
                        {{ item.priority?.name }}
                      </v-chip>
                      <span class="text-caption">
                        {{ new Date(item.updatedAt || item.createdAt).toLocaleString() }}
                      </span>
                    </v-col>
                  </v-row>
                </v-list-item-subtitle>

                <template #append>
                  <v-btn icon="mdi-dots-vertical" variant="text" @click.stop="showActions(item)" />
                </template>
              </v-list-item>
            </v-list>
          </template>

          <!-- Pagination -->
          <v-card-actions>
            <v-spacer />
            <v-pagination
              v-model="page"
              :length="Math.ceil(filteredItems.length / itemsPerPage)"
              :total-visible="mobile ? 3 : 7"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Mobile Action Dialog -->
    <v-dialog v-model="showActionDialog" max-width="300">
      <v-card>
        <v-card-title>Actions</v-card-title>
        <v-list>
          <v-list-item prepend-icon="mdi-pencil" @click="editItem">
            Edit
          </v-list-item>
          <v-list-item prepend-icon="mdi-delete" color="error" @click="deleteItem">
            Delete
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.v-table {
  cursor: pointer;
}
.v-table tr:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
}
.v-list-item {
  cursor: pointer;
}
</style>
