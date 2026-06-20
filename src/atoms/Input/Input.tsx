import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'
  state?: 'default' | 'error' | 'disabled'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
}

const sizeClasses = {
  sm: 'h-8 text-xs px-2.5',
  md: 'h-10 text-sm px-3',
  lg: 'h-12 text-base px-4',
}

const stateClasses = {
  default: 'border-neutral-200 focus:border-primary-600 focus:shadow-focus',
  error: 'border-error-500 focus:border-error-500 focus:[box-shadow:0_0_0_3px_rgb(239_68_68_/_0.25)]',
  disabled: 'border-neutral-200 bg-neutral-50 text-neutral-400 cursor-not-allowed opacity-50',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', state = 'default', leftIcon, rightIcon, leftAddon, rightAddon, className, disabled, ...props }, ref) => {
    const effectiveState = disabled ? 'disabled' : state

    const inputClass = cn(
      'w-full border rounded-md outline-none transition-shadow placeholder:text-neutral-400',
      sizeClasses[size],
      stateClasses[effectiveState],
      leftIcon && 'pl-9',
      rightIcon && 'pr-9',
      className,
    )

    const inputEl = (
      <div className="relative flex-1">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400 flex items-center">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled || effectiveState === 'disabled'}
          className={inputClass}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400 flex items-center">
            {rightIcon}
          </span>
        )}
      </div>
    )

    if (leftAddon || rightAddon) {
      return (
        <div className="flex">
          {leftAddon && (
            <span className="flex items-center bg-neutral-50 border border-neutral-200 border-r-0 rounded-l-md px-3 text-sm text-neutral-500">
              {leftAddon}
            </span>
          )}
          {inputEl}
          {rightAddon && (
            <span className="flex items-center bg-neutral-50 border border-neutral-200 border-l-0 rounded-r-md px-3 text-sm text-neutral-500">
              {rightAddon}
            </span>
          )}
        </div>
      )
    }

    return inputEl
  }
)

Input.displayName = 'Input'
