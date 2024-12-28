// services/AddressService.ts
import type { Address } from '@prisma/client'
import BaseService from './BaseService'

export default class AddressService extends BaseService<Address> {
  constructor() {
    super('address')
  }

  async fetchAddresses(): Promise<Partial<Address>[]> {
    try {
      return await this.getAll() // Usa o método getAll() do serviço base
    }
    catch (error) {
      console.error('Erro ao buscar endereços:', error)
      return []
    }
  }
}
