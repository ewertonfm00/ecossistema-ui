import React, { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

export interface CheckboxProps {
  id: string
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  label?: string
  onChange?: (checked: boolean) => void
  className?: string
}

export function Checkbox({ id, checked, indeterminate, disabled, label, onChange, className }: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate ?? false
    }
  }, [indeterminate])

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <input
        ref={inputRef}
        type="checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={(e) => !disabled && onChange?.(e.target.checked)}
        style={{ accentColor: '#0F766E' }}
        className={cn(
          'w-4 h-4 rounded border-neutral-300 focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 cursor-pointer',
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

Checkbox.displayName = 'Checkbox'
