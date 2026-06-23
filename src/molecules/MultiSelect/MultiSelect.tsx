import React, { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MultiSelectOption {
  value: string
  label: string
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  searchable?: boolean
  disabled?: boolean
  className?: string
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Selecione...',
  searchable = true,
  disabled = false,
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [])

  useEffect(() => {
    if (isOpen && searchable) {
      searchRef.current?.focus()
    }
  }, [isOpen, searchable])

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase()),
  )

  function toggle(optValue: string) {
    if (value.includes(optValue)) {
      onChange(value.filter(v => v !== optValue))
    } else {
      onChange([...value, optValue])
    }
  }

  function removeTag(optValue: string, e: React.MouseEvent) {
    e.stopPropagation()
    onChange(value.filter(v => v !== optValue))
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') { setIsOpen(false); setSearch('') }
    if (e.key === 'Backspace' && search === '' && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const selectedLabels = value.map(v => options.find(o => o.value === v)).filter(Boolean) as MultiSelectOption[]

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => { if (!disabled) { setIsOpen(o => !o) } }}
        className={cn(
          'flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-md border px-3 py-2 text-sm transition-colors',
          disabled
            ? 'cursor-not-allowed bg-neutral-100 border-neutral-200 opacity-60'
            : 'cursor-pointer bg-white border-neutral-300 hover:border-neutral-400 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500',
        )}
      >
        {selectedLabels.map(opt => (
          <span
            key={opt.value}
            className="inline-flex items-center gap-1 rounded bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700"
          >
            {opt.label}
            <button
              type="button"
              onClick={e => removeTag(opt.value, e)}
              aria-label={`Remover ${opt.label}`}
              className="text-primary-500 hover:text-primary-800"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {searchable && isOpen ? (
          <input
            ref={searchRef}
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={value.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[80px] outline-none bg-transparent text-sm"
          />
        ) : (
          value.length === 0 && (
            <span className="text-neutral-400 text-sm">{placeholder}</span>
          )
        )}
        <ChevronDown
          className={cn('ml-auto h-4 w-4 text-neutral-400 transition-transform', isOpen && 'rotate-180')}
        />
      </div>

      {isOpen && (
        <ul
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-50 mt-1 w-full rounded-md border border-neutral-200 bg-white shadow-lg max-h-60 overflow-y-auto"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-neutral-400">Nenhuma opção encontrada</li>
          ) : (
            filtered.map(opt => {
              const isSelected = value.includes(opt.value)
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => toggle(opt.value)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer',
                    isSelected ? 'bg-primary-50 text-primary-700' : 'text-neutral-700 hover:bg-neutral-50',
                  )}
                >
                  <span className={cn('flex h-4 w-4 items-center justify-center rounded border', isSelected ? 'border-primary-600 bg-primary-600' : 'border-neutral-300')}>
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </span>
                  {opt.label}
                </li>
              )
            })
          )}
        </ul>
      )}
    </div>
  )
}
