import type { MenuItem } from '../composables/useAdminMenu'

export const primaryMenuItems: MenuItem[] = [
  { icon: 'mdi-home', label: 'Dashboard', route: '/admin/dashboard/', children: [] },
  {
    icon: 'mdi-city-switch',
    label: 'Instituição',
    children: [
      { title: 'Institução', route: '/admin/instituicao/' },
      { title: 'Secretarias', route: '/admin/instituicao/secretarias' },
      { title: 'Organograma', route: '/admin/instituicao/organograma' },
    ],
  },
  {
    icon: 'mdi-eye-check-outline',
    label: 'Ticket Management',
    children: [
      { title: 'Create Request', route: '/admin/tickets/create-ticket' },
      { title: 'Tickets Overview', route: '/admin/tickets' },
      { title: 'My Tickets', route: '/tickets/my-tickets' },
      { title: 'Assigned Tickets', route: '/tickets/assigned' },
      { title: 'Department Tickets', route: '/tickets/department' },
      { title: 'SLA Configuration', route: '/admin/tickets/sla-config' },
      { title: 'Performance Reports', route: '/tickets/reports/performance' },
    ],
  },
  {
    icon: 'mdi-domain',
    label: 'Organization Management',
    children: [
      { title: 'Departments and Secretariats', route: '/admin/organization/departments' },
      { title: 'User Permissions', route: '/admin/organization/user-permissions' },
    ],
  },
  {
    icon: 'mdi-briefcase-check',
    label: 'Tasks',
    children: [
      { title: 'Task List', route: '/tasks/list' },
      { title: 'Create Task', route: '/tasks/create' },
    ],
  },
  {
    icon: 'mdi-book-open-page-variant',
    label: 'Knowledge Base',
    children: [
      { title: 'FAQs', route: '/knowledge-base/faqs' },
      { title: 'Categories', route: '/knowledge-base/categories' },
      { title: 'Canned Responses', route: '/knowledge-base/canned-responses' },
    ],
  },
  {
    icon: 'mdi-file-document',
    label: 'Documentos',
    children: [
      { title: 'Criar Documento', route: '/admin/documentos/CriarDocumento' },
      { title: 'Meus Documentos', route: '/admin/documentos/MeusDocumentos' },
      { title: 'Documentos Recebidos', route: '/admin/documentos/DocumentosRecebidos' },
      { title: 'Documentos Enviados', route: '/admin/documentos/DocumentosEnviados' },
      { title: 'separator' },
      { title: 'Certificado digital', route: '/admin/documentos/CertificadoDigital' },
    ],
  },
  {
    icon: 'mdi-pencil',
    label: 'Assinaturas Digitais',
    children: [
      { title: 'Gerenciar Certificados', route: '/admin/assinaturas/GerenciarCertificados' },
      { title: 'Assinatura de Documentos', route: '/admin/assinaturas/AssinaturaDocumentos' },
      { title: 'Validação de Assinaturas', route: '/admin/assinaturas/ValidacaoAssinaturas' },
    ],
  },
  {
    icon: 'mdi-chart-bar',
    label: 'Relatórios',
    children: [
      { title: 'Relatórios Gerenciais', route: '/admin/relatorios/RelatoriosGerenciais' },
      { title: 'Exportação', route: '/admin/relatorios/Exportacao' },
    ],
  },
]

export function getMenuDescription(menuLabel: string): string {
  const descriptions: { [key: string]: string } = {
    'Dashboard': 'Indicadores de desempenho e notificações',
    'Ticket Management': 'Manage all tickets and service requests.',
    'Documentos': 'Gerenciamento de documentos',
    'Assinaturas Digitais': 'Gerenciamento de assinaturas digitais',
    'Notificações': 'Central de notificações',
    'Relatórios': 'Relatórios gerenciais e exportação',
    'Instituição': 'Definição da Prefeitura e sua organização',
  }
  return descriptions[menuLabel] || 'Descrição não disponível'
}
