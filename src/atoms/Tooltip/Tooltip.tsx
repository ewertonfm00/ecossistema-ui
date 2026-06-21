import React, { useId, useState } from 'react'
import { cn } from '@/lib/utils'

export interface TooltipProps {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  children: React.ReactElement
  className?: string
  trigger?: 'hover' | 'focus' | 'both'
}

const positionClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

export function Tooltip({ content, position = 'top', children, className, trigger = 'hover' }: TooltipProps) {
  const tooltipId = useId()
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const jsVisible = trigger === 'hover' ? isHovered
                  : trigger === 'focus' ? isFocused
                  : isHovered || isFocused

  const visibilityClass = trigger === 'hover'
    ? 'invisible group-hover:visible'
    : jsVisible ? 'visible' : 'invisible'

  const childProps: Record<string, unknown> = {
    'aria-describedby': tooltipId,
  }

  if (trigger === 'focus' || trigger === 'both') {
    childProps.onFocus = () => setIsFocused(true)
    childProps.onBlur = () => setIsFocused(false)
  }
  if (trigger === 'both') {
    childProps.onMouseEnter = () => setIsHovered(true)
    childProps.onMouseLeave = () => setIsHovered(false)
  }

  return (
    <div className="relative inline-flex group">
      {React.cloneElement(children, childProps)}
      <span
        id={tooltipId}
        role="tooltip"
        className={cn(
          'absolute z-[600] bg-neutral-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap',
          visibilityClass,
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
