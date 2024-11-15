<!-- src/layouts/AdminLayout.vue -->
<script setup lang="ts">
const router = useRouter()
const drawer = ref(true)
const secondaryDrawer = ref(false)
const expandedMenu = ref<string | null>(null)

const primaryMenuItems = [
  { icon: 'mdi-home', label: 'Dashboard', route: '/dashboard', children: [] },
  {
    icon: 'mdi-server',
    label: 'Servers',
    children: [
      { title: 'My Servers', route: '/my-servers' },
      { title: 'Purchase a New Server', route: '/purchase-server' },
      { title: 'Filter', subitems: [
        { title: 'Active', count: 3 },
        { title: 'Pending', count: 0 },
        { title: 'Suspended', count: 0 },
        { title: 'Terminated', count: 0 },
      ] },
    ],
  },
  { icon: 'mdi-web', label: 'Domains', route: '/domains', children: [] },
  { icon: 'mdi-certificate', label: 'SSLs', route: '/ssls', children: [] },
  { icon: 'mdi-cash-multiple', label: 'Billing', route: '/billing', children: [] },
  { icon: 'mdi-lifebuoy', label: 'Support', route: '/support', children: [] },
]

function navigate(route: string) {
  router.push(route)
  secondaryDrawer.value = false // Fecha o segundo drawer ao navegar
}

function toggleExpandMenu(itemLabel: string) {
  if (expandedMenu.value === itemLabel) {
    expandedMenu.value = null
    secondaryDrawer.value = false
  }
  else {
    expandedMenu.value = itemLabel
    secondaryDrawer.value = true
  }
}

function toggleMenu() {
  drawer.value = !drawer.value
  if (!drawer.value) {
    secondaryDrawer.value = false
  }
}

function getMenuDescription(menuLabel) {
  const descriptions = {
    Servers: 'Gerencie seus servidores',
    Domains: 'Controle seus domínios',
    SSLs: 'Administre seus certificados SSL',
    Billing: 'Gerencie suas faturas',
    Support: 'Acesse o suporte',
  }
  return descriptions[menuLabel] || 'Descrição não disponível'
}
watch(drawer, (newVal) => {
  if (!newVal && !secondaryDrawer.value) {
    const secondaryDrawerElement = document.querySelector('.secondary-drawer')
    if (secondaryDrawerElement) {
      secondaryDrawerElement.style.marginLeft = '-80px'
    }
  }
})
</script>

<template>
  <v-app>
    <!-- Barra de Navegação Superior -->
    <v-app-bar app color="primary" density="compact" dark>
      <v-app-bar-nav-icon icon="mdi-view-dashboard" @click="toggleMenu()" />
      <v-toolbar-title>GED BPM System</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Drawer de Navegação Lateral Primário (temporário) -->
    <v-navigation-drawer
      v-model="drawer"
      app
      width="56"
    >
      <v-list dense nav>
        <v-list-item
          v-for="item in primaryMenuItems"
          :key="item.label"
          :value="item.label"
          @click="item.children.length ? toggleExpandMenu(item.label) : navigate(item.route)"
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
            v-for="child in primaryMenuItems.find(item => item.label === expandedMenu)?.children"
            :key="child.title"
            @click="navigate(child.route)"
          >
            <v-btn block text>
              {{ child.title }}
            </v-btn>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <!-- Conteúdo Principal -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Rodapé Opcional -->
    <v-footer app>
      <v-spacer />
      <span>GED BPM System © 2024</span>
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
