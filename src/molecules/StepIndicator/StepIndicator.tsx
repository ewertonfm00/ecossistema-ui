import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface StepIndicatorStep {
  label: string
  description?: string
}

export interface StepIndicatorProps {
  steps: StepIndicatorStep[]
  current: number
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function StepIndicator({
  steps,
  current,
  orientation = 'horizontal',
  className,
}: StepIndicatorProps) {
  return (
    <nav aria-label="Indicador de etapas" className={cn('w-full', className)}>
      <ol
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row items-start' : 'flex-col',
        )}
      >
        {steps.map((step, index) => {
          const isCompleted = index < current
          const isCurrent = index === current
          const isPending = index > current

          return (
            <React.Fragment key={index}>
              <li
                className={cn(
                  'flex shrink-0',
                  orientation === 'horizontal' ? 'flex-col items-center' : 'flex-row items-center',
                )}
              >
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200',
                    isCompleted && 'bg-primary-600 text-white',
                    isCurrent && 'bg-primary-600 text-white ring-2 ring-primary-300 ring-offset-2',
                    isPending && 'border-2 border-neutral-300 bg-white text-neutral-400',
                  )}
                >
                  {isCompleted ? (
                    <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                  ) : (
                    String(index + 1)
                  )}
                </div>

                <div className={cn(orientation === 'horizontal' ? 'mt-2 text-center' : 'ml-3')}>
                  <span
                    className={cn(
                      'block text-xs font-medium',
                      isCurrent ? 'text-primary-700' : isCompleted ? 'text-neutral-700' : 'text-neutral-400',
                    )}
                  >
                    {step.label}
                  </span>
                  {step.description && (
                    <span className="block text-xs text-neutral-500 mt-0.5">{step.description}</span>
                  )}
                </div>
              </li>

              {index < steps.length - 1 && (
                <li
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none transition-colors duration-200',
                    orientation === 'horizontal'
                      ? 'h-0.5 flex-1 mx-2 mt-5'
                      : 'w-0.5 h-8 ml-[19px] my-1',
                    index < current ? 'bg-primary-600' : 'bg-neutral-200',
                  )}
                />
              )}
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
