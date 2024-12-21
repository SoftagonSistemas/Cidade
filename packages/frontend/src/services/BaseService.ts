import type { Prisma } from '@prisma/client'
import { useAuthStore } from '@/stores/AuthStore'
import { PostgrestClient } from '@supabase/postgrest-js'

const apiUrl = import.meta.env.VITE_POSTGREST_URL

export default class BaseService<T> {
  private client: PostgrestClient
  private baseURL = import.meta.env.VITE_BACK3ND_URL

  constructor(private readonly table: string) {
    const authStore = useAuthStore()
    const token = authStore.getPostgrestToken()
    this.client = new PostgrestClient(apiUrl, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
  }

  async getById(id: string): Promise<T | null> {
    const { data, error } = await this.client
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single()

    if (error)
      throw new Error(error.message)
    return data
  }

  async getAll(
    orderBy?: string,
    ascending = true,
    limit?: number,
  ) {
    let query = this.client.from(this.table).select('*')

    if (orderBy) {
      query = query.order(orderBy as string, { ascending })
    }

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error)
      throw new Error(error.message)
    return data || []
  }

  async create(record: T): Promise<T | null> {
    const { data, error } = await this.client
      .from(this.table)
      .insert(record)
      .select()
      .single()

    if (error)
      throw new Error(error.message)
    return data
  }

  async update(id: string, updates: Partial<T>): Promise<T | null> {
    const { data, error } = await this.client
      .from(this.table)
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error)
      throw new Error(error.message)
    return data
  }

  async softDelete(id: string): Promise<T | null> {
    const { data, error } = await this.client
      .from(this.table)
      .update({ deleted_at: new Date().toISOString() } as unknown as Partial<T>)
      .eq('id', id)
      .select()
      .single()

    if (error)
      throw new Error(error.message)
    return data
  }

  async countEntries(): Promise<number> {
    const { count, error } = await this.client
      .from(this.table)
      .select('*', { count: 'exact', head: true })

    if (error)
      throw new Error(error.message)
    return count || 0
  }

  async filter(column: keyof T, value: string): Promise<T[]> {
    const { data, error } = await this.client
      .from(this.table)
      .select('*')
      .eq(column as string, value)

    if (error)
      throw new Error(error.message)
    return data || []
  }

  /**
   * Uploads a file to the server.
   * @param file The file to be uploaded.
   * @param additionalData Any additional data to include in the FormData.
   * @returns The server response for the uploaded file.
   */
  async uploadFile(file: File, additionalData: Record<string, any> = {}) {
    const url = `/files/upload`

    const formData = new FormData()
    formData.append('file', file)

    // Add any additional data to the form
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value)
    })

    const options: RequestInit = {
      method: 'POST',
      body: formData,
      credentials: 'include',
    }

    const response = await fetch(`${this.baseURL}/${url}`, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async viewFile(versionId: string, path: string): Promise<Response> {
    const url = `/files/view?versionId=${encodeURIComponent(versionId)}&path=${encodeURIComponent(path)}`

    const options: RequestInit = {
      method: 'GET',
      credentials: 'include',
    }

    const response = await fetch(`${this.baseURL}${url}`, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response
  }

  /**
   * Deletes a file from the server.
   * @param versionId The version ID of the file to be deleted.
   * @param path The path of the file to be deleted.
   * @returns The server response for the deleted file.
   */
  async deleteFile(versionId: string, path: string): Promise<void> {
    const url = `/files/delete?versionId=${encodeURIComponent(versionId)}&path=${encodeURIComponent(path)}`

    const options: RequestInit = {
      method: 'DELETE',
      credentials: 'include',
    }

    const response = await fetch(`${this.baseURL}${url}`, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  }
}
