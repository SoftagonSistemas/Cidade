import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Cadastro de endereço
  const address = await prisma.address.create({
    data: {
      street: 'Rua Coelho Rodrigues',
      number: '174',
      complement: 'Centro',
      city: 'Araripina',
      state: 'PE',
      postalCode: '56280-000',
    },
  });

  // Cadastro de usuários
  const mayor = await prisma.user.create({
    data: {
      name: 'Evilásio Mateus',
      email: 'evilasio.mateus@araripina.pe.gov.br',
      jobTitle: 'Prefeito',
      phoneNumber: '87996197825',
      dateOfBirth: new Date('1972-02-26'),
      apiUserId: 'SGVGqGl1nBHo6fChAngjY'
    },
  });

  const viceMayor = await prisma.user.create({
    data: {
      name: 'Bringel Filho',
      email: 'bringel.filho@araripina.pe.gov.br',
      jobTitle: 'Vice-Prefeito',
      phoneNumber: '87991609993',
      dateOfBirth: new Date('1990-07-05'),
      apiUserId: 'XBJncLNi_136uSDoPkL2L'
    },
  });

  // Cadastro de instituição
  const institution = await prisma.institution.create({
    data: {
      name: 'Prefeitura Municipal de Araripina',
      addressId: address.id,
      mayorId: mayor.id,
      viceMayorId: viceMayor.id,
      phone: '87981331477',
      whatsapp: '87981331477',
      email: 'gabinete@araripina.pe.gov.br',
      cnpj: '11.040.854/0001-18'
    },
  });

  // Cadastro de secretaria
  const department = await prisma.department.create({
    data: {
      name: 'Secretaria de Saúde',
      description: 'Responsável pela saúde municipal.',
      isSecretariat: true,
      institutionId: institution.id,
      addressId: address.id,
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
