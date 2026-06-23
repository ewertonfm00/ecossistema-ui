import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  addDays,
  addMonths,
  generateCalendarDays,
  getDayNames,
  formatMonthYear,
  formatDayLong,
  isSameDay,
  isToday,
} from './calendar.utils'

export interface CalendarPickerProps {
  value?: Date
  defaultValue?: Date
  onChange: (date: Date) => void
  disabled?: (date: Date) => boolean
  locale?: 'pt-BR' | 'en-US'
  className?: string
}

export function CalendarPicker({
  value,
  defaultValue,
  onChange,
  disabled,
  locale = 'pt-BR',
  className,
}: CalendarPickerProps) {
  const isControlled = value !== undefined
  const [internalDate, setInternalDate] = useState<Date | null>(defaultValue ?? null)
  const effectiveDate = isControlled ? (value ?? null) : internalDate

  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const base = value ?? defaultValue ?? new Date()
    return new Date(base.getFullYear(), base.getMonth(), 1)
  })

  const [focusedDate, setFocusedDate] = useState<Date | null>(effectiveDate)

  useEffect(() => {
    if (
      focusedDate &&
      (focusedDate.getFullYear() !== viewMonth.getFullYear() ||
        focusedDate.getMonth() !== viewMonth.getMonth())
    ) {
      setViewMonth(new Date(focusedDate.getFullYear(), focusedDate.getMonth(), 1))
    }
  }, [focusedDate])

  const dayNames = getDayNames(locale, 0)
  const calDays = generateCalendarDays(viewMonth.getFullYear(), viewMonth.getMonth())
  const monthLabel = formatMonthYear(viewMonth, locale)

  function handleSelect(date: Date) {
    if (disabled?.(date)) return
    if (!isControlled) setInternalDate(date)
    onChange(date)
    setFocusedDate(date)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    const base = focusedDate ?? viewMonth
    const map: Record<string, () => void> = {
      ArrowLeft: () => setFocusedDate(addDays(base, -1)),
      ArrowRight: () => setFocusedDate(addDays(base, 1)),
      ArrowUp: () => setFocusedDate(addDays(base, -7)),
      ArrowDown: () => setFocusedDate(addDays(base, 7)),
      PageUp: () => setViewMonth(prev => addMonths(prev, -1)),
      PageDown: () => setViewMonth(prev => addMonths(prev, 1)),
      Enter: () => { if (focusedDate) handleSelect(focusedDate) },
      ' ': () => { if (focusedDate) handleSelect(focusedDate) },
    }
    if (e.key in map) {
      e.preventDefault()
      map[e.key]()
    }
  }

  return (
    <div className={cn('inline-block select-none w-64', className)}>
      <div className="flex items-center justify-between px-2 py-2">
        <button
          onClick={() => setViewMonth(prev => addMonths(prev, -1))}
          aria-label="Mês anterior"
          className="p-1 rounded hover:bg-neutral-100 text-neutral-600"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-semibold capitalize">{monthLabel}</span>
        <button
          onClick={() => setViewMonth(prev => addMonths(prev, 1))}
          aria-label="Próximo mês"
          className="p-1 rounded hover:bg-neutral-100 text-neutral-600"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {dayNames.map(name => (
          <div key={name} className="text-center text-xs text-neutral-400 py-1 font-medium">
            {name}
          </div>
        ))}
      </div>

      <div
        role="grid"
        aria-label={monthLabel}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="grid grid-cols-7 outline-none"
      >
        {calDays.map((day, i) => {
          const isCurrentMonth = day.getMonth() === viewMonth.getMonth()
          const isSelected = effectiveDate ? isSameDay(day, effectiveDate) : false
          const isDisabled = disabled?.(day) ?? false
          const isTodayDay = isToday(day)
          const isFocused = focusedDate ? isSameDay(day, focusedDate) : false

          return (
            <div
              key={i}
              role="gridcell"
              aria-label={formatDayLong(day, locale)}
              aria-selected={isSelected}
              aria-disabled={isDisabled || !isCurrentMonth}
              tabIndex={isFocused ? 0 : -1}
              onClick={() => {
                if (isCurrentMonth && !isDisabled) handleSelect(day)
              }}
              className={cn(
                'flex h-8 w-8 items-center justify-center text-sm mx-auto my-0.5',
                !isCurrentMonth && 'text-neutral-300',
                isCurrentMonth && !isDisabled && !isSelected && 'hover:bg-neutral-100 cursor-pointer rounded-full',
                isSelected && 'bg-primary-600 text-white rounded-full',
                isTodayDay && !isSelected && 'ring-1 ring-primary-400 rounded-full',
                isDisabled && isCurrentMonth && 'text-neutral-300 cursor-not-allowed',
              )}
            >
              {day.getDate()}
            </div>
          )
        })}
      </div>
    </div>
  )
}
