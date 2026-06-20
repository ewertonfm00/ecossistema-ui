import { cn } from '@/lib/utils'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  variant?: 'default' | 'required' | 'optional' | 'error'
  htmlFor?: string
  children: React.ReactNode
}

const variantClasses = {
  default: 'text-neutral-700',
  required: 'text-neutral-700',
  optional: 'text-neutral-700',
  error: 'text-accent-600',
}

export function Label({ variant = 'default', htmlFor, children, className, ...props }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('text-sm font-medium', variantClasses[variant], className)}
      {...props}
    >
      {children}
      {variant === 'required' && (
        <span className="ml-0.5 text-error-500">*</span>
      )}
      {variant === 'optional' && (
        <span className="ml-1 text-neutral-400">(opcional)</span>
      )}
    </label>
  )
}
