import { useState } from 'react'
import { cn } from '@/lib/utils'

export interface AvatarProps {
  src?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  alt?: string
  className?: string
}

const sizeClasses = {
  xs: 'size-6 text-xs',
  sm: 'size-8 text-sm',
  md: 'size-10 text-base',
  lg: 'size-12 text-lg',
  xl: 'size-16 text-xl',
  '2xl': 'size-24 text-2xl',
}

function getInitials(name?: string): string {
  if (!name) return '?'
  const words = name.trim().split(/\s+/)
  const initials = words.slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('')
  return initials || '?'
}

export function Avatar({ src, name, size = 'md', alt, className }: AvatarProps) {
  const [imgError, setImgError] = useState(false)
  const showImage = src && !imgError
  const initials = getInitials(name)

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full overflow-hidden',
        sizeClasses[size],
        !showImage && 'bg-primary-100 text-primary-700 font-medium',
        className,
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? name ?? 'Avatar'}
          className="size-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}
