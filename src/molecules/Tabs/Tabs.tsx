import React, { createContext, useContext, useId, useState } from 'react'
import { cn } from '@/lib/utils'

// ── Context ───────────────────────────────────────────────────────────────────

interface TabsContextValue {
  activeValue: string
  setActiveValue: (value: string) => void
  variant: 'line' | 'pill' | 'card'
  idPrefix: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs compound components must be used inside <Tabs>')
  return ctx
}

// ── Tabs ──────────────────────────────────────────────────────────────────────

export interface TabsProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  variant?: 'line' | 'pill' | 'card'
  className?: string
  children: React.ReactNode
}

export function Tabs({
  value,
  defaultValue,
  onChange,
  variant = 'line',
  className,
  children,
}: TabsProps) {
  const idPrefix = useId()
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')

  const activeValue = isControlled ? value : internalValue

  function setActiveValue(next: string) {
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue, variant, idPrefix }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  )
}

// ── TabList ───────────────────────────────────────────────────────────────────

export interface TabListProps {
  children: React.ReactNode
  className?: string
}

export function TabList({ children, className }: TabListProps) {
  const { variant } = useTabsContext()
  return (
    <div
      role="tablist"
      className={cn(
        'flex',
        variant === 'line' && 'border-b border-neutral-200',
        variant === 'pill' && 'gap-1',
        variant === 'card' && 'bg-neutral-100 p-1 rounded-lg gap-1',
        className,
      )}
    >
      {children}
    </div>
  )
}

// ── Tab ───────────────────────────────────────────────────────────────────────

export interface TabProps {
  value: string
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

export function Tab({ value, disabled, children, className }: TabProps) {
  const { activeValue, setActiveValue, variant, idPrefix } = useTabsContext()
  const isActive = activeValue === value

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    const tablist = e.currentTarget.closest('[role="tablist"]')
    if (!tablist) return
    const tabs = Array.from(
      tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
    )
    const currentIndex = tabs.indexOf(e.currentTarget)
    if (currentIndex === -1) return

    let nextIndex: number | undefined
    if (e.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length
    else if (e.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') nextIndex = 0
    else if (e.key === 'End') nextIndex = tabs.length - 1

    if (nextIndex !== undefined) {
      e.preventDefault()
      const nextTab = tabs[nextIndex]
      if (nextTab) {
        nextTab.focus()
        const nextValue = nextTab.getAttribute('data-value')
        if (nextValue) setActiveValue(nextValue)
      }
    }
  }

  return (
    <button
      role="tab"
      id={`${idPrefix}-tab-${value}`}
      aria-selected={isActive}
      aria-controls={`${idPrefix}-panel-${value}`}
      data-value={value}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => setActiveValue(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        'inline-flex items-center gap-2 text-sm font-medium transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1',
        disabled && 'opacity-50 cursor-not-allowed',
        variant === 'line' && [
          'px-4 py-2.5 border-b-2 -mb-px',
          isActive
            ? 'border-primary-600 text-primary-700'
            : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300',
        ],
        variant === 'pill' && [
          'px-3 py-1.5 rounded-md',
          isActive ? 'bg-primary-50 text-primary-700' : 'text-neutral-500 hover:text-neutral-700',
        ],
        variant === 'card' && [
          'px-3 py-1.5 rounded-md flex-1 justify-center',
          isActive ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700',
        ],
        className,
      )}
    >
      {children}
    </button>
  )
}

// ── TabPanel ──────────────────────────────────────────────────────────────────

export interface TabPanelProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function TabPanel({ value, children, className }: TabPanelProps) {
  const { activeValue, idPrefix } = useTabsContext()
  const isActive = activeValue === value
  return (
    <div
      role="tabpanel"
      id={`${idPrefix}-panel-${value}`}
      aria-labelledby={`${idPrefix}-tab-${value}`}
      tabIndex={0}
      className={cn('outline-none', !isActive && 'hidden', className)}
    >
      {children}
    </div>
  )
}
