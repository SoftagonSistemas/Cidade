<!-- src/layouts/AdminLayout.vue -->
<script setup lang="ts">
import type { MenuItem } from '../composables/useAdminMenu'
import { useAdminDrawer } from '@/composables/useAdminDrawer'
import { ref } from 'vue'
import { useAdminMenu } from '../composables/useAdminMenu'

const { drawer, secondaryDrawer, toggleMenu } = useAdminDrawer()
const { primaryMenuItems, expandedMenu, navigate, toggleExpandMenu, getMenuDescription } = useAdminMenu(secondaryDrawer)
const avatarDrawerOpen = ref(false)
const notificationDrawerOpen = ref(false)
</script>

<template>
  <v-app>
    <!-- Barra de Navegação Superior -->
    <v-app-bar app color="primary" density="compact" elevation="0">
      <v-app-bar-nav-icon icon="mdi-view-dashboard" @click="toggleMenu()" />
      <v-toolbar-title>GED BPM System</v-toolbar-title>
      <v-spacer />

      <v-btn icon @click="notificationDrawerOpen = !notificationDrawerOpen">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn color="secondary" icon @click="avatarDrawerOpen = !avatarDrawerOpen">
        <v-icon>mdi-account-tie</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Drawer de Navegação Lateral Primário (temporário) -->
    <v-navigation-drawer v-model="drawer" app width="56">
      <v-list dense nav>
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
        <div class="menu-header">
          <h3>{{ expandedMenu }}</h3>
          <p>{{ getMenuDescription(expandedMenu) }}</p>
        </div>

        <!-- Botões das opções do menu secundário -->
        <v-list dense nav>
          <v-list-item
            v-for="child in primaryMenuItems.find((item: MenuItem) => item.label === expandedMenu)?.children"
            :key="child.title"
            @click="child.route && navigate(child.route)"
          >
            <v-btn block>
              {{ child.title }}
            </v-btn>
          </v-list-item>
        </v-list>
      </template>
      <div>
        <p>Expanded Menu: {{ expandedMenu }}</p>
        <p>Secondary Drawer: {{ secondaryDrawer }}</p>
      </div>
    </v-navigation-drawer>

    <!-- Conteúdo Principal -->
    <v-main>
      <AvatarMenu :model-value="avatarDrawerOpen" />
      <NotificationMenu :model-value="notificationDrawerOpen" />
      <router-view />
    </v-main>

    <!-- Rodapé Opcional -->
    <v-footer app>
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
</style>
