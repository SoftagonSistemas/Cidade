import type { Institution } from '@prisma/client'
import { useAuthStore } from '@/stores/AuthStore'
import BaseService from './BaseService'

export default class InstitutionService extends BaseService<Institution> {
  constructor() {
    super('institution')
  }

  async getInstitutionId(): Promise<string | null> {
    const organizationId = useAuthStore().organization?.id as string
    const institutions = await this.filter({ tenantId: organizationId })
    return institutions.length > 0 ? institutions[0]?.id : null
  }
}
