import React, { useEffect, useId, useRef } from 'react'
import ReactDOM from 'react-dom'
import { cn } from '@/lib/utils'
import { Icon } from '@/atoms/Icon/Icon'

export interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  side?: 'right' | 'left'
  width?: 'sm' | 'md' | 'lg'
  hideCloseButton?: boolean
  children: React.ReactNode
  footer?: React.ReactNode
}

const widthClasses = {
  sm: 'w-80',
  md: 'w-96',
  lg: 'w-[480px]',
}

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function Drawer({
  open,
  onClose,
  title,
  side = 'right',
  width = 'md',
  hideCloseButton = false,
  children,
  footer,
}: DrawerProps) {
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
      aria-labelledby={`drawer-title-${id}`}
      className="fixed inset-0 z-50"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
        data-testid="drawer-overlay"
      />
      {/* Painel lateral */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          'absolute inset-y-0 z-10 flex flex-col bg-white shadow-xl outline-none',
          widthClasses[width],
          side === 'right' ? 'right-0' : 'left-0'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 shrink-0">
          <h2 id={`drawer-title-${id}`} className="text-lg font-semibold text-neutral-900">
            {title}
          </h2>
          {!hideCloseButton && (
            <button
              onClick={onClose}
              aria-label="Fechar painel"
              className="p-1 rounded hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          )}
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-3 p-6 border-t border-neutral-200 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

Drawer.displayName = 'Drawer'
