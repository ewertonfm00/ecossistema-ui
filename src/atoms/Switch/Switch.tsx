import React from 'react'
import { cn } from '@/lib/utils'

export interface SwitchProps {
  checked?: boolean
  disabled?: boolean
  label?: string
  labelPosition?: 'left' | 'right'
  'aria-label'?: string
  onChange?: (checked: boolean) => void
  className?: string
}

export function Switch({ checked, disabled, label, labelPosition = 'right', onChange, className, 'aria-label': ariaLabel }: SwitchProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {label && labelPosition === 'left' && (
        <span className="text-sm text-neutral-700">{label}</span>
      )}
      <button
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={cn(
          'relative w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2',
          checked ? 'bg-primary-700' : 'bg-neutral-200',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span
          className={cn(
            'block w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200',
            checked ? 'translate-x-5' : 'translate-x-0.5'
          )}
        />
      </button>
      {label && labelPosition === 'right' && (
        <span className="text-sm text-neutral-700">{label}</span>
      )}
    </div>
  )
}

Switch.displayName = 'Switch'
