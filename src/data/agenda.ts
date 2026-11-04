import type { IconName } from '@/components/ui/nexa-icon';
import { parseDateKey, toDateKey } from '@/utils/calendar';

// Dados DEMONSTRATIVOS da agenda acadêmica do NEXA.
// Quando o back-end estiver integrado, apenas este repositório precisa
// substituir os dados locais por chamadas à API, mantendo a assinatura.

export type AgendaEventType = 'Aula' | 'Atividade' | 'Evento';
export type AgendaFilter = 'Todos' | AgendaEventType;

export type AgendaEvent = {
  id: string;
  /** Data local no formato "YYYY-MM-DD". */
  date: string;
  title: string;
  /** Faixa de horário exibida ("18:50 - 21:30") ou "Dia todo". */
  time: string;
  location: string;
  type: AgendaEventType;
  description?: string;
};

/** Aula semanal recorrente. weekday segue Date.getDay(): 0 = domingo. */
export type WeeklyClass = {
  id: string;
  weekday: number;
  title: string;
  time: string;
  location: string;
  professor?: string;
};

export const semesterRange = { start: '2026-08-03', end: '2026-12-18' } as const;

export const weeklyClasses: WeeklyClass[] = [
  { id: 'ux', weekday: 1, title: 'UX Design', time: '18:50 - 21:30', location: 'Sala 39', professor: 'Prof. Carlos Eduardo' },
  { id: 'dados', weekday: 2, title: 'Gestão de dados', time: '18:50 - 21:30', location: 'Sala 22', professor: 'Profª. Ana Paula' },
  { id: 'mobile', weekday: 3, title: 'Desenvolvimento Mobile', time: '18:50 - 21:30', location: 'Sala 39', professor: 'Prof. Marcos Vinícius' },
  { id: 'eng-soft', weekday: 4, title: 'Engenharia de Software', time: '18:50 - 21:30', location: 'Sala 41', professor: 'Profª. Fernanda Lima' },
  { id: 'distribuidos', weekday: 5, title: 'Sistemas Distribuídos', time: '18:50 - 21:30', location: 'Laboratório 3', professor: 'Prof. Roberto Souza' },
];

/**
 * Dias sem aula regular (feriados, aulas substituídas por entregas etc.).
 * O motivo é exibido como compromisso do tipo "Evento" quando fizer sentido.
 */
export const classFreeDates: Record<string, { reason: string; showAsEvent: boolean }> = {
  '2026-09-07': { reason: 'Feriado · Independência do Brasil', showAsEvent: true },
  '2026-10-06': { reason: 'Aula substituída pela entrega do protótipo', showAsEvent: false },
  '2026-10-12': { reason: 'Feriado · Nossa Senhora Aparecida', showAsEvent: true },
  '2026-11-02': { reason: 'Feriado · Finados', showAsEvent: true },
  '2026-11-20': { reason: 'Feriado · Dia da Consciência Negra', showAsEvent: true },
};

export const oneOffEvents: AgendaEvent[] = [
  { id: 'entrega-prototipo', date: '2026-10-06', title: 'Entrega do protótipo', time: '23:59', location: 'AVA', type: 'Atividade', description: 'Envio do link do repositório e relatório do protótipo no AVA.' },
  { id: 'integra-si', date: '2026-10-21', title: 'Integra SI · Semana de Tecnologia', time: '18:50', location: 'Auditório principal', type: 'Evento', description: 'Palestras magnas, oficinas e networking acadêmico da UNEX.' },
  { id: 'parcial-dados', date: '2026-10-27', title: 'Avaliação parcial · Gestão de dados', time: '18:50 - 20:30', location: 'Sala 22', type: 'Atividade', description: 'Prova teórica e prática sobre modelagem relacional e normalização.' },
  { id: 'relatorio-ux', date: '2026-11-06', title: 'Entrega do relatório de UX', time: '23:59', location: 'AVA', type: 'Atividade', description: 'Documentação dos testes de usabilidade e personas.' },
  { id: 'palestra-carreira', date: '2026-11-12', title: 'Palestra: carreira em tecnologia', time: '19:00 - 20:30', location: 'Auditório principal', type: 'Evento', description: 'Mesa redonda com profissionais do mercado e alumni da UNEX.' },
  { id: 'prototipo-final', date: '2026-11-24', title: 'Entrega do protótipo final', time: '23:59', location: 'AVA', type: 'Atividade', description: 'Versão candidata a release com testes e documentação.' },
  { id: 'projeto-integrador', date: '2026-12-03', title: 'Apresentação do projeto integrador', time: '18:50 - 21:30', location: 'Auditório principal', type: 'Evento', description: 'Apresentação em banca para professores convidados.' },
  { id: 'final-mobile', date: '2026-12-09', title: 'Avaliação final · Desenvolvimento Mobile', time: '18:50 - 21:30', location: 'Sala 39', type: 'Atividade', description: 'Demonstração do aplicativo funcionando e avaliação técnica.' },
];

