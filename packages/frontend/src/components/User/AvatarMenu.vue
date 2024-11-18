<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const user = ref({
  fullName: 'John Doe',
  email: 'hermes@ja.com',
  initials: 'HA',
})

const drawer = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  drawer.value = newValue
})

watch(drawer, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :absolute="true"
    temporary
    location="right"
    :mobile="true"
    class="user-drawer"
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
      :title="user.fullName"
    />

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home" />
      <v-list-item prepend-icon="mdi-forum" title="About" value="about" />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.user-drawer {
  z-index: 2000; /* Ajuste o valor conforme necessário */
}
</style>
