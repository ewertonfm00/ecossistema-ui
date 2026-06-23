export function addDays(date: Date, n: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

export function addMonths(date: Date, n: number): Date {
  const d = new Date(date)
  d.setMonth(d.getMonth() + n)
  return d
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0)
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)
}

export function startOfWeek(date: Date, weekStartsOn: 0 | 1 = 0): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = weekStartsOn === 0 ? -day : day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

export function isBetween(date: Date, start: Date, end: Date): boolean {
  const t = date.getTime()
  return t > start.getTime() && t < end.getTime()
}

export function generateCalendarDays(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1)
  const startDate = startOfWeek(firstDay, 0)
  const days: Date[] = []
  for (let i = 0; i < 42; i++) {
    days.push(addDays(startDate, i))
  }
  return days
}

export function generateAgendaWeek(date: Date): Date[] {
  const monday = startOfWeek(date, 1)
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i))
}

export function formatMonthYear(date: Date, locale = 'pt-BR'): string {
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date)
}

export function formatDayLong(date: Date, locale = 'pt-BR'): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatWeekday(date: Date, locale = 'pt-BR'): string {
  return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date)
}

export function formatTime(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

export function getDayNames(locale = 'pt-BR', weekStartsOn: 0 | 1 = 0): string[] {
  const sunday = new Date(2024, 0, 7)
  return Array.from({ length: 7 }, (_, i) => {
    const d = addDays(sunday, (i + weekStartsOn) % 7)
    return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(d)
  })
}
