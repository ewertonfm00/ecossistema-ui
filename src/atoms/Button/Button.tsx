import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Spinner } from '../Spinner'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.97] transition-transform duration-75',
  {
    variants: {
      variant: {
        primary: 'bg-primary-700 text-white hover:bg-primary-800 focus:shadow-focus',
        secondary: 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50 focus:shadow-focus',
        ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 focus:shadow-focus',
        soft: 'bg-primary-50 text-primary-700 hover:bg-primary-100 focus:shadow-focus',
        destructive: 'bg-accent-600 text-white hover:bg-accent-700 focus:shadow-focus-accent',
        'destructive-ghost': 'bg-transparent text-accent-600 hover:bg-accent-50 focus:shadow-focus-accent',
        link: 'bg-transparent text-primary-600 underline-offset-4 hover:underline hover:text-primary-700 focus:shadow-focus',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs gap-1.5',
        sm: 'h-9 px-3 text-sm gap-1.5',
        md: 'h-10 px-4 text-sm font-semibold gap-2',
        lg: 'h-11 px-6 text-base font-semibold gap-2',
        xl: 'h-12 px-8 text-lg font-semibold gap-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  iconOnly?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, loading, leftIcon, rightIcon, fullWidth, iconOnly, children, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth && 'w-full',
          iconOnly && 'aspect-square',
          className,
        )}
        {...props}
      >
        {loading ? (
          <Spinner size="sm" color={variant === 'primary' || variant === 'destructive' ? 'neutral' : 'primary'} />
        ) : (
          leftIcon
        )}
        {!iconOnly && children}
        {!loading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
