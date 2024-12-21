import type { TUser } from '@/types/Tuser'
import { useLocalStorage } from '@vueuse/core'
import { defineStore, skipHydrate } from 'pinia'
import { computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = useLocalStorage<string | null>('auth/user', null)
  const postgrestToken = useLocalStorage<string | null>('auth/postgrestToken', null)

  const isAuthenticated = computed(() => {
    if (!user.value)
      return false
    try {
      JSON.parse(user.value)
      return true
    }
    catch {
      return false
    }
  })

  function login(userData: TUser) {
    user.value = JSON.stringify(userData)
  }

  function logout() {
    user.value = null
  }

  const parsedUser = computed(() => {
    if (!user.value)
      return null
    try {
      return JSON.parse(user.value)
    }
    catch (e) {
      console.error('Failed to parse user data from localStorage', e)
      return null
    }
  })

  async function setPostgrestToken(token: string) {
    postgrestToken.value = token
  }

  return {
    user: skipHydrate(parsedUser), // Persisted via localStorage
    isAuthenticated,
    setPostgrestToken,
    login,
    logout,
  }
})
