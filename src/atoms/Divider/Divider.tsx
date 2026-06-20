import React from 'react'
import { cn } from '@/lib/utils'

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  label?: string
  className?: string
}

export function Divider({ orientation = 'horizontal', label, className }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('inline-block h-full w-px bg-neutral-200 mx-2', className)}
      />
    )
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn('flex items-center gap-3 my-4', className)}
      >
        <hr className="flex-1 border-neutral-200" />
        <span className="text-xs text-neutral-400 whitespace-nowrap">{label}</span>
        <hr className="flex-1 border-neutral-200" />
      </div>
    )
  }

  return (
    <hr
      role="separator"
      aria-orientation="horizontal"
      className={cn('border-neutral-200 my-4', className)}
    />
  )
}

Divider.displayName = 'Divider'
