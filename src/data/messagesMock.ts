export interface Message {
  id: string;
  initials: string;
  sender: string;
  date: string;
  subject: string;
  preview: string;
  unreadCount: number;
}

export const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    initials: 'EM',
    sender: 'Elienaide Machado de Souza Silva',
    date: 'Ontem',
    subject: 'Desenvolvimento mobile híbrido',
    preview: 'Boa tarde, Informe que por questão de saúde não vou dar aul...',
    unreadCount: 1,
  },
  {
    id: '2',
    initials: 'RB',
    sender: 'Rafael Brasil dos Santos',
    date: '26/08/26',
    subject: 'Desenvolvimento mobile híbrido',
    preview: 'Feira de Santana A professora Elienaide não poderá ministrar...',
    unreadCount: 1,
  },
  {
    id: '3',
    initials: 'RB',
    sender: 'Rafael Brasil dos Santos',
    date: '31/07/26',
    subject: 'Desenvolvimento Web Orientada a Objetos',
    preview: 'Prezados(as) estudantes, Informamos que, por motivo de for...',
    unreadCount: 0,
  },
];