import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getMenuDescription, primaryMenuItems } from '../data/menuItems'

export interface MenuItem {
  icon: string
  label: string
  route?: string
  children: MenuChildItem[]
}

export interface MenuChildItem {
  title: string
  route?: string
  subitems?: MenuSubItem[]
}

export interface MenuSubItem {
  title: string
  count: number
}

export function useAdminMenu(secondaryDrawer: { value: boolean }) {
  const router = useRouter()
  const expandedMenu = ref<string | null>(null)

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

  return {
    primaryMenuItems,
    expandedMenu,
    navigate,
    toggleExpandMenu,
    getMenuDescription,
  }
}
