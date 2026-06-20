import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  state?: 'default' | 'error' | 'disabled'
  resize?: 'none' | 'vertical' | 'both'
  rows?: number
  className?: string
}

const stateClasses = {
  default: 'border-neutral-300 focus:ring-primary-700',
  error: 'border-error-500 focus:ring-error-500',
  disabled: 'bg-neutral-50 text-neutral-400 cursor-not-allowed border-neutral-200',
}

const resizeClasses = {
  none: 'resize-none',
  vertical: 'resize-y',
  both: 'resize',
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ state, resize = 'vertical', disabled, className, ...props }, ref) => {
    const effectiveState = disabled ? 'disabled' : state ?? 'default'

    return (
      <textarea
        ref={ref}
        disabled={effectiveState === 'disabled'}
        className={cn(
          'w-full rounded-md border px-3 py-2 text-sm text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-offset-0 placeholder:text-neutral-400',
          stateClasses[effectiveState],
          resizeClasses[resize],
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'
