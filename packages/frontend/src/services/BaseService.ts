import { useAuthStore } from '@/stores/authStore'

const apiUrl = import.meta.env.VITE_BACK3ND_URL

interface RequestResult<U> { data: U[], count?: number }

export default class BaseService<T = string> {
  private readonly baseURL: string = apiUrl
  protected readonly table: string

  constructor(table: string) {
    this.table = table
  }

  private async request<U>(url: string, options: RequestInit = {}): Promise<RequestResult<U>> {
    const authStore = useAuthStore()
    const token = authStore.token

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    }

    const response = await fetch(`${this.baseURL}${url}`, { ...options, headers })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json() as Promise<RequestResult<U>>
  }

  async getById(id: string): Promise<T | null> {
    const { data } = await this.request<T>(`items/${this.table}/${id}`)
    return data[0] ?? null
  }

  async getAll(
    orderBy?: string,
    ascending = true,
    limit?: number,
  ): Promise<T[]> {
    const params = new URLSearchParams({
      ascending: ascending.toString(),
      ...(orderBy && { orderBy }),
      ...(limit && { limit: limit.toString() }),
    })

    const url = `items/${this.table}/?${params.toString()}`
    const { data } = await this.request<T>(url)
    return data
  }

  async create(record: Partial<T>): Promise<T> {
    const url = `items/${this.table}`
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(record),
    }
    const { data } = await this.request<T>(url, options)
    return data[0]
  }

  async update(id: string, updates: Partial<T>): Promise<T | null> {
    const url = `items/${this.table}/${id}`
    const options: RequestInit = {
      method: 'PUT',
      body: JSON.stringify(updates),
    }
    const { data } = await this.request<T>(url, options)
    return data[0] ?? null
  }

  async softDelete(id: string): Promise<T | null> {
    const url = `items/${this.table}/${id}`
    const options: RequestInit = {
      method: 'PATCH',
      body: JSON.stringify({ deleted_at: new Date().toISOString() }),
    }
    const { data } = await this.request<T>(url, options)
    return data[0] ?? null
  }

  async countEntries(): Promise<number> {
    const { count } = await this.request<never>(`items/${this.table}`)
    return count ?? 0
  }

  async filter(column: keyof T, value: string): Promise<T[]> {
    const filter = encodeURIComponent(JSON.stringify({ [column]: { _eq: value } }))
    const url = `items/${this.table}/?filter=${filter}`
    const { data } = await this.request<T>(url)
    return data
  }
}
