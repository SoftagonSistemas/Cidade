import type { ClientOptions, User } from 'better-auth/types'
import { organizationClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/vue'

/**
 * Authentication Service class for managing authentication requests.
 */
export class AuthService {
  public client: any

  constructor() {
    const AUTH_API = `${import.meta.env.VITE_BACK3ND_URL}/auth`
    this.client = createAuthClient<ClientOptions>({
      baseURL: AUTH_API,
      plugins: [
        organizationClient(),
      ],
    })
  }

  /**
   * Logs in a user with the provided credentials.
   * @param email User's email
   * @param password User's password
   * @returns A promise resolving to the user's session.
   */
  async login(email: string, password: string): Promise<User> {
    try {
      const { data } = await this.client.signIn.email({
        email,
        password,
      })
      if (!data) {
        throw new Error('Login failed: No data returned')
      }
      return data.user as User
    }
    catch (error) {
      throw new Error(`Login failed: ${(error as Error).message}`)
    }
  }

  /**
   * Logs out the current user.
   * @returns A promise resolving when the user is logged out.
   */
  async logout(): Promise<void> {
    try {
      await this.client.signOut()
    }
    catch (error) {
      throw new Error(`Logout failed: ${(error as Error).message}`)
    }
  }

  /**
   * Registers a new user.
   * @param email User's email
   * @param password User's password
   * @param name Full name.
   * @param image Profile picture.
   * @returns A promise resolving to the created user.
   */
  async register(
    email: string,
    password: string,
    name: string,
    image?: string | null,
  ) {
    const response = await this.client.signUp.email({
      email,
      password,
      name,
      image: image ?? undefined,
    })
    if (response.data) {
      return response.data as User
    }
    else {
      console.error(`Registration failed: ${response.error.message}`)
      return response.error
    }
  }

  /**
   * Fetches the current authenticated user's data.
   * @returns A promise resolving to the user's session.
   */
  async getCurrentUser() {
    try {
      const session = await this.client.getSession()
      return session
    }
    catch (error) {
      throw new Error(`Failed to fetch user: ${(error as Error).message}`)
    }
  }

  /**
   * Retrieves the current session.
   * @returns A promise resolving to the current session.
   */
  async getSession() {
    try {
      const session = await this.client.getSession()
      return session
    }
    catch (error) {
      throw new Error(`Failed to retrieve session: ${(error as Error).message}`)
    }
  }

  /**
   * Sends a password reset email to the user.
   * @param email User's email
   * @returns A promise resolving when the email is sent.
   */
  async resetPassword(email: string): Promise<void> {
    try {
      await this.client.sendVerificationEmail({ email })
    }
    catch (error) {
      throw new Error(`Password reset failed: ${(error as Error).message}`)
    }
  }

  /**
   * Requests a remote token.
   * @returns A promise resolving to the token.
   */
  async postgrestToken(): Promise<string> {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK3ND_URL}/postgrest/token`, {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error(`Token request failed: ${response.statusText}`)
      }

      const data = await response.json()
      return data.token
    }
    catch (error) {
      throw new Error(`Token request failed: ${(error as Error).message}`)
    }
  }
}