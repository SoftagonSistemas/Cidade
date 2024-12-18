import type { MenuItem } from '../composables/useAdminMenu'

export const primaryMenuItems: MenuItem[] = [
  { icon: 'mdi-home', label: 'Dashboard', route: '/admin/dashboard/', children: [] },

  {
    icon: 'mdi-city-switch',
    label: 'Instituição',
    children: [
      { title: 'Instituição', route: '/admin/instituicao/instituicao'},
      { title: 'Entidade', route: '/admin/instituicao/entidade'},
      { title: 'Organograma', route: '/admin/instituicao/organograma'},
    ]
  },

  {
    icon: 'mdi-eye-check-outline',
    label: 'Ticket Management',
    children: [
      { title: 'Create Request', route: '/tickets/create' },
      { title: 'Tickets Overview', route: '/tickets/overview' },
      { title: 'My Tickets', route: '/tickets/my-tickets' },
      { title: 'Assigned Tickets', route: '/tickets/assigned' },
      { title: 'Department Tickets', route: '/tickets/department' },
      { title: 'SLA Configuration', route: '/tickets/sla-config' },
      { title: 'Performance Reports', route: '/tickets/reports/performance' },
    ],
  },
  {
    icon: 'mdi-domain',
    label: 'Organization Management',
    children: [
      { title: 'Departments and Secretariats', route: '/organization/departments' },
      { title: 'User Permissions', route: '/organization/user-permissions' },
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
    ],
  },
  {
    icon: 'mdi-repeat',
    label: 'Fluxos de Trabalho',
    children: [
      { title: 'Criar Fluxo', route: '/admin/fluxos/CriarFluxo' },
      { title: 'Meus Fluxos', route: '/admin/fluxos/MeusFluxos' },
      { title: 'Histórico de Fluxos', route: '/admin/fluxos/HistoricoFluxos' },
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
    'Instituição': 'Definição da Prefeitura e sua organização',
    'Ticket Management': 'Manage all tickets and service requests.',
    'Organization Management': 'Configure departments, secretariats, and user permissions.',
    'Tasks': 'Create and manage tasks.',
    'Knowledge Base': 'Access FAQs, categories, and predefined responses.',
    'Documentos': 'Gerenciamento de documentos',
    'Fluxos de Trabalho': 'Gerenciamento de fluxos de trabalho',
    'Assinaturas Digitais': 'Gerenciamento de assinaturas digitais',
    'Notificações': 'Central de notificações',
    'Relatórios': 'Relatórios gerenciais e exportação',
  }
  return descriptions[menuLabel] || 'Descrição não disponível'
}
