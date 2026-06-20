import { cn } from '@/lib/utils'
import { Label } from '../../atoms/Label'

export interface FormFieldProps {
  label: string
  htmlFor: string
  required?: boolean
  optional?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
  className?: string
}

export function FormField({ label, htmlFor, required, optional, error, hint, children, className }: FormFieldProps) {
  const labelVariant = error ? 'error' : required ? 'required' : optional ? 'optional' : 'default'

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <Label htmlFor={htmlFor} variant={labelVariant}>
        {label}
      </Label>
      {children}
      {error ? (
        <span className="text-xs text-accent-600 mt-1">{error}</span>
      ) : hint ? (
        <span className="text-xs text-neutral-400 mt-1">{hint}</span>
      ) : null}
    </div>
  )
}
