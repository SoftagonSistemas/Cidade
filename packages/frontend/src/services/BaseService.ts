import { useAuthStore } from '@/stores/AuthStore'
import { getPostgrestURL } from '@/utils/getPostgrestURL'
import { PostgrestClient } from '@supabase/postgrest-js'
import { AuthService } from './AuthService'

const authStore = useAuthStore()

export default class BaseService<T> {
  private client: PostgrestClient
  private userId = authStore.user?.id
  private orgId = authStore.organization?.id
  constructor(private readonly table: string) {
    const authStore = useAuthStore()
    const token = authStore.getPostgrestToken()
    const postgrestUrl = getPostgrestURL()

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
    const recordWithAudit = {
      ...record,
      updatedBy: this.userId,
      tenantId: this.orgId,
    } as unknown as T

    const { data, error } = await this.client
      .from(this.table)
      .insert(recordWithAudit)
      .select()
      .single()

    if (error) {
      if (error.message.includes('JWT ')) {
        new AuthService().logout()
      }
      throw new Error(error.message)
    }
    return data
  }

  async update(id: string, updates: Partial<T>): Promise<T | null> {
    const updatesWithAudit = {
      ...updates,
      createdBy: this.userId,
    } as unknown as Partial<T>

    const { data, error } = await this.client
      .from(this.table)
      .update(updatesWithAudit)
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
      .update({
        deletedAt: new Date().toISOString(),
        updatedBy: this.userId,
      } as unknown as Partial<T>)
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

  /**
   * Filters records in the table based on the provided filters.
   *
   * @param filters - An object where the keys are column names and the values are the filter criteria.
   *                  The filter criteria can be a single value or an array of values.
   * @returns A promise that resolves to an array of records that match the filter criteria.
   *
   * @example
   * // Filter records where the 'status' column is 'active'
   * const activeRecords = await baseService.filter({ status: 'active' });
   *
   * @example
   * // Filter records where the 'status' column is 'active' or 'pending'
   * const activeOrPendingRecords = await baseService.filter({ status: ['active', 'pending'] });
   *
   * @example
   * // Filter records where the 'status' column is 'active' and 'type' column is 'admin'
   * const activeAdminRecords = await baseService.filter({ status: 'active', type: 'admin' });
   */
  async filter(filters: Partial<Record<keyof T, string | string[]>>): Promise<T[]> {
    let query = this.client.from(this.table).select('*')

    for (const [column, value] of Object.entries(filters)) {
      if (Array.isArray(value)) {
        query = query.in(column, value)
      }
      else {
        query = query.eq(column, value)
      }
    }

    const { data, error } = await query

    if (error)
      throw new Error(error.message)
    return data || []
  }
}
