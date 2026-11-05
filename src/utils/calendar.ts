// Utilitários de calendário: funções PURAS (sem estado, sem I/O), fáceis de testar.
//
// Todas as datas são tratadas no fuso LOCAL do aparelho. Nunca use
// `new Date('2026-10-06')`: strings ISO sem horário são interpretadas como UTC
// e, no Brasil (UTC-3), viram o dia anterior. Use `parseDateKey` no lugar.

export const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
] as const;

export const MONTH_SHORT = [
  'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN',
  'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ',
] as const;

// Domingo primeiro, igual a Date.getDay() e ao layout do protótipo.
export const WEEKDAY_SHORT = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'] as const;
export const WEEKDAY_LONG = [
  'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira',
  'quinta-feira', 'sexta-feira', 'sábado',
] as const;

/** 6 semanas × 7 dias: altura fixa evita o card "pular" ao trocar de mês. */
export const CALENDAR_CELLS = 42;

export type MonthRef = { year: number; month: number }; // month: 0-11
export type CalendarDay = { date: Date; key: string; inMonth: boolean };

const pad = (value: number) => String(value).padStart(2, '0');

/** Converte uma data em chave estável "YYYY-MM-DD" (fuso local). */
export function toDateKey(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * Converte "YYYY-MM-DD" em Date local à meia-noite.
 * Lança erro para formatos/datas inválidas (ex.: "2026-02-30"), para que dados
 * mal cadastrados falhem cedo em desenvolvimento em vez de sumirem da agenda.
 */
export function parseDateKey(key: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key);
  if (!match) throw new Error(`Data inválida: "${key}" (esperado YYYY-MM-DD)`);

  const [, y, m, d] = match.map(Number);
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
    throw new Error(`Data inexistente: "${key}"`);
  }
  return date;
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Soma dias via setDate: respeita viradas de mês/ano e horário de verão. */
export function addDays(date: Date, amount: number): Date {
  const next = startOfDay(date);
  next.setDate(next.getDate() + amount);
  return next;
}

export function addMonths({ year, month }: MonthRef, amount: number): MonthRef {
  const date = new Date(year, month + amount, 1);
  return { year: date.getFullYear(), month: date.getMonth() };
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function monthOf(date: Date): MonthRef {
  return { year: date.getFullYear(), month: date.getMonth() };
}

/**
 * Monta a grade do mês: começa no domingo da semana do dia 1 e sempre devolve
 * 42 dias, incluindo dias "vizinhos" do mês anterior/seguinte (inMonth=false).
 */
export function buildMonthGrid({ year, month }: MonthRef): CalendarDay[] {
  const firstOfMonth = new Date(year, month, 1);
  const gridStart = addDays(firstOfMonth, -firstOfMonth.getDay());

  return Array.from({ length: CALENDAR_CELLS }, (_, index) => {
    const date = addDays(gridStart, index);
    return { date, key: toDateKey(date), inMonth: date.getMonth() === month };
  });
}

/** "5 de outubro de 2026" — usado em leitores de tela e avisos. */
export function formatLongDate(date: Date): string {
  return `${date.getDate()} de ${MONTH_NAMES[date.getMonth()].toLocaleLowerCase('pt-BR')} de ${date.getFullYear()}`;
}
