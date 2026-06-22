import React, { useEffect, useId, useRef } from 'react'
import ReactDOM from 'react-dom'
import { cn } from '@/lib/utils'
import { Icon } from '@/atoms/Icon/Icon'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  size?: 'sm' | 'md' | 'lg'
  hideCloseButton?: boolean
  children: React.ReactNode
  footer?: React.ReactNode
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function Modal({
  open,
  onClose,
  title,
  size = 'md',
  hideCloseButton = false,
  children,
  footer,
}: ModalProps) {
  const id = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<Element | null>(null)

  useEffect(() => {
    if (!open) return
    previousFocusRef.current = document.activeElement
    document.body.style.overflow = 'hidden'

    const timeout = setTimeout(() => {
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (focusable && focusable.length > 0) {
        focusable[0]?.focus()
      } else {
        panelRef.current?.focus()
      }
    }, 0)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      clearTimeout(timeout)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus()
      }
    }
  }, [open, onClose])

  if (!open) return null

  return ReactDOM.createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${id}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
        data-testid="modal-overlay"
      />
      {/* Painel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn('relative bg-white rounded-lg shadow-xl w-full outline-none', sizeClasses[size])}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 id={`modal-title-${id}`} className="text-lg font-semibold text-neutral-900">
            {title}
          </h2>
          {!hideCloseButton && (
            <button
              onClick={onClose}
              aria-label="Fechar modal"
              className="p-1 rounded hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          )}
        </div>
        {/* Body */}
        <div className="p-6">{children}</div>
        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-3 p-6 border-t border-neutral-200">{footer}</div>
        )}
      </div>
    </div>,
    document.body
  )
}

Modal.displayName = 'Modal'
