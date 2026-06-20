import { cn } from '@/lib/utils'

export interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
  badgeStyle?: 'soft' | 'filled' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

const variantSoftClasses: Record<string, string> = {
  default: 'bg-neutral-100 text-neutral-700',
  primary: 'bg-primary-100 text-primary-700',
  success: 'bg-success-50 text-success-600',
  warning: 'bg-warning-50 text-warning-600',
  error: 'bg-error-50 text-error-600',
  info: 'bg-info-50 text-info-500',
}

const variantFilledClasses: Record<string, string> = {
  default: 'bg-neutral-600 text-white',
  primary: 'bg-primary-600 text-white',
  success: 'bg-success-600 text-white',
  warning: 'bg-warning-600 text-white',
  error: 'bg-error-600 text-white',
  info: 'bg-info-500 text-white',
}

const variantOutlineClasses: Record<string, string> = {
  default: 'bg-transparent text-neutral-600 border border-neutral-200',
  primary: 'bg-transparent text-primary-600 border border-primary-200',
  success: 'bg-transparent text-success-600 border border-success-500',
  warning: 'bg-transparent text-warning-600 border border-warning-500',
  error: 'bg-transparent text-error-600 border border-error-500',
  info: 'bg-transparent text-info-500 border border-info-500',
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs font-semibold',
  lg: 'px-3 py-1.5 text-sm font-semibold',
}

export function Badge({ variant = 'default', badgeStyle = 'soft', size = 'md', children, className }: BadgeProps) {
  const styleMap = {
    soft: variantSoftClasses,
    filled: variantFilledClasses,
    outline: variantOutlineClasses,
  }

  const variantClass = styleMap[badgeStyle][variant] ?? styleMap[badgeStyle]['default']

  return (
    <span className={cn('inline-flex items-center rounded-full', sizeClasses[size], variantClass, className)}>
      {children}
    </span>
  )
}
