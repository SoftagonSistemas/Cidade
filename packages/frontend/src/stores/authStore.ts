// @stores/authStore.ts
import { defineStore } from 'pinia'

const apiUrl = import.meta.env.VITE_BACK3ND_URL
function isTokenExpired(token: string): boolean {
  try {
    const tokenPart = token.split('.')[1]
    const payload = JSON.parse(atob(tokenPart))
    return Date.now() >= payload.exp * 1000
  }
  catch (error) {
    console.error('Error decoding token:', error)
    return true
  }
}

async function setTokenStorage(token: string | null) {
  if (token) {
    localStorage.setItem('auth_token', token)
  }
  else {
    localStorage.removeItem('auth_token')
  }
}

interface User {
  id: number
  name: string
  email: string
}

interface AuthState {
  token: string | null
  user: User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('auth_token') || null,
    user: null,
  }),

  actions: {
    async initializeAuthState(): Promise<void> {
      if (this.token && !isTokenExpired(this.token)) {
        try {
          this.user = await this.fetchUserData()
        }
        catch (error) {
          console.error('Error fetching user data:', error)
          this.logout()
        }
      }
      else {
        this.logout()
      }
    },

    async login(email: string, password: string): Promise<User | null> {
      try {
        const response = await fetch(`${apiUrl}auth/login`, {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok)
          throw new Error(`Login failed! status: ${response.status}`)

        const data = await response.json()
        if (!data.token)
          throw new Error('Token is missing in the response')

        await this.setToken(data.token)
        this.user = await this.fetchUserData()
        return this.user
      }
      catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },

    async fetchUserData(): Promise<User> {
      try {
        const response = await fetch(`${apiUrl}me`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        if (!response.ok)
          throw new Error(`Failed to fetch user data: ${response.status}`)

        return await response.json() as User
      }
      catch (error) {
        console.error('Fetching user data failed:', error)
        throw error
      }
    },

    logout(): void {
      this.clearAuthData()
    },

    async setToken(token: string): Promise<void> {
      this.token = token
      await setTokenStorage(token)
    },

    async clearAuthData(): Promise<void> {
      this.token = null
      this.user = null
      await setTokenStorage(null)
    },

    isTokenExpired(token: string): boolean {
      return isTokenExpired(token)
    },
  },
})
