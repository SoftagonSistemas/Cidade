import type { User as UserLocal } from '@prisma/client'
import { useLocalStorage } from '@vueuse/core'
import { defineStore, skipHydrate } from 'pinia'
import { computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = useLocalStorage<string | null>('auth/user', null)
  const postgrestToken = useLocalStorage<string | null>('auth/postgrestToken', null)
  const organization = useLocalStorage<string | null>('auth/organization', null)

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

  const parsedOrganization = computed(() => {
    if (!organization.value)
      return null
    try {
      return JSON.parse(organization.value)
    }
    catch (e) {
      console.error('Failed to parse organization data from localStorage', e)
      return null
    }
  })

  // Methods
  function login(userData: UserLocal) {
    user.value = JSON.stringify(userData)
  }

  function logout() {
    user.value = null
    organization.value = null
    postgrestToken.value = null
  }

  async function setPostgrestToken(token: string) {
    postgrestToken.value = token
  }

  function getPostgrestToken(): string | null {
    return postgrestToken.value
  }

  function setOrganization(org: Record<string, any>) {
    organization.value = JSON.stringify(org)
  }

  return {
    // Exposing parsed/computed values
    user: skipHydrate(parsedUser),
    organization: skipHydrate(parsedOrganization),
    isAuthenticated,

    // Exposing methods
    setPostgrestToken,
    getPostgrestToken,
    setOrganization,
    login,
    logout,
  }
})
