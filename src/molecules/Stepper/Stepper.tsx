import React, { createContext, useContext, useId, useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Context ───────────────────────────────────────────────────────────────────

interface StepperContextValue {
  currentStep: number
  setCurrentStep: (step: number) => void
  orientation: 'horizontal' | 'vertical'
  idPrefix: string
}

const StepperContext = createContext<StepperContextValue | null>(null)

function useStepperContext() {
  const ctx = useContext(StepperContext)
  if (!ctx) throw new Error('Stepper compound components must be used inside <Stepper>')
  return ctx
}

// ── Stepper ───────────────────────────────────────────────────────────────────

export interface StepperProps {
  value?: number
  defaultValue?: number
  onChange?: (step: number) => void
  orientation?: 'horizontal' | 'vertical'
  className?: string
  children: React.ReactNode
}

export function Stepper({
  value,
  defaultValue = 0,
  onChange,
  orientation = 'horizontal',
  className,
  children,
}: StepperProps) {
  const idPrefix = useId()
  const isControlled = value !== undefined
  const [internalStep, setInternalStep] = useState(defaultValue)

  const currentStep = isControlled ? value : internalStep

  function setCurrentStep(next: number) {
    if (!isControlled) setInternalStep(next)
    onChange?.(next)
  }

  return (
    <StepperContext.Provider value={{ currentStep, setCurrentStep, orientation, idPrefix }}>
      <div className={cn('w-full', className)}>{children}</div>
    </StepperContext.Provider>
  )
}

// ── StepList ──────────────────────────────────────────────────────────────────

export interface StepListProps {
  children: React.ReactNode
  className?: string
}

export interface StepProps {
  label: string
  description?: string
  icon?: React.ReactNode
  className?: string
  /** @internal injected by StepList via React.cloneElement */
  index?: number
}

export function StepList({ children, className }: StepListProps) {
  const { orientation, currentStep } = useStepperContext()
  const steps = React.Children.toArray(children) as React.ReactElement<StepProps>[]
  const total = steps.length

  return (
    <nav aria-label="Progresso">
      <ol
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',
          className,
        )}
      >
        {steps.map((child, index) => (
          <React.Fragment key={index}>
            {React.cloneElement(child, { index })}
            {index < total - 1 && (
              <li
                aria-hidden="true"
                className={cn(
                  'pointer-events-none transition-colors duration-200',
                  orientation === 'horizontal'
                    ? 'h-0.5 flex-1 mx-2'
                    : 'w-0.5 h-8 ml-[19px] my-1',
                  index < currentStep ? 'bg-primary-600' : 'bg-neutral-200',
                )}
              />
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  )
}

// ── Step ──────────────────────────────────────────────────────────────────────

export function Step({ label, description, icon, className, index = 0 }: StepProps) {
  const { currentStep, setCurrentStep, orientation, idPrefix } = useStepperContext()

  const isCompleted = index < currentStep
  const isCurrent = index === currentStep
  const isPending = index > currentStep

  const ariaLabel = `${label}${isCompleted ? ' — concluído' : isCurrent ? ' — atual' : ' — pendente'}`

  const circleButton = (
    <button
      id={`${idPrefix}-step-${index}`}
      aria-current={isCurrent ? 'step' : undefined}
      aria-label={ariaLabel}
      disabled={isPending}
      onClick={() => {
        if (isCompleted) setCurrentStep(index)
      }}
      className={cn(
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        isCompleted && 'bg-primary-600 text-white cursor-pointer',
        isCurrent &&
          'bg-primary-600 text-white ring-2 ring-primary-300 ring-offset-2 cursor-default',
        isPending &&
          'bg-white border-2 border-neutral-300 text-neutral-400 cursor-not-allowed',
      )}
    >
      <span aria-hidden="true">
        {icon ?? (isCompleted ? <Check size={16} strokeWidth={2.5} /> : String(index + 1))}
      </span>
    </button>
  )

  const labelContent = (
    <div className={cn(orientation === 'horizontal' ? 'mt-2 text-center' : 'ml-3')}>
      <span
        className={cn(
          'block text-xs font-medium',
          isCurrent ? 'text-primary-700' : isCompleted ? 'text-neutral-700' : 'text-neutral-400',
        )}
      >
        {label}
      </span>
      {description && (
        <span className="block text-xs text-neutral-500 mt-0.5">{description}</span>
      )}
    </div>
  )

  if (orientation === 'horizontal') {
    return (
      <li className={cn('flex shrink-0 flex-col items-center', className)}>
        {circleButton}
        {labelContent}
      </li>
    )
  }

  return (
    <li className={cn('flex flex-row items-center', className)}>
      {circleButton}
      {labelContent}
    </li>
  )
}

// ── StepPanel ─────────────────────────────────────────────────────────────────

export interface StepPanelProps {
  step: number
  children: React.ReactNode
  className?: string
}

export function StepPanel({ step, children, className }: StepPanelProps) {
  const { currentStep, idPrefix } = useStepperContext()
  const isActive = currentStep === step
  return (
    <div
      id={`${idPrefix}-panel-${step}`}
      role="region"
      aria-labelledby={`${idPrefix}-step-${step}`}
      className={cn('outline-none', !isActive && 'hidden', className)}
    >
      {children}
    </div>
  )
}
