import type { Ticket } from '@prisma/client'
import BaseService from './BaseService'

export default class TicketService extends BaseService<Ticket> {
  constructor() {
    super('ticket')
  }

  async getAllTickets() {
    const { data, error } = await this.client
      .from(this.table)
      .select(`
        *,
        assignedTo:assignedToId(name),
        createdBy:createdById(name),
        priority:priorityId(name),
        status:statusId(name)
      `)
      .is('deletedAt', null)
      .order('createdAt', { ascending: false })

    if (error)
      throw new Error(error.message)
    return data
  }

  async getTicketDetails(id: string) {
    try {
      // Primeiro, busca os detalhes do ticket
      const { data: ticketData, error: ticketError } = await this.client
        .from(this.table)
        .select(`
          *,
          assignedTo:assignedToId(id, name, email),
          createdBy:createdById(id, name, email),
          priority:priorityId(id, name),
          status:statusId(id, name),
          department:departmentId(id, name),
          helpTopic:helpTopicId(topic, description)
        `)
        .eq('id', id)
        .maybeSingle()

      if (ticketError)
        throw new Error(ticketError.message)
      if (!ticketData)
        throw new Error('Ticket não encontrado')

      // Depois, busca as threads separadamente
      const { data: threadsData, error: threadsError } = await this.client
        .from('ticket_thread')
        .select(`
          id,
          message,
          createdAt,
          user:userId(id, name),
          ticket_attachment(
            id,
            fileName,
            filePath,
            mimeType
          )
        `)
        .eq('ticketId', id)
        .is('deletedAt', null)

      if (threadsError)
        throw new Error(threadsError.message)

      return {
        ...ticketData,
        threads: threadsData || [],
      }
    }
    catch (error: any) {
      throw new Error(`Erro ao carregar ticket: ${error.message}`)
    }
  }

  async updateTicketStatus(id: string, statusId: string, description: string) {
    const { data, error } = await this.client
      .from(this.table)
      .update({
        statusId,
        updatedAt: new Date().toISOString(),
      })
      .eq('id', id)
      .single()

    if (error)
      throw new Error(error.message)
    return data
  }
}
