import { AuthService } from './AuthService'
/**
 * Organization Service class for managing organization-related requests.
 */
export class OrganizationService extends AuthService {
  constructor() {
    super()
  }

  /**
   * Retrieves a list of organizations.
   * @returns A promise resolving to the list of organizations.
   */
  async listOrganizations() {
    try {
      const response = await this.client.organization.setActive({
        organizationId: 'zViH5YbyJ4lC9Y26raPfu', // Substitua pelo ID correto
      })
      return response
    }
    catch (error) {
      throw new Error(`Failed to list organizations: ${(error as Error).message}`)
    }
  }
}
