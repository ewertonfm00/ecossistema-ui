import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Icon } from '../../atoms/Icon'

export interface ToastProps {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title: string
  description?: string
  duration?: number
  onClose?: () => void
  className?: string
}

const variantConfig = {
  info:    { bg: 'bg-info-50',    border: 'border-info-500',    text: 'text-info-500',    icon: 'Info' },
  success: { bg: 'bg-success-50', border: 'border-success-500', text: 'text-success-600', icon: 'CheckCircle2' },
  warning: { bg: 'bg-warning-50', border: 'border-warning-500', text: 'text-warning-600', icon: 'AlertTriangle' },
  error:   { bg: 'bg-error-50',   border: 'border-error-500',   text: 'text-error-600',   icon: 'XCircle' },
}

export function Toast({ variant = 'info', title, description, duration = 4000, onClose, className }: ToastProps) {
  const config = variantConfig[variant]

  useEffect(() => {
    if (duration > 0 && onClose) {
      const id = setTimeout(onClose, duration)
      return () => clearTimeout(id)
    }
  }, [duration, onClose])

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex gap-3 p-4 rounded-lg shadow-sm border-l-4 min-w-[280px] max-w-sm',
        config.bg,
        config.border,
        className,
      )}
    >
      <Icon name={config.icon} size={18} className={cn('shrink-0 mt-0.5', config.text)} />
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm font-semibold', config.text)}>{title}</p>
        {description && <p className="text-sm text-neutral-600 mt-0.5">{description}</p>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className={cn('shrink-0 -mt-0.5 -mr-1 p-1 rounded hover:bg-black/5', config.text)}
        >
          <Icon name="X" size={16} />
        </button>
      )}
    </div>
  )
}
