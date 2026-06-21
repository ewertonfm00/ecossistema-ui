import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DataTable } from './DataTable'
import type { DataTableColumn } from './DataTable'

type Row = { id: number; name: string }

const columns: DataTableColumn<Row>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Nome' },
]

const makeData = (count: number): Row[] =>
  Array.from({ length: count }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }))

describe('DataTable', () => {
  it('renderiza headers das colunas', () => {
    render(<DataTable columns={columns} data={[]} />)
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Nome')).toBeInTheDocument()
  })

  it('renderiza rows de dados', () => {
    const data = makeData(3)
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  it('exibe emptyMessage quando data=[] e loading=false', () => {
    render(<DataTable columns={columns} data={[]} emptyMessage="Sem dados" />)
    expect(screen.getByText('Sem dados')).toBeInTheDocument()
  })

  it('paginação: Próximo avança para página 2, Anterior volta para página 1', () => {
    const data = makeData(15)
    render(<DataTable columns={columns} data={data} pageSize={10} />)

    // Página 1 — itens 1-10 visíveis, item 11 não
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.queryByText('Item 11')).not.toBeInTheDocument()

    // Avança para página 2
    fireEvent.click(screen.getByRole('button', { name: 'Próximo' }))
    expect(screen.getByText('Item 11')).toBeInTheDocument()
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument()

    // Volta para página 1
    fireEvent.click(screen.getByRole('button', { name: 'Anterior' }))
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.queryByText('Item 11')).not.toBeInTheDocument()
  })

  it('loading=true renderiza Skeleton no lugar das rows', () => {
    render(<DataTable columns={columns} data={[]} loading={true} pageSize={5} />)
    // Skeleton renders with role="presentation"
    const skeletons = document.querySelectorAll('[role="presentation"]')
    // 5 rows * 2 columns = 10 skeletons
    expect(skeletons.length).toBe(10)
  })
})
