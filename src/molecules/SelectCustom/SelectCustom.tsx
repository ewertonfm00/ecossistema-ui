import React, { useId, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Icon } from '@/atoms/Icon/Icon'

export interface SelectCustomOption {
  value: string
  label: string
  disabled?: boolean
  group?: string
}

export interface SelectCustomProps {
  options: SelectCustomOption[]
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  placeholder?: string
  searchable?: boolean
  multiple?: boolean
  disabled?: boolean
  clearable?: boolean
  id?: string
  'aria-label'?: string
  'aria-describedby'?: string
  noOptionsText?: string
  maxDisplayed?: number
}

export function SelectCustom({
  options,
  value,
  onChange,
  placeholder = 'Selecionar...',
  searchable = false,
  multiple = false,
  disabled = false,
  clearable = false,
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  noOptionsText = 'Nenhuma opção encontrada',
  maxDisplayed = 3,
}: SelectCustomProps) {
  const innerId = useId()
  const selectId = id ?? innerId
  const listboxId = `listbox-${selectId}`

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const selectedValues: string[] = multiple
    ? Array.isArray(value) ? value : []
    : value !== undefined && value !== '' ? [value as string] : []

  const isSelected = useCallback((v: string) => selectedValues.includes(v), [selectedValues])

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  )

  const hasGroups = options.some(o => o.group)
  const groups = hasGroups
    ? Array.from(new Set(filteredOptions.map(o => o.group ?? ''))).filter(Boolean)
    : []

  function openDropdown() {
    setOpen(true)
    setFocusedIndex(-1)
    if (searchable) setTimeout(() => searchRef.current?.focus(), 0)
  }

  function closeDropdown() {
    setOpen(false)
    setSearch('')
    setFocusedIndex(-1)
  }

  function handleSelect(opt: SelectCustomOption) {
    if (opt.disabled) return
    if (multiple) {
      const arr = [...selectedValues]
      const idx = arr.indexOf(opt.value)
      if (idx >= 0) arr.splice(idx, 1)
      else arr.push(opt.value)
      onChange?.(arr)
    } else {
      onChange?.(opt.value)
      closeDropdown()
    }
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation()
    onChange?.(multiple ? [] : '')
  }

  function removeChip(v: string, e: React.MouseEvent) {
    e.stopPropagation()
    const arr = selectedValues.filter(s => s !== v)
    onChange?.(arr)
  }

  function handleContainerBlur(e: React.FocusEvent) {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      closeDropdown()
    }
  }

  function handleTriggerKeyDown(e: React.KeyboardEvent) {
    if (disabled) return
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        open ? closeDropdown() : openDropdown()
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!open) openDropdown()
        setFocusedIndex(i => Math.min(i + 1, filteredOptions.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(i => Math.max(i - 1, 0))
        break
      case 'Home':
        e.preventDefault()
        setFocusedIndex(0)
        break
      case 'End':
        e.preventDefault()
        setFocusedIndex(filteredOptions.length - 1)
        break
      case 'Escape':
        e.preventDefault()
        closeDropdown()
        break
      case 'Tab':
        closeDropdown()
        break
    }
  }

  function handleOptionKeyDown(e: React.KeyboardEvent, opt: SelectCustomOption) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleSelect(opt)
    }
  }

  const focusedOption = focusedIndex >= 0 && focusedIndex < filteredOptions.length
    ? filteredOptions[focusedIndex]
    : undefined
  const focusedOptionId = focusedOption
    ? `option-${selectId}-${focusedOption.value}`
    : undefined

  function renderTriggerContent() {
    if (multiple) {
      if (selectedValues.length === 0) {
        return <span className="text-neutral-400">{placeholder}</span>
      }
      const displayed = selectedValues.slice(0, maxDisplayed)
      const extra = selectedValues.length - maxDisplayed
      return (
        <div className="flex flex-wrap gap-1 flex-1 min-w-0">
          {displayed.map(v => {
            const opt = options.find(o => o.value === v)
            return (
              <span key={v} className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-100 text-primary-800 text-xs rounded-full">
                {opt?.label ?? v}
                <button
                  type="button"
                  onClick={(e) => removeChip(v, e)}
                  aria-label={`Remover ${opt?.label ?? v}`}
                  className="hover:text-primary-900"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )
          })}
          {extra > 0 && (
            <span className="text-xs text-neutral-500">+{extra} mais</span>
          )}
        </div>
      )
    } else {
      const selectedOpt = options.find(o => o.value === (value as string))
      return selectedOpt
        ? <span className="text-neutral-900">{selectedOpt.label}</span>
        : <span className="text-neutral-400">{placeholder}</span>
    }
  }

  function renderOption(opt: SelectCustomOption, idx: number) {
    const selected = isSelected(opt.value)
    const isFocused = focusedIndex === idx
    return (
      <div
        key={opt.value}
        id={`option-${selectId}-${opt.value}`}
        role="option"
        aria-selected={selected}
        aria-disabled={opt.disabled}
        onClick={() => handleSelect(opt)}
        onKeyDown={(e) => handleOptionKeyDown(e, opt)}
        tabIndex={-1}
        className={cn(
          'flex items-center justify-between px-3 py-2 text-sm cursor-pointer select-none',
          isFocused && 'bg-neutral-100',
          selected && !isFocused && 'bg-primary-50',
          opt.disabled && 'text-neutral-300 cursor-not-allowed pointer-events-none',
          !opt.disabled && !isFocused && 'hover:bg-neutral-50',
          'text-neutral-900'
        )}
      >
        <span>{opt.label}</span>
        {selected && <Icon name="Check" size={16} className="text-primary-700 flex-shrink-0" />}
      </div>
    )
  }

  function renderOptions() {
    if (filteredOptions.length === 0) {
      return <div className="px-3 py-2 text-sm text-neutral-400">{noOptionsText}</div>
    }
    if (!hasGroups) {
      return filteredOptions.map((opt, idx) => renderOption(opt, idx))
    }
    return groups.map(groupName => {
      const groupOpts = filteredOptions.filter(o => (o.group ?? '') === groupName)
      return (
        <div key={groupName} role="group" aria-label={groupName}>
          <div className="px-3 py-1 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            {groupName}
          </div>
          {groupOpts.map((opt) => renderOption(opt, filteredOptions.indexOf(opt)))}
        </div>
      )
    })
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onBlur={handleContainerBlur}
    >
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-activedescendant={focusedOptionId}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={() => open ? closeDropdown() : openDropdown()}
        onKeyDown={handleTriggerKeyDown}
        data-testid="select-custom-trigger"
        className={cn(
          'w-full flex items-center justify-between gap-2 px-3 py-2 border border-neutral-300 rounded-md text-sm bg-white',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          disabled && 'opacity-50 cursor-not-allowed bg-neutral-50',
          open && 'ring-2 ring-primary-500 border-primary-500'
        )}
      >
        <div className="flex-1 min-w-0 text-left flex flex-wrap gap-1">
          {renderTriggerContent()}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {clearable && selectedValues.length > 0 && (
            <span
              role="button"
              onClick={handleClear}
              aria-label="Limpar seleção"
              className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
            >
              <Icon name="X" size={14} />
            </span>
          )}
          <Icon
            name="ChevronDown"
            size={16}
            className={cn('text-neutral-400 transition-transform duration-200', open && 'rotate-180')}
          />
        </div>
      </button>

      {open && (
        <div
          id={listboxId}
          role="listbox"
          aria-multiselectable={multiple}
          aria-label={ariaLabel}
          className="absolute z-50 mt-1 w-full bg-white border border-neutral-200 rounded-md shadow-lg overflow-hidden"
          data-testid="select-custom-listbox"
        >
          {searchable && (
            <div className="p-2 border-b border-neutral-100">
              <div className="relative">
                <Icon name="Search" size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  ref={searchRef}
                  type="text"
                  role="searchbox"
                  aria-label="Buscar opções"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setFocusedIndex(-1) }}
                  placeholder="Buscar..."
                  className="w-full pl-7 pr-2 py-1.5 text-sm border border-neutral-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>
          )}
          <div className="max-h-60 overflow-y-auto">
            {renderOptions()}
          </div>
        </div>
      )}
    </div>
  )
}

SelectCustom.displayName = 'SelectCustom'
