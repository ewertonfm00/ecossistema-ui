import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../../atoms/Button/Button'
import { Skeleton } from '../../atoms/Skeleton/Skeleton'
import { Icon } from '../../atoms/Icon/Icon'
import { Badge } from '../../atoms/Badge'

type SortDirection = 'asc' | 'desc' | null

export interface DataTableColumn<T> {
  key: keyof T | string
  header: string
  render?: (value: unknown, row: T) => React.ReactNode
  width?: string
  sortable?: boolean
  filterable?: boolean
  filterType?: 'text' | 'select'
  filterOptions?: { value: string; label: string }[]
}

export interface DataTableProps<T extends object> {
  columns: DataTableColumn<T>[]
  data: T[]
  pageSize?: number
  emptyMessage?: string
  loading?: boolean
  className?: string
  selectable?: boolean
  onSelectionChange?: (selected: T[]) => void
  exportable?: boolean
  exportFilename?: string
  emptyAction?: React.ReactNode
  actionsColumn?: (row: T) => React.ReactNode
}

export function DataTable<T extends object>({
  columns,
  data,
  pageSize = 10,
  emptyMessage = 'Nenhum registro encontrado',
  loading,
  className,
  selectable,
  onSelectionChange,
  exportable,
  exportFilename = 'export',
  emptyAction,
  actionsColumn,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>(null)
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const isFirstSelectionEffect = useRef(true)

  useEffect(() => {
    setPage(1)
  }, [filters, sortKey])

  useEffect(() => {
    if (isFirstSelectionEffect.current) {
      isFirstSelectionEffect.current = false
      return
    }
    if (onSelectionChange) {
      onSelectionChange(
        Array.from(selected)
          .map(i => data[i])
          .filter((r): r is T => r !== undefined),
      )
    }
  }, [selected, data, onSelectionChange])

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  function filterData(rows: T[]): T[] {
    return rows.filter(row =>
      Object.entries(filters).every(([key, val]) => {
        if (!val) return true
        const cellVal = String((row as Record<string, unknown>)[key] ?? '')
        return cellVal.toLowerCase().includes(val.toLowerCase())
      }),
    )
  }

  function sortData(rows: T[]): T[] {
    if (!sortKey || !sortDir) return rows
    return [...rows].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey]
      const bVal = (b as Record<string, unknown>)[sortKey]
      if (aVal == null) return 1
      if (bVal == null) return -1
      const cmp = String(aVal).localeCompare(String(bVal), 'pt-BR', {
        numeric: true,
        sensitivity: 'base',
      })
      return sortDir === 'asc' ? cmp : -cmp
    })
  }

  const filteredData = filterData(data)
  const sortedData = sortData(filteredData)
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize))
  const sliced = sortedData.slice((page - 1) * pageSize, page * pageSize)
  const slicedOriginalIndexes = sliced.map(row => data.indexOf(row))
  const pageSelectedCount = slicedOriginalIndexes.filter(i => selected.has(i)).length
  const pageSelected =
    slicedOriginalIndexes.length > 0 && pageSelectedCount === slicedOriginalIndexes.length
  const partialSelected = pageSelectedCount > 0 && !pageSelected
  const totalColumns = columns.length + (selectable ? 1 : 0) + (actionsColumn ? 1 : 0)
  const showTopBar = exportable || (!!selectable && selected.size > 0) || activeFilterCount > 0

  function handleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir('asc')
    } else if (sortDir === 'asc') {
      setSortDir('desc')
    } else {
      setSortKey(null)
      setSortDir(null)
    }
  }

  function handleFilter(key: string, value: string) {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  function handleSelectRow(originalIndex: number, checked: boolean) {
    setSelected(prev => {
      const next = new Set(prev)
      if (checked) next.add(originalIndex)
      else next.delete(originalIndex)
      return next
    })
  }

  function handleSelectPage(checked: boolean) {
    setSelected(prev => {
      const next = new Set(prev)
      if (checked) {
        slicedOriginalIndexes.forEach(i => next.add(i))
      } else {
        slicedOriginalIndexes.forEach(i => next.delete(i))
      }
      return next
    })
  }

  function handleExport() {
    const exportRows =
      selected.size > 0
        ? Array.from(selected)
            .map(i => data[i])
            .filter((r): r is T => r !== undefined)
        : filteredData

    const headers = columns.map(col => col.header)
    const csvRows = exportRows.map(row =>
      columns
        .map(col => {
          const val = (row as Record<string, unknown>)[String(col.key)]
          const str = String(val ?? '')
          return str.includes(',') || str.includes('"') || str.includes('\n')
            ? `"${str.replace(/"/g, '""')}"`
            : str
        })
        .join(','),
    )

    const bom = '﻿'
    const csv = bom + [headers.join(','), ...csvRows].join('\r\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${exportFilename}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  function getSortIcon(colKey: string): string {
    if (sortKey !== colKey) return 'ArrowUpDown'
    return sortDir === 'asc' ? 'ArrowUp' : 'ArrowDown'
  }

  function getSortLabel(col: DataTableColumn<T>): string {
    const key = String(col.key)
    if (sortKey !== key) return `Ordenar por ${col.header}`
    return sortDir === 'asc'
      ? `${col.header} — ordenado crescente`
      : `${col.header} — ordenado decrescente`
  }

  return (
    <div className={cn('overflow-hidden rounded-lg border border-neutral-200', className)}>
      {showTopBar && (
        <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-neutral-100">
          <div className="flex items-center gap-3">
            {selectable && selected.size > 0 && (
              <span className="text-sm text-neutral-600">
                {selected.size} {selected.size === 1 ? 'selecionado' : 'selecionados'}
              </span>
            )}
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="primary" badgeStyle="soft">
                  {activeFilterCount} {activeFilterCount === 1 ? 'filtro ativo' : 'filtros ativos'}
                </Badge>
                <button
                  onClick={() => setFilters({})}
                  className="text-xs text-primary-600 hover:underline"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
          {exportable && (
            <button
              onClick={handleExport}
              className="flex items-center gap-1 px-3 py-1.5 text-sm border border-neutral-200 rounded-md hover:bg-neutral-50 text-neutral-700"
            >
              <Icon name="Download" size={14} />
              Exportar CSV
            </button>
          )}
        </div>
      )}

      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 sticky top-0 z-10">
            <tr>
              {selectable && (
                <th scope="col" className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    ref={el => {
                      if (el) el.indeterminate = partialSelected
                    }}
                    checked={pageSelected}
                    onChange={e => handleSelectPage(e.target.checked)}
                    aria-label="Selecionar todos da página"
                    className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
              )}
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  scope="col"
                  style={col.width ? { width: col.width } : undefined}
                  className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide"
                >
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(String(col.key))}
                      className="inline-flex items-center gap-1 hover:text-neutral-900 uppercase font-medium tracking-wide"
                      aria-label={getSortLabel(col)}
                    >
                      {col.header}
                      <Icon
                        name={getSortIcon(String(col.key))}
                        size={14}
                        className={
                          sortKey === String(col.key) ? 'text-primary-600' : 'text-neutral-400'
                        }
                      />
                    </button>
                  ) : (
                    col.header
                  )}
                  {col.filterable && col.filterType === 'select' ? (
                    <select
                      value={filters[String(col.key)] ?? ''}
                      onChange={e => handleFilter(String(col.key), e.target.value)}
                      className="mt-1 w-full px-2 py-1 text-xs border border-neutral-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 normal-case font-normal tracking-normal"
                      aria-label={`Filtrar por ${col.header}`}
                    >
                      <option value="">Todos</option>
                      {col.filterOptions?.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : col.filterable ? (
                    <input
                      type="text"
                      placeholder={`Filtrar ${col.header}...`}
                      value={filters[String(col.key)] ?? ''}
                      onChange={e => handleFilter(String(col.key), e.target.value)}
                      className="mt-1 w-full px-2 py-1 text-xs border border-neutral-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 normal-case font-normal tracking-normal"
                      aria-label={`Filtrar por ${col.header}`}
                    />
                  ) : null}
                </th>
              ))}
              {actionsColumn && (
                <th scope="col" className="px-4 py-3 text-right">
                  <span className="sr-only">Ações</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 bg-white">
            {loading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <tr key={i}>
                  {selectable && (
                    <td className="w-10 px-4 py-3">
                      <Skeleton height="1rem" />
                    </td>
                  )}
                  {columns.map(col => (
                    <td key={String(col.key)} className="px-4 py-3">
                      <Skeleton height="1rem" />
                    </td>
                  ))}
                  {actionsColumn && (
                    <td className="px-4 py-3">
                      <Skeleton height="1rem" />
                    </td>
                  )}
                </tr>
              ))
            ) : sliced.length === 0 ? (
              <tr>
                <td colSpan={totalColumns} className="px-4 py-12">
                  <div className="flex flex-col items-center justify-center text-center">
                    <Icon name="Inbox" size={40} className="text-neutral-300 mb-3" />
                    <p className="text-sm text-neutral-500">{emptyMessage}</p>
                    {emptyAction && <div className="mt-4">{emptyAction}</div>}
                  </div>
                </td>
              </tr>
            ) : (
              sliced.map(row => {
                const originalIndex = data.indexOf(row)
                return (
                  <tr
                    key={originalIndex}
                    className={cn(
                      'hover:bg-neutral-50',
                      selected.has(originalIndex) && 'bg-primary-50',
                    )}
                  >
                    {selectable && (
                      <td className="w-10 px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selected.has(originalIndex)}
                          onChange={e => handleSelectRow(originalIndex, e.target.checked)}
                          aria-label={`Selecionar linha ${originalIndex + 1}`}
                          className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                        />
                      </td>
                    )}
                    {columns.map(col => {
                      const val = (row as Record<string, unknown>)[String(col.key)]
                      return (
                        <td key={String(col.key)} className="px-4 py-3 text-neutral-900">
                          {col.render ? col.render(val, row) : String(val ?? '')}
                        </td>
                      )
                    })}
                    {actionsColumn && (
                      <td className="px-4 py-3 text-right">{actionsColumn(row)}</td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {!loading && sortedData.length > pageSize && (
        <div
          aria-label="Paginação"
          className="bg-white border-t border-neutral-200 px-4 py-3 flex items-center justify-between"
        >
          <span className="text-sm text-neutral-500">
            Página {page} de {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
            >
              Anterior
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              Próximo
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
