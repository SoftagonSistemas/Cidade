<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const drawer = ref(props.modelValue)

const notifications = ref([
  {
    title: 'Novo comentário',
    subtitle: 'João comentou em sua postagem.',
    icon: 'mdi-comment',
  },
  {
    title: 'Atualização disponível',
    subtitle: 'Uma nova versão do sistema está pronta.',
    icon: 'mdi-update',
  },
  {
    title: 'Tarefa concluída',
    subtitle: 'Maria concluiu a tarefa atribuída.',
    icon: 'mdi-check-circle',
  },
])

function markAsRead(index: any) {
  notifications.value.splice(index, 1)
}

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
    absolute
    temporary
    location="right"
    :mobile="true"
    class="user-drawer"
  >
    <v-list>
      <v-list-subheader>Notificações</v-list-subheader>
      <v-divider />
      <v-list-item
        v-for="(notification, index) in notifications"
        :key="index"
        :value="index"
        lines="two"
        @click="markAsRead(index)"
      >
        <template #prepend>
          <v-avatar color="primary">
            <v-icon>{{ notification.icon }}</v-icon>
          </v-avatar>
        </template>
        <v-list-item-title>{{ notification.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ notification.subtitle }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.user-drawer {
  z-index: 2000; /* Ajuste o valor conforme necessário */
}
</style>
