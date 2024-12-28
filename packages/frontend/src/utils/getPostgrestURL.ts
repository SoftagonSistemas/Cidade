import { useAuthStore } from '@/stores/AuthStore'

export function getPostgrestURL() {
  const authStore = useAuthStore()
  const rawMetadata = authStore.organization?.metadata
  const postgrestUrl = rawMetadata ? JSON.parse(rawMetadata).postgrest : null
  return postgrestUrl
}
