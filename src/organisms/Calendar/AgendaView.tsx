import { cn } from '@/lib/utils'
import {
  generateAgendaWeek,
  isSameDay,
  isToday,
  formatWeekday,
  formatTime,
} from './calendar.utils'

export interface AgendaEvent {
  id: string
  title: string
  start: Date
  end: Date
  color?: string
  description?: string
}

export interface AgendaViewProps {
  events: AgendaEvent[]
  currentDate: Date
  onEventClick?: (event: AgendaEvent) => void
  startHour?: number
  endHour?: number
  locale?: 'pt-BR' | 'en-US'
  className?: string
}

const SLOT_HEIGHT = 60

export function AgendaView({
  events,
  currentDate,
  onEventClick,
  startHour = 8,
  endHour = 20,
  locale = 'pt-BR',
  className,
}: AgendaViewProps) {
  const weekDays = generateAgendaWeek(currentDate)
  const hours = Array.from({ length: endHour - startHour }, (_, i) => startHour + i)
  const totalHeight = hours.length * SLOT_HEIGHT

  function getEventsForDay(day: Date): AgendaEvent[] {
    return events.filter(e => isSameDay(e.start, day))
  }

  function eventStyle(event: AgendaEvent): React.CSSProperties {
    const startMinutes =
      (event.start.getHours() - startHour) * 60 + event.start.getMinutes()
    const endMinutes =
      (event.end.getHours() - startHour) * 60 + event.end.getMinutes()
    const duration = Math.max(30, endMinutes - startMinutes)
    return {
      position: 'absolute',
      top: `${(startMinutes / 60) * SLOT_HEIGHT}px`,
      height: `${(duration / 60) * SLOT_HEIGHT}px`,
      left: '2%',
      width: '96%',
    }
  }

  const now = new Date()
  const nowTop =
    (now.getHours() - startHour) * SLOT_HEIGHT +
    (now.getMinutes() / 60) * SLOT_HEIGHT

  return (
    <div role="grid" className={cn('flex overflow-x-auto border border-neutral-200 rounded-lg', className)}>
      {/* Time labels column */}
      <div className="flex-none w-14 border-r border-neutral-200 shrink-0">
        <div className="h-10 border-b border-neutral-200" />
        <div className="relative" style={{ height: totalHeight }}>
          {hours.map(h => (
            <div
              key={h}
              className="flex items-start justify-end pr-2 pt-1 text-xs text-neutral-400"
              style={{ height: SLOT_HEIGHT }}
            >
              {`${String(h).padStart(2, '0')}:00`}
            </div>
          ))}
        </div>
      </div>

      {/* Day columns */}
      {weekDays.map(day => {
        const dayEvents = getEventsForDay(day)
        const isCurrentDay = isToday(day)
        const showTimeLine =
          isCurrentDay && now.getHours() >= startHour && now.getHours() < endHour

        return (
          <div
            key={day.toISOString()}
            className="flex-1 min-w-0 border-r border-neutral-200 last:border-r-0"
          >
            {/* Day header */}
            <div
              className={cn(
                'h-10 border-b border-neutral-200 flex flex-col items-center justify-center',
                isCurrentDay && 'bg-primary-50',
              )}
            >
              <span className="text-xs text-neutral-500 uppercase">
                {formatWeekday(day, locale)}
              </span>
              <span
                className={cn(
                  'text-sm font-semibold leading-none',
                  isCurrentDay ? 'text-primary-600' : 'text-neutral-700',
                )}
              >
                {day.getDate()}
              </span>
            </div>

            {/* Time slots */}
            <div className="relative" style={{ height: totalHeight }}>
              {hours.map(h => (
                <div
                  key={h}
                  className="border-t border-neutral-100"
                  style={{ height: SLOT_HEIGHT }}
                />
              ))}

              {showTimeLine && (
                <div
                  className="absolute left-0 right-0 border-t-2 border-red-400 z-10"
                  style={{ top: nowTop }}
                />
              )}

              {dayEvents.map(event => (
                <div
                  key={event.id}
                  role={onEventClick ? 'button' : undefined}
                  aria-label={`${event.title} ${formatTime(event.start)}-${formatTime(event.end)}`}
                  onClick={() => onEventClick?.(event)}
                  style={{
                    ...eventStyle(event),
                    backgroundColor: event.color ?? '#e0e7ff',
                  }}
                  className={cn(
                    'overflow-hidden rounded text-xs p-1 z-20',
                    onEventClick && 'cursor-pointer hover:opacity-90',
                  )}
                >
                  <p className="font-medium truncate">{event.title}</p>
                  {event.description && (
                    <p className="text-neutral-600 truncate">{event.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
