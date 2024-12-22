import { useAuthStore } from '@/stores/AuthStore'
import { PostgrestClient } from '@supabase/postgrest-js'

export default class BaseService<T> {
  private client: PostgrestClient

  constructor(private readonly table: string) {
    const authStore = useAuthStore()
    const token = authStore.getPostgrestToken()
    const postgrestUrl = this.getPostgresUrl()

    try {
      this.client = new PostgrestClient(postgrestUrl, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })
    }
    catch (error: any) {
      authStore.logout()
      throw new Error(`Failed to initialize PostgrestClient: ${error.message}`)
    }
  }

  getPostgresUrl() {
    const authStore = useAuthStore()
    const rawMetadata = authStore.organization?.metadata
    const postgrestUrl = rawMetadata ? JSON.parse(rawMetadata).postgrest : null
    return postgrestUrl
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
}
