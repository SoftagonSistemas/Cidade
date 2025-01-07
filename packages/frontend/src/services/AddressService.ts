// services/AddressService.ts
import type { Address } from '@prisma/client'
import BaseService from './BaseService'

export default class AddressService extends BaseService<Address> {
  constructor() {
    super('address')
  }

  async searchStreets(keyword: string): Promise<Partial<Address>[]> {
    const { data, error } = await this.client
      .from('address')
      .select('*') // Seleciona todos os campos
      .ilike('street', `%${keyword}%`) // Busca ruas que contêm a palavra-chave

    if (error) {
      console.error('Erro ao buscar ruas por palavra-chave:', error.message)
      throw error
    }

    if (!data) {
      return []
    }

    // Garante que os resultados são únicos com base no campo `street`
    const uniqueStreets = Array.from(new Map(data.map(item => [item.street, item])).values())

    return uniqueStreets
  }

  async getUniqueCities(): Promise<string[]> {
    const { data, error } = await this.client
      .from('address')
      .select('city')

    if (error) {
      console.error('Erro ao buscar ruas únicas por palavra-chave:', error.message)
      throw error
    }

    const uniqueCity = Array.from(new Set(data?.map(row => row.city)))
    return uniqueCity
  }

  async getUniqueStates(): Promise<string[]> {
    const { data, error } = await this.client
      .from('address')
      .select('state')

    if (error) {
      console.error('Erro ao buscar estados únicos:', error.message)
      throw error
    }

    const uniqueStates = Array.from(new Set(data?.map(row => row.state)))
    return uniqueStates
  }

  async getUniquePostalCodes(): Promise<string[]> {
    const { data, error } = await this.client
      .from('address')
      .select('postalCode')

    if (error) {
      console.error('Erro ao buscar códigos postais únicos:', error.message)
      throw error
    }

    const uniquePostalCodes = Array.from(new Set(data?.map(row => row.postalCode)))
    return uniquePostalCodes
  }
}
