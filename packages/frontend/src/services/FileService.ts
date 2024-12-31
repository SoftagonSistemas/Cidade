import { useAuthStore } from '@/stores/AuthStore'

export default class FileService {
  private baseURL = import.meta.env.VITE_BACK3ND_URL

  constructor() {
    this.baseURL = `${this.baseURL}/files`
  }

  /**
   * Uploads a file to the server.
   * @param file The file to be uploaded.
   * @param additionalData Any additional data to include in the FormData.
   * @returns The server response for the uploaded file.
   */
  async uploadFile(file: File, additionalData: Record<string, any> = {}) {
    const endpoint = `upload`

    const formData = new FormData()
    formData.append('file', file)
    const userData = useAuthStore().user
    formData.append('userData', userData)
    // Add any additional data to the form
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value)
    })

    const options: RequestInit = {
      method: 'POST',
      body: formData,
      credentials: 'include',
    }

    const response = await fetch(`${this.baseURL}/${endpoint}`, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async viewFile(versionId: string, path: string): Promise<Response> {
    const endpoint = `view?versionId=${encodeURIComponent(versionId)}&path=${encodeURIComponent(path)}`

    const options: RequestInit = {
      method: 'GET',
      credentials: 'include',
    }

    const response = await fetch(`${this.baseURL}/${endpoint}`, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response
  }

  async urlFile(path: string): Promise<string> {
    const endpoint = `url?path=${encodeURIComponent(path)}`

    const options: RequestInit = {
      method: 'GET',
      credentials: 'include',
    }

    const response = await fetch(`${this.baseURL}/${endpoint}`, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Extrai o corpo da resposta como JSON
    const data = await response.json()

    if (!data.url) {
      throw new Error('URL not found in the response')
    }

    return data.url
  }

  async getFileVersion(path: string): Promise<string> {
    const endpoint = `version?path=${encodeURIComponent(path)}`

    const options: RequestInit = {
      method: 'GET',
      credentials: 'include',
    }

    const response = await fetch(`${this.baseURL}/${endpoint}`, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (!data.versionId) {
      throw new Error('Version not found in the response')
    }

    return data.versionId
  }

  /**
   * Deletes a file from the server.
   * @param versionId The version ID of the file to be deleted.
   * @param path The path of the file to be deleted.
   * @returns The server response for the deleted file.
   */
  async deleteFile(versionId: string, path: string): Promise<void> {
    let version = versionId
    if (!versionId) {
      version = await this.getFileVersion(path)
    }

    const endpoint = `delete?versionId=${encodeURIComponent(version)}&path=${encodeURIComponent(path)}`

    const options: RequestInit = {
      method: 'DELETE',
      credentials: 'include',
    }

    const response = await fetch(`${this.baseURL}/${endpoint}`, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  }
}
