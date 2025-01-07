export default class OpenAIClient {
  private apiKey: string
  private apiUrl: string

  constructor(apiUrl: string = 'https://api.openai.com/v1/chat/completions') {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY as string
    if (!this.apiKey) {
      throw new Error('API Key do OpenAI não encontrada!')
    }
    this.apiUrl = apiUrl
  }

  private async fetchChatGPTResponse(messages: Array<{ role: string, content: string }>, model: string = 'gpt-3.5-turbo'): Promise<string> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, messages }),
    })

    if (!response.ok) {
      console.error('Erro ao consultar a API OpenAI:', await response.text())
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0].message.content.trim()
  }

  public async classifyText(objeto: string): Promise<string> {
    const messages = [
      {
        role: 'system',
        content:
            'Você é um assistente que classifica textos de empenhos. Sua única resposta deve ser a categoria identificada, sem explicações ou frases adicionais. Exemplos de categorias: "Locação de Imóveis", "Manutenção de Veículos", "Prestação de Serviços de Engenharia", "Pagamento de Encargos Sociais e Trabalhistas", etc.',
      },
      {
        role: 'user',
        content: `Classifique o seguinte empenho: "${objeto}"`,
      },
    ]

    return this.fetchChatGPTResponse(messages)
  }

  public async generateDocument(prompt: string): Promise<string> {
    const messages = [
      {
        role: 'system',
        content:
            'Você é um assistente especializado em redação de documentos formais para uso em prefeituras. Crie documentos claros e bem formatados com base no que for solicitado.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ]

    return this.fetchChatGPTResponse(messages)
  }

  public async describeDepartment(prefeitura: string, secretaria: string): Promise<string> {
    const messages = [
      {
        role: 'system',
        content:
          'Você é um assistente que redige descrições concisas e cativantes para informar a população sobre o propósito e os serviços de uma secretaria municipal. A descrição deve ser clara, objetiva e autoexplicativa.',
      },
      {
        role: 'user',
        content: `Redija uma descrição para a secretaria "${secretaria}" da prefeitura de "${prefeitura}". Explique para que serve e como pode ajudar a população de forma concisa e cativante.`,
      },
    ]

    return this.fetchChatGPTResponse(messages)
  }

  public async assistDailyTasks(taskDescription: string): Promise<string> {
    const messages = [
      {
        role: 'system',
        content:
            'Você é um assistente virtual que ajuda em tarefas administrativas diárias para prefeituras. Responda de forma clara e prática.',
      },
      {
        role: 'user',
        content: taskDescription,
      },
    ]

    return this.fetchChatGPTResponse(messages)
  }
}
