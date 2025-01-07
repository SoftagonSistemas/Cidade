import { useAuthStore } from '@/stores/AuthStore'
import { AuthService } from './AuthService'

/**
 * Organization Service class for managing organization-related requests.
 */
export class OrganizationService extends AuthService {
  constructor() {
    super()
  }

  async getMembers() {
    const orgId = useAuthStore().organization?.id
    const { data } = await this.client.organization.getFullOrganization({
      organizationId: orgId,
    })
    return data?.members
  }
}
