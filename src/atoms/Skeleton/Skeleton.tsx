import React from 'react'
import { cn } from '@/lib/utils'

export interface SkeletonProps {
  width?: string | number
  height?: string | number
  variant?: 'rect' | 'circle' | 'text'
  className?: string
}

const variantClasses = {
  rect: 'rounded-md',
  circle: 'rounded-full',
  text: 'rounded',
}

export function Skeleton({ width = '100%', height = '1rem', variant = 'rect', className }: SkeletonProps) {
  const styleObj = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  }

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={cn('animate-pulse bg-neutral-200', variantClasses[variant], className)}
      style={styleObj}
    />
  )
}

Skeleton.displayName = 'Skeleton'
