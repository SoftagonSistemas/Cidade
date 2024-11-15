<!-- src/layouts/AdminLayout.vue -->
<script setup lang="ts">
import type { MenuItem } from '../composables/useAdminMenu'
import { useAdminDrawer } from '@/composables/useAdminDrawer'
import { useDisplay } from 'vuetify'
import { useAdminMenu } from '../composables/useAdminMenu'

const { mobile } = useDisplay()

const { drawer, secondaryDrawer, toggleMenu } = useAdminDrawer()
const { primaryMenuItems, expandedMenu, navigate, toggleExpandMenu, getMenuDescription } = useAdminMenu(secondaryDrawer)
const avatarDrawerOpen = ref(false)
const notificationDrawerOpen = ref(false)

const adminMenuItem = {
  icon: 'mdi-cog',
  label: 'Administração',
  children: [
    { title: 'Gerenciamento de Usuários e Secretarias', route: '/admin/administracao/GerenciamentoUsuarios' },
    { title: 'Configurações do Sistema', route: '/admin/administracao/ConfiguracoesSistema' },
  ],
}
</script>

<template>
  <v-app>
    <!-- Barra de Navegação Superior -->
    <v-app-bar app color="primary" density="compact" elevation="0">
      <v-app-bar-nav-icon icon="mdi-view-dashboard" @click="toggleMenu()" />
      <v-toolbar-title>CidadeTransparente</v-toolbar-title>
      <v-spacer />

      <v-btn size="small" icon @click="notificationDrawerOpen = !notificationDrawerOpen">
        <v-icon color="on-primary">
          mdi-bell
        </v-icon>
      </v-btn>
      <v-btn size="small" variant="tonal" class="ml-2 mr-2" icon @click="avatarDrawerOpen = !avatarDrawerOpen">
        <v-icon color="on-primary">
          mdi-account-tie
        </v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Drawer de Navegação Lateral Primário -->
    <v-navigation-drawer v-model="drawer" app width="56">
      <v-list dense nav class="d-flex flex-column" style="height: 100%;">
        <!-- Ícones do Menu Principal -->
        <div>
          <v-list-item
            v-for="item in primaryMenuItems"
            :key="item.label"
            :value="item.label"
            @click="item.children.length ? toggleExpandMenu(item.label) : item.route && navigate(item.route)"
          >
            <template #prepend>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title v-if="drawer">
              {{ item.label }}
            </v-list-item-title>
          </v-list-item>
        </div>

        <!-- Ícone de Configurações no Rodapé -->
        <v-list-item
          class="mt-auto"
          @click="toggleExpandMenu(adminMenuItem.label)"
        >
          <template #prepend>
            <v-icon>{{ adminMenuItem.icon }}</v-icon>
          </template>
          <v-list-item-title v-if="drawer">
            {{ adminMenuItem.label }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Segundo Drawer Lateral (Submenus) com título, descrição e botões -->
    <v-navigation-drawer
      v-model="secondaryDrawer"
      app
      :right="true"
      temporary
      width="230"
      style="position: fixed; left: 56px; height: 100%;"
      :class="{ 'secondary-drawer': drawer, 'secondary-drawer-closed': !secondaryDrawer }"
    >
      <template v-if="expandedMenu">
        <!-- Título e descrição do grupo de menu -->
        <div class="pa-3">
          <v-list-subheader color="secondary">
            {{ expandedMenu }}
          </v-list-subheader>
          <p class="description">
            {{ getMenuDescription(expandedMenu) }}
          </p>
        </div>
        <!-- Lista de itens do menu secundário -->
        <v-list dense nav>
          <v-list-item
            v-for="child in (expandedMenu === adminMenuItem.label ? adminMenuItem.children : primaryMenuItems.find((item: MenuItem) => item.label === expandedMenu)?.children)"
            :key="child.title"
            rounded="rounded"
            variant="tonal"
            density="compact"
            @click="child.route && navigate(child.route)"
          >
            <template #prepend>
              <v-icon icon="mdi-circle-outline" class="mr-n6" />
            </template>
            <v-list-item-title>{{ child.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <!-- Conteúdo Principal -->
    <v-main>
      <AvatarMenu :model-value="avatarDrawerOpen" />
      <NotificationMenu :model-value="notificationDrawerOpen" />
      <v-container
        class="d-flex justify-center align-center "
        style="height: 100%"
      >
        <v-sheet
          elevation="0"
          style="height: 100%; width: 100%;"
          class="pl-8 pt-4 pr-4 pb-4"
        >
          <router-view />
        </v-sheet>
      </v-container>
    </v-main>

    <!-- Rodapé Opcional -->
    <v-footer v-if="!mobile" app>
      <v-spacer />
      <span>Softagon Sistemas © 2025</span>
    </v-footer>
  </v-app>
</template>

<style scoped>
.v-main {
  background-color: #f5f5f5;
}

.secondary-drawer {
  transition: margin-left 0.3s ease;
  position: absolute;
  left: calc(56px + 1rem); /* Ajuste conforme necessário */
}

.secondary-drawer-closed {
  transition: margin-left 0.3s ease;
  left: 56px; /* Ajuste conforme necessário */
}

/* Remover estilos não utilizados */
.menu-header {
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
}

.menu-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
  color: #2196f3;
}

.menu-header p {
  margin: 4px 0 0;
  color: #757575;
  font-size: 0.875rem;
}

.v-app {
  height: 100vh; /* Garante que o v-app ocupe a altura total da viewport */
  overflow: hidden; /* Evita overflow do v-app */
}

.v-main {
  height: calc(100vh - 64px); /* Ajusta a altura, subtraindo a altura do app-bar */
  overflow-y: auto; /* Permite scroll interno no conteúdo principal, se necessário */
  background-color: #f5f5f5;
}
</style>
