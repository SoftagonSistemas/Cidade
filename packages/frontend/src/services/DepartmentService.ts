import type { Address, ContactInfo, Department, User } from '@prisma/client'

import BaseService from './BaseService'

export interface DepartmentWithRelations {
  id: string
  name: string
  description: string | null
  isSecretariat: boolean
  parentDepartment: Partial<Department> | null
  head: Partial<User> | null
  address: Partial<Address> | null
  contact_info: Partial<ContactInfo>[]
  childDepartments?: Partial<Department>[]
}

export default class DepartmentService extends BaseService<Department> {
  constructor() {
    super('department')
  }

  /**
   * Busca departamentos com relacionamentos parent e child configurados manualmente
   */
  async getDepartmentsWithRelations(): Promise<DepartmentWithRelations[]> {
    try {
      // Buscar todos os departamentos com seus relacionamentos principais
      const { data: departments, error } = await this.client
        .from('department')
        .select(`
          id,
          name,
          description,
          isSecretariat,
          parentDepartment:parentDepartmentId (
            id,
            name
          ),
          head:headId (
            id,
            name
          ),
          address:addressId (
            id,
            street,
            city,
            state
          ),
          contact_info (
            type,
            value
          )
        `)

      if (error) {
        console.error('Erro ao buscar departamentos com relacionamentos:', error)
        throw new Error('Erro ao buscar departamentos com relacionamentos.')
      }

      // Buscar childDepartments para cada departamento
      const departmentsWithChildren = await Promise.all(
        departments.map(async (department) => {
          const { data: children, error: childError } = await this.client
            .from('department')
            .select('id, name')
            .eq('parentDepartmentId', department.id)

          if (childError) {
            console.error(`Erro ao buscar childDepartments para o departamento ${department.id}:`, childError)
            throw new Error(`Erro ao buscar childDepartments para o departamento ${department.id}.`)
          }

          return {
            id: department.id,
            name: department.name,
            description: department.description,
            isSecretariat: department.isSecretariat,
            parentDepartment: department.parentDepartment,
            head: department.head,
            address: department.address,
            contact_info: department.contact_info,
            childDepartments: children,
          }
        }),
      )

      return departmentsWithChildren as DepartmentWithRelations[]
    }
    catch (err) {
      console.error('Erro inesperado ao buscar departamentos:', err)
      throw err
    }
  }
}
