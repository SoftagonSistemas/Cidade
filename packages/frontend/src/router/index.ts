/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

import AdminLayout from '@/layouts/AdminLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { AuthService } from '@/services/AuthService'
import { useAuthStore } from '@/stores/AuthStore'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

// Mapeamento de layouts disponíveis

const layoutMap: { [key: string]: Component } = {
  Default: DefaultLayout,
  AdminLayout,
}
const routeLayoutMap: Record<string, string> = {
  '/admin': 'AdminLayout',
}
/**
 * Get layout name based on the route path.
 *
 * @param path - Route path
 * @returns Layout name
 */
function getLayoutName(path: string): string {
  const matchedPrefix = Object.keys(routeLayoutMap).find(prefix =>
    path.startsWith(prefix),
  )
  return matchedPrefix ? routeLayoutMap[matchedPrefix] : 'Default'
}

/**
 * Inject layout into routes based on the configuration and meta.layout property.
 *
 * @param routes - Array of route records
 * @returns Routes with injected layouts
 */
function injectLayout(routes: RouteRecordRaw[]) {
  return routes.map((route) => {
    const layoutName = String(route.meta?.layout || getLayoutName(route.path))
    const layout = layoutMap[layoutName]
    if (!layoutMap[layoutName]) {
      console.warn(`Layout "${layoutName}" not found. Using DefaultLayout.`)
    }

    const childRoute = {
      ...route,
      path: '', // Preserva o mesmo path
      name: `${String(route.name) || route.path}-child`,
      component: route.component || null,
    }

    return {
      ...route,
      component: layout,
      children: [childRoute],
    } as RouteRecordRaw
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: injectLayout(routes),
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.warn('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
    else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  }
  else {
    console.error(err)
  }
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const authService = new AuthService()
  await authService.getSession()

  if (to.path.startsWith('/admin')) {
    if (!authStore.isAuthenticated) {
      next('/auth')
    }
    else if (!authStore.organization) {
      next('/auth/organization')
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
