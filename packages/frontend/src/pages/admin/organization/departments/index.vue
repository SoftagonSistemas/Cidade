<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :items="departments"
          item-value="topic"
          show-select
          class="elevation-1"
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>Manage Departments</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="error" icon="mdi-delete" @click="deleteSelected">
              </v-btn>
              <v-btn color="primary" icon="mdi-pencil" @click="editSelected"></v-btn>
              <v-btn color="success" variant="elevated"to="/admin/organization/departments/CreateDepartment">
                Create new
              </v-btn>
            </v-toolbar>
          </template>

          <template #item.status="{ item }">
            <v-chip :color="item.status == 'Active' ? 'success' : 'primary'" dark>
              {{ item.status }}
            </v-chip>
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

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Topic", value: "topic" },
        { text: "Type", value: "type" },
        { text: "Status", value: "status" },
        { text: "Parent Topic", value: "parentTopic" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      departments: [
        {
          topic: "Public Works",
          status: "Active",
          type: "Public",
          parentTopic: "Infrastructure",
          internalNote: "Ongoing maintenance projects.",
        },
        {
          topic: "Health and Sanitation",
          status: "Active",
          type: "Public",
          parentTopic: "Public Services",
          internalNote: "Vaccination drive completed.",
        },
        {
          topic: "Parks and Recreation",
          status: "Inactive",
          type: "Public",
          parentTopic: "Community",
          internalNote: "Seasonal maintenance scheduled.",
        },
        {
          topic: "City Planning",
          status: "Active",
          type: "Private",
          parentTopic: "Urban Development",
          internalNote: "New zoning laws under review.",
        },
        {
          topic: "Transportation",
          status: "Active",
          type: "Public",
          parentTopic: "Infrastructure",
          internalNote: "Traffic optimization in progress.",
        },
      ]
    };
  },
  methods: {
    deleteItem(item) {
      this.departments = this.departments.filter((d) => d.topic !== item.topic);
    },
    editItem(item) {
      console.log("Edit item:", item);
    },
    deleteSelected() {
      this.departments = this.departments.filter(
        (d) => !this.selectedItems.includes(d.topic)
      );
      this.selectedItems = [];
    },
    editSelected() {
      console.log("Edit selected items:", this.selectedItems);
    },
  },
};
</script>

<style scoped>

</style>
