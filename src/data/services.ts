import type { IconName } from '@/components/ui/nexa-icon';

export type ServiceCategory = 'Acadêmico' | 'Documentos' | 'Financeiro' | 'Atendimento';
export type ServiceFilter = 'Todos' | ServiceCategory;

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  category: ServiceCategory;
  tint: string;
  background: string;
  // Só preencher com URLs oficiais confirmadas da UNEX; sem url, a tela mostra o aviso de protótipo.
  url?: string;
};

export const serviceFilters: { label: ServiceFilter; icon: IconName }[] = [
  { label: 'Todos', icon: 'grid' },
  { label: 'Acadêmico', icon: 'book-open' },
  { label: 'Documentos', icon: 'file-text' },
  { label: 'Financeiro', icon: 'credit-card' },
  { label: 'Atendimento', icon: 'help-circle' },
];

export const services: Service[] = [
  { id: 'portal', title: 'Portal do Aluno', description: 'Acesso rápido ao ambiente acadêmico oficial e demais funcionalidades institucionais.', icon: 'layout', category: 'Acadêmico', tint: '#7b8940', background: '#f0f4dd' },
  { id: 'cursos', title: 'Cursos', description: 'Acesso rápido a todos os cursos matriculados.', icon: 'layers', category: 'Acadêmico', tint: '#7b8940', background: '#f0f4dd' },
  { id: 'monitoria', title: 'Monitoria', description: 'Central para editais, resultados e oportunidades de monitoria acadêmica.', icon: 'star', category: 'Acadêmico', tint: '#c98a3a', background: '#fdf0de' },
  { id: 'documentos', title: 'Documentos acadêmicos', description: 'Atalhos para solicitações de declarações, históricos e comprovantes quando disponíveis.', icon: 'file-text', category: 'Documentos', tint: '#7b8940', background: '#f0f4dd' },
  { id: 'financeiro', title: 'Financeiro', description: 'Redirecionamento para serviços financeiros oficiais da instituição.', icon: 'credit-card', category: 'Financeiro', tint: '#586ab0', background: '#edf0ff' },
  { id: 'atendimento', title: 'Atendimento', description: 'Encontre o canal adequado para resolver dúvidas acadêmicas e administrativas.', icon: 'help-circle', category: 'Atendimento', tint: '#c98a3a', background: '#fdf0de' },
  { id: 'calendario', title: 'Calendário acadêmico', description: 'Visualize datas relevantes, compromissos e eventos em uma experiência mobile.', icon: 'calendar', category: 'Acadêmico', tint: '#7b8940', background: '#f0f4dd' },
  { id: 'contatos', title: 'Contatos da unidade', description: 'Acesso organizado às informações públicas de contato e localização.', icon: 'phone', category: 'Atendimento', tint: '#586ab0', background: '#edf0ff' },
];
