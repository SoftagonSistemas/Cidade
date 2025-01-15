import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criar status de tickets
  const statusList = await Promise.all([
    prisma.ticketStatus.create({ data: { name: 'Aberto' } }),
    prisma.ticketStatus.create({ data: { name: 'Em andamento' } }),
    prisma.ticketStatus.create({ data: { name: 'Aguardando resposta' } }),
    prisma.ticketStatus.create({ data: { name: 'Resolvido' } }),
    prisma.ticketStatus.create({ data: { name: 'Fechado' } }),
  ]);

  // Criar prioridades
  const priorities = await Promise.all([
    prisma.ticketPriority.create({ data: { name: 'Baixa' } }),
    prisma.ticketPriority.create({ data: { name: 'Média' } }),
    prisma.ticketPriority.create({ data: { name: 'Alta' } }),
    prisma.ticketPriority.create({ data: { name: 'Urgente' } }),
  ]);

  // Buscar departamento existente (Secretaria de Saúde)
  const department = await prisma.department.findFirst({
    where: { name: 'Secretaria de Saúde' },
  });

  // Criar tópicos de ajuda
  const helpTopic = await prisma.helpTopic.create({
    data: {
      topic: 'Atendimento Médico',
      description: 'Solicitações relacionadas a consultas e atendimentos médicos',
      departmentId: department!.id,
    },
  });

  // Criar plano SLA
  const slaPlan = await prisma.sLAPlan.create({
    data: {
      name: 'Padrão',
      gracePeriod: 48, // 48 horas
    },
  });

  // Buscar um usuário existente
  const user = await prisma.user.findFirst({
    where: { jobTitle: 'Prefeito' },
  });

  // Criar tickets fictícios
  const tickets = await Promise.all([
    prisma.ticket.create({
      data: {
        subject: 'Solicitação de consulta com especialista',
        description: 'Preciso de encaminhamento para um cardiologista com urgência.',
        statusId: statusList[0].id, // Aberto
        priorityId: priorities[2].id, // Alta
        createdById: user!.id,
        departmentId: department!.id,
        helpTopicId: helpTopic.id,
        slaPlanId: slaPlan.id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
        threads: {
          create: [{
            message: 'Primeira mensagem do ticket',
            userId: user!.id
          }]
        }
      }
    }),
    prisma.ticket.create({
      data: {
        subject: 'Falta de medicamentos no posto de saúde',
        description: 'O posto do bairro Centro está sem insulina há uma semana.',
        statusId: statusList[1].id, // Em andamento
        priorityId: priorities[3].id, // Urgente
        createdById: user!.id,
        departmentId: department!.id,
        helpTopicId: helpTopic.id,
        slaPlanId: slaPlan.id,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 dias
      },
    }),
    prisma.ticket.create({
      data: {
        subject: 'Agendamento de vacinação',
        description: 'Gostaria de agendar vacinação para minha filha de 4 anos.',
        statusId: statusList[2].id, // Aguardando resposta
        priorityId: priorities[1].id, // Média
        createdById: user!.id,
        departmentId: department!.id,
        helpTopicId: helpTopic.id,
        slaPlanId: slaPlan.id,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 dias
      },
    }),
    prisma.ticket.create({
      data: {
        subject: 'Solicitação de prontuário médico',
        description: 'Preciso de uma cópia do meu prontuário médico dos últimos 6 meses.',
        statusId: statusList[0].id, // Aberto
        priorityId: priorities[0].id, // Baixa
        createdById: user!.id,
        departmentId: department!.id,
        helpTopicId: helpTopic.id,
        slaPlanId: slaPlan.id,
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 dias
      },
    }),
  ]);

  // Criar anexos para o primeiro thread do primeiro ticket
  if (tickets[0]) {
    const thread = await prisma.ticketThread.findFirst({
      where: { ticketId: tickets[0].id }
    });

    if (thread) {
      await prisma.ticketAttachment.create({
        data: {
          fileName: 'documento.pdf',
          filePath: '/uploads/documento.pdf',
          mimeType: 'application/pdf',
          ticketId: tickets[0].id,
          threadId: thread.id
        }
      });
    }
  }

  console.log('Seed de tickets criado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
