import React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  placeholder?: string
  state?: 'default' | 'error' | 'disabled'
  onChange?: (value: string) => void
  className?: string
}

const stateClasses = {
  default: 'border-neutral-300 focus:ring-primary-700',
  error: 'border-error-500 focus:ring-error-500',
  disabled: 'bg-neutral-50 text-neutral-400 cursor-not-allowed border-neutral-200',
}

export function Select({ options, value, placeholder, state = 'default', onChange, className }: SelectProps) {
  const effectiveState = state

  return (
    <div className="relative">
      <select
        value={value}
        disabled={effectiveState === 'disabled'}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          'w-full rounded-md border px-3 py-2 pr-8 text-sm text-neutral-900 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-offset-0',
          stateClasses[effectiveState],
          className
        )}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
    </div>
  )
}

Select.displayName = 'Select'
