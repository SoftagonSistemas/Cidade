interface StampOptions {
  maxWidth?: number
  opacity?: number
  bottomMargin?: number
  showBorder?: boolean
  stampImage?: File
}

interface SignOptions {
  reason?: string
  contactInfo?: string
  name?: string
  location?: string
}

export default class PdfService {
  private baseURL: string

  constructor() {
    this.baseURL = `${import.meta.env.VITE_BACK3ND_URL}/pdf`
  }

  /**
   * Assina um arquivo PDF usando certificado digital e adiciona carimbo.
   * @param pdfFile Arquivo PDF a ser assinado
   * @param p12File Arquivo do certificado digital (.p12 ou .pfx)
   * @param password Senha do certificado digital
   * @param stampOptions Opções de configuração do carimbo
   * @param signOptions Opções de configuração da assinatura
   * @param onProgress Callback para monitorar o progresso do upload
   * @returns Promise com a resposta do servidor contendo o PDF assinado
   */
  async signPdf(
    pdfFile: File,
    p12File: File,
    password: string,
    stampOptions: StampOptions = {},
    signOptions: SignOptions = {},
    onProgress?: (progress: number) => void,
  ): Promise<Response> {
    const formData = new FormData()
    formData.append('pdf', pdfFile)
    formData.append('p12', p12File)
    formData.append('password', password)

    // Adiciona opções de carimbo
    if (stampOptions.maxWidth)
      formData.append('maxWidth', stampOptions.maxWidth.toString())
    if (stampOptions.opacity !== undefined)
      formData.append('opacity', stampOptions.opacity.toString())
    if (stampOptions.bottomMargin)
      formData.append('bottomMargin', stampOptions.bottomMargin.toString())
    if (stampOptions.showBorder !== undefined)
      formData.append('showBorder', stampOptions.showBorder.toString())
    if (stampOptions.stampImage)
      formData.append('stampImage', stampOptions.stampImage)

    // Adiciona opções de assinatura
    if (signOptions.reason)
      formData.append('reason', signOptions.reason)
    if (signOptions.contactInfo)
      formData.append('contactInfo', signOptions.contactInfo)
    if (signOptions.name)
      formData.append('name', signOptions.name)
    if (signOptions.location)
      formData.append('location', signOptions.location)

    const xhr = new XMLHttpRequest()

    return new Promise((resolve, reject) => {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = (event.loaded / event.total) * 100
          onProgress(progress)
        }
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(new Response(xhr.response, {
            status: 200,
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': 'attachment; filename="signed.pdf"',
            },
          }))
        }
        else {
          reject(new Error(`Falha na assinatura! Status: ${xhr.status}`))
        }
      }

      xhr.onerror = () => {
        reject(new Error('Falha no upload dos arquivos'))
      }

      xhr.open('POST', `${this.baseURL}/sign`, true)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status !== 200) {
          try {
            const errorResponse = JSON.parse(xhr.responseText)
            reject(new Error(errorResponse.message || 'Erro desconhecido'))
          }
          catch {
            reject(new Error(`Erro ${xhr.status}: ${xhr.statusText}`))
          }
        }
      }
      xhr.withCredentials = true
      xhr.responseType = 'blob'
      xhr.send(formData)
    })
  }
}
