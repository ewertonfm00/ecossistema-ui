import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../../atoms/Button/Button'
import { Skeleton } from '../../atoms/Skeleton/Skeleton'

export interface DataTableColumn<T> {
  key: keyof T | string
  header: string
  render?: (value: unknown, row: T) => React.ReactNode
  width?: string
}

export interface DataTableProps<T extends object> {
  columns: DataTableColumn<T>[]
  data: T[]
  pageSize?: number
  emptyMessage?: string
  loading?: boolean
  className?: string
}

export function DataTable<T extends object>({
  columns,
  data,
  pageSize = 10,
  emptyMessage = 'Nenhum registro encontrado',
  loading,
  className,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize))
  const sliced = data.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className={cn('overflow-hidden rounded-lg border border-neutral-200', className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  scope="col"
                  style={col.width ? { width: col.width } : undefined}
                  className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 bg-white">
            {loading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <tr key={i}>
                  {columns.map(col => (
                    <td key={String(col.key)} className="px-4 py-3">
                      <Skeleton height="1rem" />
                    </td>
                  ))}
                </tr>
              ))
            ) : sliced.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-neutral-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sliced.map((row, i) => (
                <tr key={i} className="hover:bg-neutral-50">
                  {columns.map(col => {
                    const val = (row as Record<string, unknown>)[String(col.key)]
                    return (
                      <td key={String(col.key)} className="px-4 py-3 text-neutral-900">
                        {col.render ? col.render(val, row) : String(val ?? '')}
                      </td>
                    )
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {!loading && data.length > pageSize && (
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
