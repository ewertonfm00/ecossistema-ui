import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { cn } from '@/lib/utils'
import { Icon } from '@/atoms/Icon/Icon'

export interface Toast {
  id: string
  message: string
  variant: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  title?: string
}

interface ToastContextValue {
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast deve ser usado dentro de ToastProvider')
  return ctx
}

// Geração de id segura para todos os ambientes (Node, browser, jsdom)
function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

const VARIANT_CONFIG = {
  success: { icon: 'CheckCircle2' as const, borderClass: 'border-l-4 border-emerald-500', iconClass: 'text-emerald-500' },
  error:   { icon: 'XCircle'      as const, borderClass: 'border-l-4 border-red-500',     iconClass: 'text-red-500' },
  warning: { icon: 'AlertTriangle' as const, borderClass: 'border-l-4 border-amber-500',  iconClass: 'text-amber-500' },
  info:    { icon: 'Info'          as const, borderClass: 'border-l-4 border-blue-500',   iconClass: 'text-blue-500' },
}

const POSITION_CLASSES = {
  'top-right':    'fixed top-4 right-4',
  'top-left':     'fixed top-4 left-4',
  'bottom-right': 'fixed bottom-4 right-4',
  'bottom-left':  'fixed bottom-4 left-4',
}

interface ToastItemProps {
  toast: Toast
  onClose: (id: string) => void
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const { id, message, variant, title } = toast
  const { icon, borderClass, iconClass } = VARIANT_CONFIG[variant]

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      className={cn(
        'flex items-start gap-3 bg-white shadow-lg rounded-lg p-4 border border-neutral-200 w-80',
        borderClass
      )}
      data-testid="toast-item"
      data-variant={variant}
    >
      <Icon name={icon} className={iconClass} size={20} aria-hidden />
      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-semibold text-neutral-900">{title}</p>}
        <p className="text-sm text-neutral-600">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        aria-label="Fechar notificação"
        className="p-0.5 rounded hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors flex-shrink-0"
      >
        <Icon name="X" size={16} />
      </button>
    </div>
  )
}

export interface ToastProviderProps {
  children: React.ReactNode
  position?: keyof typeof POSITION_CLASSES
  maxToasts?: number
}

export function ToastProvider({ children, position = 'top-right', maxToasts = 5 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const removeToast = useCallback((id: string) => {
    const timer = timersRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timersRef.current.delete(id)
    }
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = generateId()
    const duration = toast.duration ?? 4000

    setToasts(prev => {
      const next = [...prev, { ...toast, id }]
      // Remove o mais antigo se exceder maxToasts
      return next.length > maxToasts ? next.slice(next.length - maxToasts) : next
    })

    if (duration > 0) {
      const timer = setTimeout(() => removeToast(id), duration)
      timersRef.current.set(id, timer)
    }
  }, [maxToasts, removeToast])

  // Cleanup ao desmontar
  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach(timer => clearTimeout(timer))
      timers.clear()
    }
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {ReactDOM.createPortal(
        <div
          className={cn('z-[9999] flex flex-col gap-2', POSITION_CLASSES[position])}
          aria-live="polite"
          aria-atomic="false"
          data-testid="toast-container"
        >
          {toasts.map(toast => (
            <ToastItem key={toast.id} toast={toast} onClose={removeToast} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

ToastProvider.displayName = 'ToastProvider'
