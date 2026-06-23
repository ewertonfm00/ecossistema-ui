import { useState, useCallback } from 'react'
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
  isBetween,
  isToday,
} from './calendar.utils'

export interface DateRange {
  start: Date | null
  end: Date | null
}

export interface DateRangePickerProps {
  value?: DateRange
  defaultValue?: DateRange
  onChange: (range: DateRange) => void
  disabled?: (date: Date) => boolean
  showTwoMonths?: boolean
  locale?: 'pt-BR' | 'en-US'
  className?: string
}

const EMPTY_RANGE: DateRange = { start: null, end: null }

export function DateRangePicker({
  value,
  defaultValue,
  onChange,
  disabled,
  showTwoMonths = true,
  locale = 'pt-BR',
  className,
}: DateRangePickerProps) {
  const isControlled = value !== undefined
  const [internalRange, setInternalRange] = useState<DateRange>(defaultValue ?? EMPTY_RANGE)
  const effectiveRange = isControlled ? (value ?? EMPTY_RANGE) : internalRange

  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const base = (value?.start ?? defaultValue?.start) ?? new Date()
    return new Date(base.getFullYear(), base.getMonth(), 1)
  })
  const secondViewMonth = addMonths(viewMonth, 1)

  const [selectionPhase, setSelectionPhase] = useState<'none' | 'selecting'>('none')
  const [hoverDate, setHoverDate] = useState<Date | null>(null)

  const handleDateClick = useCallback(
    (date: Date) => {
      if (disabled?.(date)) return
      if (selectionPhase === 'none' || !effectiveRange.start) {
        const next = { start: date, end: null }
        if (!isControlled) setInternalRange(next)
        onChange(next)
        setSelectionPhase('selecting')
      } else {
        const start = effectiveRange.start
        const next = date < start ? { start: date, end: start } : { start, end: date }
        if (!isControlled) setInternalRange(next)
        onChange(next)
        setSelectionPhase('none')
        setHoverDate(null)
      }
    },
    [selectionPhase, effectiveRange, isControlled, disabled, onChange],
  )

  function getCellClasses(day: Date, currentMonth: Date): string {
    const isCurrentMonth = day.getMonth() === currentMonth.getMonth()
    const isDisabled = disabled?.(day) ?? false
    const isStart = effectiveRange.start ? isSameDay(day, effectiveRange.start) : false
    const isEnd = effectiveRange.end ? isSameDay(day, effectiveRange.end) : false
    const isInRange =
      effectiveRange.start && effectiveRange.end
        ? isBetween(day, effectiveRange.start, effectiveRange.end)
        : false

    const isHoverPreview =
      selectionPhase === 'selecting' &&
      effectiveRange.start &&
      !effectiveRange.end &&
      hoverDate &&
      !isSameDay(day, effectiveRange.start)
        ? hoverDate >= effectiveRange.start
          ? day > effectiveRange.start && day <= hoverDate
          : day >= hoverDate && day < effectiveRange.start
        : false

    return cn(
      'flex h-8 w-8 items-center justify-center text-sm mx-auto my-0.5',
      !isCurrentMonth && 'text-neutral-300',
      isCurrentMonth && !isDisabled && !isStart && !isEnd && 'cursor-pointer',
      (isStart || isEnd) && 'bg-primary-600 text-white rounded-full',
      isInRange && !isStart && !isEnd && 'bg-primary-100 text-primary-800',
      isHoverPreview && !isStart && !isEnd && 'bg-primary-50',
      isCurrentMonth && !isDisabled && !isStart && !isEnd && !isInRange && !isHoverPreview && 'hover:bg-neutral-100 rounded-full',
      isDisabled && isCurrentMonth && 'text-neutral-300 cursor-not-allowed',
      isToday(day) && !isStart && !isEnd && 'ring-1 ring-primary-400 rounded-full',
    )
  }

  function getCellAriaLabel(day: Date): string {
    const base = formatDayLong(day, locale)
    const isStart = effectiveRange.start ? isSameDay(day, effectiveRange.start) : false
    const isEnd = effectiveRange.end ? isSameDay(day, effectiveRange.end) : false
    const isInRange =
      effectiveRange.start && effectiveRange.end
        ? isBetween(day, effectiveRange.start, effectiveRange.end)
        : false
    if (isStart) return `${base}, início do intervalo`
    if (isEnd) return `${base}, fim do intervalo`
    if (isInRange) return `${base}, no intervalo selecionado`
    return base
  }

  function renderMonth(month: Date) {
    const calDays = generateCalendarDays(month.getFullYear(), month.getMonth())
    const dayNames = getDayNames(locale, 0)
    const monthLabel = formatMonthYear(month, locale)

    return (
      <div key={month.toISOString()} className="inline-block select-none w-64">
        <div className="grid grid-cols-7 mb-1">
          {dayNames.map(name => (
            <div key={name} className="text-center text-xs text-neutral-400 py-1 font-medium">
              {name}
            </div>
          ))}
        </div>
        <div role="grid" aria-label={monthLabel} className="grid grid-cols-7">
          {calDays.map((day, i) => (
            <div
              key={i}
              role="gridcell"
              aria-label={getCellAriaLabel(day)}
              aria-selected={
                (effectiveRange.start ? isSameDay(day, effectiveRange.start) : false) ||
                (effectiveRange.end ? isSameDay(day, effectiveRange.end) : false)
              }
              onClick={() => {
                if (day.getMonth() === month.getMonth()) handleDateClick(day)
              }}
              onMouseEnter={() => {
                if (selectionPhase === 'selecting') setHoverDate(day)
              }}
              className={getCellClasses(day, month)}
            >
              {day.getDate()}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const isPrevDisabled = showTwoMonths
    ? addMonths(viewMonth, -1).getMonth() === secondViewMonth.getMonth()
    : false

  return (
    <div className={cn('inline-flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between px-2">
        <button
          onClick={() => setViewMonth(prev => addMonths(prev, -1))}
          aria-label="Mês anterior"
          disabled={isPrevDisabled}
          className="p-1 rounded hover:bg-neutral-100 text-neutral-600 disabled:opacity-30"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-16">
          <span className="text-sm font-semibold capitalize">{formatMonthYear(viewMonth, locale)}</span>
          {showTwoMonths && (
            <span className="text-sm font-semibold capitalize">{formatMonthYear(secondViewMonth, locale)}</span>
          )}
        </div>
        <button
          onClick={() => setViewMonth(prev => addMonths(prev, 1))}
          aria-label="Próximo mês"
          className="p-1 rounded hover:bg-neutral-100 text-neutral-600"
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="flex gap-4">
        {renderMonth(viewMonth)}
        {showTwoMonths && renderMonth(secondViewMonth)}
      </div>
    </div>
  )
}
