import type { Department } from '@prisma/client'
import BaseService from './BaseService'

export default class DepartmentService extends BaseService<Department> {
  constructor() {
    super('department')
  }

  /**
   * Busca departamentos com relacionamentos parent e child configurados manualmente
   */
  async getDepartmentsWithRelations() {
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
           value)
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

          return { ...department, childDepartments: children }
        }),
      )

      return departmentsWithChildren
    }
    catch (err) {
      console.error('Erro inesperado ao buscar departamentos:', err)
      throw err
    }
  }
}
