import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva('bg-white rounded-lg', {
  variants: {
    variant: {
      default: 'shadow-sm',
      flat: '',
      outlined: 'border border-neutral-200',
    },
    padding: {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
  },
})

export interface CardProps extends VariantProps<typeof cardVariants> {
  header?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function Card({ variant, padding, header, footer, children, className }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, padding }), className)}>
      {header && (
        <div className="border-b border-neutral-100 pb-4 mb-4">{header}</div>
      )}
      {children}
      {footer && (
        <div className="border-t border-neutral-100 pt-4 mt-4">{footer}</div>
      )}
    </div>
  )
}
