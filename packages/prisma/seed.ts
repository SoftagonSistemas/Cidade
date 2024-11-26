import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Institution Seed
  const institution = await prisma.institution.create({
    data: {
      name: 'Prefeitura Municipal de Exemplo',
      departments: {
        create: [
          {
            name: 'Secretaria de Saúde',
            description: 'Responsável pela saúde municipal.',
            isSecretariat: true,
          },
          {
            name: 'Secretaria de Educação',
            description: 'Responsável pela educação pública.',
            isSecretariat: true,
          },
        ],
      },
    },
  });

  // Department Seed
  const department = await prisma.department.create({
    data: {
      name: 'Departamento de Infraestrutura',
      description: 'Coordena obras e manutenção.',
      institutionId: institution.id,
      isSecretariat: false,
    },
  });

  // User Seed
  const user1 = await prisma.user.create({
    data: {
      apiUserId: 'user_api_1',
      email: 'secretario1@prefeitura.com',
      name: 'Secretário Saúde',
      role: 'secretario',
      userDepartments: {
        create: {
          departmentId: department.id,
          role: 'manager',
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      apiUserId: 'user_api_2',
      email: 'funcionario1@prefeitura.com',
      name: 'Funcionário Infraestrutura',
      role: 'funcionario',
      userDepartments: {
        create: {
          departmentId: department.id,
          role: 'employee',
        },
      },
    },
  });

  // Document Seed
  const document = await prisma.document.create({
    data: {
      title: 'Ofício 001/2024',
      filePath: 'uploads/docs/oficio_001.pdf',
      mimeType: 'application/pdf',
      keywords: ['infraestrutura', 'saúde', 'medicamentos'],
      ownerId: user1.id,
      signed: false,
      documentUsers: {
        create: [
          { userId: user1.id },
          { userId: user2.id },
        ],
      },
    },
  });

  // Task and Workflow Seed
  const workflow = await prisma.workflow.create({
    data: {
      name: 'Fluxo de Aprovação de Documentos',
      status: 'ativo',
      tasks: {
        create: [
          {
            title: 'Revisar Documento',
            description: 'Revisar o conteúdo do documento antes de encaminhar.',
            status: 'pendente',
            assignedToId: user2.id,
            documentId: document.id,
          },
        ],
      },
    },
  });

  console.log(`Institution, Departments, Users, Document, and Workflow created successfully.`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
