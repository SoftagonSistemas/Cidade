import BaseService from './BaseService'

interface DigitalCertificate {
  id: string
  userId: string
  alias: string
  filePath: string
  password: string
  createdAt: Date
  expiration: Date
}

export default class DigitalCertificateService extends BaseService<DigitalCertificate> {
  constructor() {
    super('DigitalCertificate')
  }

  async upload(file: File): Promise<string> {
    const response = await this.uploadFile(file, { folder: 'certificates' }) // Pasta específica no S3
    return response.filePath // Ajuste conforme a resposta do backend
  }
}
