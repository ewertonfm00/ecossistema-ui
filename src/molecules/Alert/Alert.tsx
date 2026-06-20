import { cn } from '@/lib/utils'
import { Icon } from '../../atoms/Icon'

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  description?: string
  onDismiss?: () => void
  className?: string
}

const variantConfig = {
  info:    { bg: 'bg-info-50',    border: 'border-info-500',    text: 'text-info-500',    icon: 'Info' },
  success: { bg: 'bg-success-50', border: 'border-success-500', text: 'text-success-600', icon: 'CheckCircle2' },
  warning: { bg: 'bg-warning-50', border: 'border-warning-500', text: 'text-warning-600', icon: 'AlertTriangle' },
  error:   { bg: 'bg-error-50',   border: 'border-error-500',   text: 'text-error-600',   icon: 'XCircle' },
}

export function Alert({ variant = 'info', title, description, onDismiss, className }: AlertProps) {
  const config = variantConfig[variant]
  const isAssertive = variant === 'error' || variant === 'warning'

  return (
    <div
      role="alert"
      aria-live={isAssertive ? 'assertive' : 'polite'}
      className={cn('flex gap-3 p-4 rounded-md border-l-4', config.bg, config.border, className)}
    >
      <Icon name={config.icon} size={18} className={cn('shrink-0 mt-0.5', config.text)} />
      <div className="flex-1 min-w-0">
        {title && <p className={cn('text-sm font-semibold', config.text)}>{title}</p>}
        {description && <p className="text-sm text-neutral-600 mt-0.5">{description}</p>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Fechar"
          className={cn('shrink-0 -mt-0.5 -mr-1 p-1 rounded hover:bg-black/5', config.text)}
        >
          <Icon name="X" size={16} />
        </button>
      )}
    </div>
  )
}
