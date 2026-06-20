import React, { useId } from 'react'
import { cn } from '@/lib/utils'

export interface TooltipProps {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  children: React.ReactElement
  className?: string
}

const positionClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

export function Tooltip({ content, position = 'top', children, className }: TooltipProps) {
  const tooltipId = useId()

  return (
    <div className="relative inline-flex group">
      {React.cloneElement(children, { 'aria-describedby': tooltipId })}
      <span
        id={tooltipId}
        role="tooltip"
        className={cn(
          'absolute z-[600] invisible group-hover:visible bg-neutral-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap',
          positionClasses[position],
          className
        )}
      >
        {content}
      </span>
    </div>
  )
}

Tooltip.displayName = 'Tooltip'
