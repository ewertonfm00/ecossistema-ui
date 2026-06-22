import React, { useId, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Icon } from '@/atoms/Icon/Icon'

export interface DatePickerProps {
  value?: Date | null
  onChange?: (date: Date | null) => void
  placeholder?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
  id?: string
  'aria-label'?: string
  'aria-describedby'?: string
}

// Helpers de calendário (JS puro)
const MONTHS_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
const DAYS_SHORT = ['D','S','T','Q','Q','S','S']

function formatDate(date: Date | null | undefined): string {
  if (!date) return ''
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = date.getFullYear()
  return `${d}/${m}/${y}`
}

function parseInput(str: string): Date | null {
  const match = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!match) return null
  const [, d = '', m = '', y = ''] = match
  const date = new Date(+y, +m - 1, +d)
  if (date.getDate() !== +d || date.getMonth() !== +m - 1 || date.getFullYear() !== +y) return null
  return date
}

interface CalendarDay {
  date: Date
  currentMonth: boolean
  label: string
}

function getCalendarDays(year: number, month: number): CalendarDay[] {
  const days: CalendarDay[] = []
  const firstDay = new Date(year, month, 1)
  const startDow = firstDay.getDay() // 0=Dom
  // Dias do mês anterior
  for (let i = startDow - 1; i >= 0; i--) {
    const d = new Date(year, month, -i)
    days.push({ date: d, currentMonth: false, label: formatDate(d) })
  }
  // Dias do mês atual
  const lastDay = new Date(year, month + 1, 0).getDate()
  for (let i = 1; i <= lastDay; i++) {
    const d = new Date(year, month, i)
    days.push({ date: d, currentMonth: true, label: formatDate(d) })
  }
  // Completar até 42 (6 semanas)
  while (days.length < 42) {
    const last = days[days.length - 1]?.date ?? new Date()
    const d = new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1)
    days.push({ date: d, currentMonth: false, label: formatDate(d) })
  }
  return days
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()
}

function isDisabled(date: Date, minDate?: Date, maxDate?: Date): boolean {
  if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true
  if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true
  return false
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'DD/MM/AAAA',
  disabled = false,
  minDate,
  maxDate,
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}: DatePickerProps) {
  const pickerId = useId()
  const inputId = id ?? pickerId
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [inputValue, setInputValue] = useState(formatDate(value))
  const [viewYear, setViewYear] = useState((value ?? new Date()).getFullYear())
  const [viewMonth, setViewMonth] = useState((value ?? new Date()).getMonth())
  const containerRef = useRef<HTMLDivElement>(null)

  // Sincronizar value externo → inputValue
  React.useEffect(() => {
    setInputValue(formatDate(value))
    if (value) {
      setViewYear(value.getFullYear())
      setViewMonth(value.getMonth())
    }
  }, [value])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let raw = e.target.value.replace(/\D/g, '')
    if (raw.length > 8) raw = raw.slice(0, 8)
    let formatted = raw
    if (raw.length > 4) formatted = raw.slice(0, 2) + '/' + raw.slice(2, 4) + '/' + raw.slice(4)
    else if (raw.length > 2) formatted = raw.slice(0, 2) + '/' + raw.slice(2)
    setInputValue(formatted)
    if (formatted.length === 10) {
      const parsed = parseInput(formatted)
      if (parsed && !isDisabled(parsed, minDate, maxDate)) onChange?.(parsed)
      else if (!parsed) onChange?.(null)
    }
  }

  function handleContainerBlur(e: React.FocusEvent) {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setCalendarOpen(false)
    }
  }

  function selectDay(date: Date) {
    onChange?.(date)
    setInputValue(formatDate(date))
    setCalendarOpen(false)
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const today = new Date()
  const days = getCalendarDays(viewYear, viewMonth)

  function handleContainerKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape' && calendarOpen) {
      setCalendarOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative inline-block" onBlur={handleContainerBlur} onKeyDown={handleContainerKeyDown}>
      <div className="relative">
        <input
          id={inputId}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          aria-haspopup="dialog"
          aria-expanded={calendarOpen}
          autoComplete="off"
          className={cn(
            'w-full pr-10 pl-3 py-2 border border-neutral-300 rounded-md text-sm text-neutral-900 placeholder-neutral-400',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            disabled && 'opacity-50 cursor-not-allowed bg-neutral-50'
          )}
        />
        <button
          type="button"
          onClick={() => !disabled && setCalendarOpen(o => !o)}
          disabled={disabled}
          aria-label="Abrir calendário"
          tabIndex={-1}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
        >
          <Icon name="Bell" size={16} />
        </button>
      </div>

      {calendarOpen && (
        <div
          role="dialog"
          aria-label="Calendário"
          aria-modal="false"
          data-testid="calendar-dropdown"
          className="absolute z-50 mt-1 bg-white rounded-lg shadow-xl border border-neutral-200 p-3 w-64"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              aria-label="Mês anterior"
              onClick={prevMonth}
              className="p-1 rounded hover:bg-neutral-100 text-neutral-600"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <span className="text-sm font-semibold text-neutral-900">
              {MONTHS_PT[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              aria-label="Próximo mês"
              onClick={nextMonth}
              className="p-1 rounded hover:bg-neutral-100 text-neutral-600"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>

          {/* Cabeçalho dias da semana */}
          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {DAYS_SHORT.map((d, i) => (
              <span key={i} className="h-8 w-8 flex items-center justify-center text-xs text-neutral-400 font-medium">
                {d}
              </span>
            ))}
          </div>

          {/* Grid de dias */}
          <div role="grid" aria-label={`${MONTHS_PT[viewMonth]} ${viewYear}`} className="grid grid-cols-7 gap-0.5">
            {days.map((day, i) => {
              const selected = value ? isSameDay(day.date, value) : false
              const isToday = isSameDay(day.date, today)
              const dayDisabled = isDisabled(day.date, minDate, maxDate)
              return (
                <button
                  key={i}
                  type="button"
                  role="gridcell"
                  aria-selected={selected}
                  aria-label={`${day.date.getDate()} de ${MONTHS_PT[day.date.getMonth()]} de ${day.date.getFullYear()}`}
                  aria-disabled={dayDisabled}
                  onClick={() => !dayDisabled && selectDay(day.date)}
                  tabIndex={day.currentMonth && !dayDisabled ? 0 : -1}
                  className={cn(
                    'h-8 w-8 rounded text-sm flex items-center justify-center transition-colors',
                    selected && 'bg-primary-700 text-white',
                    isToday && !selected && 'border border-primary-700 text-primary-700',
                    dayDisabled && 'text-neutral-300 cursor-not-allowed',
                    !day.currentMonth && !selected && 'text-neutral-300',
                    !selected && !dayDisabled && day.currentMonth && 'hover:bg-neutral-100'
                  )}
                >
                  {day.date.getDate()}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

DatePicker.displayName = 'DatePicker'
