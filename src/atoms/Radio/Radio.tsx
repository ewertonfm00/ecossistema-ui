import React from 'react'
import { cn } from '@/lib/utils'

export interface RadioProps {
  id: string
  name: string
  value: string
  checked?: boolean
  disabled?: boolean
  label?: string
  onChange?: (value: string) => void
  className?: string
}

export function Radio({ id, name, value, checked, disabled, label, onChange, className }: RadioProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => !disabled && onChange?.(value)}
        style={{ accentColor: '#0F766E' }}
        className={cn(
          'w-4 h-4 border-neutral-300 focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 cursor-pointer',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      />
      {label && (
        <label htmlFor={id} className="text-sm text-neutral-700 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  )
}

Radio.displayName = 'Radio'
