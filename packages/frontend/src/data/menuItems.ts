import type { MenuItem } from '../composables/useAdminMenu'

export const primaryMenuItems: MenuItem[] = [
  { icon: 'mdi-home', label: 'Dashboard', route: '/admin/dashboard/', children: [] },
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
    icon: 'mdi-bell',
    label: 'Notificações',
    children: [
      { title: 'Central de Notificações', route: '/admin/notificacoes/CentralNotificacoes' },
      { title: 'Notificações em Tempo Real', route: '/admin/notificacoes/NotificacoesTempoReal.vue' },
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
  {
    icon: 'mdi-cog',
    label: 'Administração',
    children: [
      { title: 'Gerenciamento de Usuários e Secretarias', route: '/admin/administracao/GerenciamentoUsuarios' },
      { title: 'Configurações do Sistema', route: '/admin/administracao/ConfiguracoesSistema' },
    ],
  },
]

export function getMenuDescription(menuLabel: string): string {
  const descriptions: { [key: string]: string } = {
    'Dashboard': 'Indicadores de desempenho e notificações',
    'Documentos': 'Gerenciamento de documentos',
    'Fluxos de Trabalho': 'Gerenciamento de fluxos de trabalho',
    'Assinaturas Digitais': 'Gerenciamento de assinaturas digitais',
    'Notificações': 'Central de notificações',
    'Relatórios': 'Relatórios gerenciais e exportação',
    'Administração': 'Gerenciamento de usuários e configurações do sistema',
  }
  return descriptions[menuLabel] || 'Descrição não disponível'
}
