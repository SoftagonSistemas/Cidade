<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table :items="items" :search="search"
        item-value="id"
        show-select class="elevation-1"
        pagination
        :headers="headers"
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>Tickets</v-toolbar-title>
              <v-spacer></v-spacer>


              <v-menu>
                <template #activator="{ props: menu }">
                  <v-tooltip location="top">
                    <template v-slot:activator="{ props: tooltip }">
                      <v-btn color="info" icon="mdi-flag" v-bind="mergeProps(menu, tooltip)"></v-btn>
                    </template>
                    <span>Change Status</span>
                  </v-tooltip>
                </template>
                <v-list>
                  <v-list-item v-for="status in ['Open', 'Waiting for authorization', 'Solved', 'Closed']" :key="status"
                    @click="onFlagChange">
                    <v-list-item-title>{{ status }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-menu>
                <template #activator="{ props: menu }">

                  <v-tooltip location="top">
                    <template v-slot:activator="{ props: tooltip }">
                      <v-btn color="info" icon="mdi-account" v-bind="mergeProps(menu, tooltip)"></v-btn>
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
                <template v-slot:activator="{ props: tooltip }">
                  <v-btn color="warning" icon="mdi-transfer" v-bind="tooltip" @click="handleTransfer"></v-btn>
                </template>
                <span>Transfer</span>
              </v-tooltip>

              <v-tooltip location="top">
                <template v-slot:activator="{ props: tooltip }">
                  <v-btn color="secondary" icon="mdi-power" v-bind="tooltip" @click="handleSwitchOff"></v-btn>
                </template>
                <span>To Switch off</span>
              </v-tooltip>

              <v-menu>
                <template #activator="{ props: menu }">
                <v-btn color="info" icon="mdi-sort" slot="activator" v-bind="menu"></v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="criteria in ['Priority', 'Due Date', 'Created', 'Updated']"
                   :key="criteria"
                   @click="()=>{}">
                    <v-list-item-title>{{ criteria }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <!-- Search Box -->
              <v-text-field v-model="search" placeholder="Search..." clearable dense hide-details
                style="max-width: 200px;"></v-text-field>

              <v-btn color="error" icon="mdi-delete" @click="deleteSelected">
              </v-btn>
              <v-btn color="primary" icon="mdi-pencil" @click="editSelected"></v-btn>
              <v-btn color="success" variant="elevated" to="/admin/tickets/create-ticket" icon="mdi-plus"></v-btn>
            </v-toolbar>
          </template>
          <template #item.reply="{ item }">
            <v-btn v-if="item.reply == true" color="success" icon="mdi-reply" size="xs" variant="text"></v-btn>
          </template>
          <template #item.ticket="{ item }">
            <v-chip color="primary" size="small" to="/admin/tickets/ticket-details">{{item.ticket}}</v-chip>
          </template>
          <template #item.priority="{ item }">
            <v-chip :color="item.priority === 'Emergency' ? 'error' : 'primary'" dark size="small">
              {{ item.priority }}
            </v-chip>
          </template>

          <template #item.actions="{ item }">
            <v-btn size="small" icon="mdi-pencil" variant="text" color="primary" @click="editItem(item)"></v-btn>
            <v-btn size="small" icon="mdi-delete" variant="text"  color="error" @click="deleteItem(item)"></v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { mergeProps, ref } from 'vue';

const headers = ref([
  { title: '', value: 'reply', sortable: false, width: '20px'  },
  { title: '#', value: 'ticket', sortable: true },
  { title: 'Last update', value: 'lastUpdate', sortable: true },
  { title: 'Subject', value: 'subject', sortable: true },
  { title: 'Of', value: 'user', sortable: true },
  { title: 'Priority', value: 'priority', sortable: true },
  { title: 'Actions', value: 'actions', sortable: false },
]);

const items = ref([
  {
    // id: 1,
    // selected: false,
    ticket: 'PMA-278974',
    lastUpdate: '11/26/2024 10:47 AM',
    subject: 'Request',
    user: 'Francisco Jonny Silva',
    priority: 'Emergency',
    assignedTo: 'Pedro Ivan Marques de Sá',
    reply: false
  },
  {
    // id: 1,
    // selected: false,
    ticket: 'PMA-278975',
    lastUpdate: '11/26/2024 10:47 AM',
    subject: 'Request',
    user: 'Francisco Jonny Silva',
    priority: 'High',
    assignedTo: 'Pedro Ivan Marques de Sá',
    reply: true
  },
  // Additional rows...
]);

const search = ref('');

const deleteSelected = () => {
  console.log('Delete selected items');
};

const editSelected = () => {
  console.log('Edit selected items');
};

const editItem = (item: any) => {
  console.log('Edit item', item);
};

const deleteItem = (item: any) => {
  console.log('Delete item', item);
};

const handleTransfer = (item: any) =>{
  console.log('Handle Transfer:', item);
}

const handleSwitchOff = (item: any) => {
  console.log('Handle Switch Off:', item);
}

const onFlagChange = (item: any) => {
  console.log("On Flag change", item);
}

const assignTo = (event: any) =>{
  console.log("Assign to :", event);
}
</script>

<style scoped>
.elevation-1 {
  border-radius: 8px;
}
.v-table{
  font-size: 14px;
}
</style>