export const agendaTypeStyles: Record<AgendaEventType, { tint: string; background: string }> = {
  Aula: { tint: '#6d7b35', background: '#f0f4dd' },
  Atividade: { tint: '#586ab0', background: '#edf0ff' },
  Evento: { tint: '#a17d35', background: '#fcf2df' },
};

export const agendaFilters: { label: AgendaFilter; icon: IconName }[] = [
  { label: 'Todos', icon: 'grid' },
  { label: 'Aula', icon: 'book-open' },
  { label: 'Atividade', icon: 'file-text' },
  { label: 'Evento', icon: 'star' },
];

/**
 * Retorna todos os eventos acadêmicos para uma data específica (local YYYY-MM-DD).
 */
export function getEventsForDate(dateInput: Date | string): AgendaEvent[] {
  const date = typeof dateInput === 'string' ? parseDateKey(dateInput) : dateInput;
  const key = typeof dateInput === 'string' ? dateInput : toDateKey(date);

  const events: AgendaEvent[] = [];

  // 1. Feriados e datas especiais que contam como evento
  const freeDay = classFreeDates[key];
  if (freeDay && freeDay.showAsEvent) {
    events.push({
      id: `holiday-${key}`,
      date: key,
      title: freeDay.reason,
      time: 'Dia todo',
      location: 'Campus UNEX',
      type: 'Evento',
      description: 'Não haverá expediente acadêmico regular.',
    });
  }

  // 2. Aulas regulares da semana
  const isClassCancelled = freeDay && !freeDay.showAsEvent;
  if (!isClassCancelled && key >= semesterRange.start && key <= semesterRange.end) {
    const weekday = date.getDay();
    const regularClass = weeklyClasses.find((c) => c.weekday === weekday);
    if (regularClass) {
      events.push({
        id: `class-${key}-${regularClass.id}`,
        date: key,
        title: regularClass.title,
        time: regularClass.time,
        location: regularClass.location,
        type: 'Aula',
        description: regularClass.professor ? `Professor: ${regularClass.professor}` : undefined,
      });
    }
  }

  // 3. Eventos pontuais e prazos de entrega cadastrados
  const matchingOneOff = oneOffEvents.filter((item) => item.date === key);
  events.push(...matchingOneOff);

  return events;
}

/**
 * Verifica se uma data possui qualquer tipo de compromisso acadêmico.
 */
export function hasEventsOnDate(dateInput: Date | string): boolean {
  return getEventsForDate(dateInput).length > 0;
}

/**
 * Verifica se uma data possui eventos especiais em destaque (Atividades ou Eventos com prazo).
 * Usado para exibir a estrela ✦ no calendário.
 */
export function hasSpecialEventOnDate(dateInput: Date | string): boolean {
  const events = getEventsForDate(dateInput);
  return events.some((event) => event.type === 'Atividade' || event.type === 'Evento');
}

/**
 * Retorna os próximos eventos a partir de uma data de referência (ex.: dia selecionado ou hoje).
 */
export function getUpcomingEvents(
  fromKey: string,
  filter: AgendaFilter = 'Todos',
  searchQuery = '',
  limit = 10,
): AgendaEvent[] {
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase('pt-BR');
  const results: AgendaEvent[] = [];
  const startDate = parseDateKey(fromKey);

  // Percorre até 60 dias à frente
  for (let i = 0; i < 60 && results.length < limit; i++) {
    const target = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
    const dayEvents = getEventsForDate(target);

    for (const event of dayEvents) {
      const matchesFilter = filter === 'Todos' || event.type === filter;
      const matchesQuery =
        !normalizedQuery ||
        `${event.title} ${event.location} ${event.type} ${event.description || ''}`
          .toLocaleLowerCase('pt-BR')
          .includes(normalizedQuery);

      if (matchesFilter && matchesQuery) {
        results.push(event);
        if (results.length >= limit) break;
      }
    }
  }

  return results;
}
