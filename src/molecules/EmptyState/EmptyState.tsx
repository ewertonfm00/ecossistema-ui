import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/atoms/Button'

export interface EmptyStateAction {
  label: string
  onClick: () => void
}

export interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: EmptyStateAction
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: { container: 'py-6', iconSize: 32, title: 'text-sm', iconContainer: 'h-12 w-12' },
  md: { container: 'py-10', iconSize: 48, title: 'text-base', iconContainer: 'h-16 w-16' },
  lg: { container: 'py-16', iconSize: 64, title: 'text-lg', iconContainer: 'h-20 w-20' },
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  size = 'md',
  className,
}: EmptyStateProps) {
  const s = sizeMap[size]
  const clonedIcon = icon && React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: s.iconSize })
    : icon

  return (
    <div
      role="status"
      aria-label={title}
      className={cn('flex flex-col items-center text-center gap-4 w-full', s.container, className)}
    >
      {icon && (
        <div className={cn('flex items-center justify-center rounded-full bg-neutral-100 text-neutral-400', s.iconContainer)}>
          {clonedIcon}
        </div>
      )}

      <div className="space-y-1">
        <p className={cn('font-medium text-neutral-800', s.title)}>{title}</p>
        {description && (
          <p className="text-sm text-neutral-500">{description}</p>
        )}
      </div>

      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  )
}
