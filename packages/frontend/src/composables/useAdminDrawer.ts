import { ref, watch } from 'vue'

export function useAdminDrawer() {
  const drawer = ref(true)
  const secondaryDrawer = ref(false)

  function toggleMenu() {
    drawer.value = !drawer.value
    if (!drawer.value) {
      secondaryDrawer.value = false
    }
  }

  watch(drawer, (newVal) => {
    if (!newVal && !secondaryDrawer.value) {
      const secondaryDrawerElement = document.querySelector('.secondary-drawer')
      if (secondaryDrawerElement) {
        (secondaryDrawerElement as HTMLElement).style.marginLeft = '-80px'
      }
    }
  })

  return {
    drawer,
    secondaryDrawer,
    toggleMenu,
  }
}
