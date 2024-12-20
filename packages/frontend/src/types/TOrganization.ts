export interface TOrganization {
  id: string
  name: string
  slug: string
  logo?: string
  createdAt: string
  metadata?: any
  members?: Array<{
    id: string
    role: string
    user: {
      email: string
      name: string
    }
  }>
}
