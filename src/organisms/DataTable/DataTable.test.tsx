import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { DataTable } from './DataTable'
import type { DataTableColumn } from './DataTable'

type Row = { id: number; name: string }

const columns: DataTableColumn<Row>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Nome' },
]

const makeData = (count: number): Row[] =>
  Array.from({ length: count }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }))

// ── Testes originais (regressão) ─────────────────────────────────────────────

describe('DataTable — regressão (originais)', () => {
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

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.queryByText('Item 11')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Próximo' }))
    expect(screen.getByText('Item 11')).toBeInTheDocument()
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Anterior' }))
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.queryByText('Item 11')).not.toBeInTheDocument()
  })

  it('loading=true renderiza Skeleton no lugar das rows', () => {
    render(<DataTable columns={columns} data={[]} loading={true} pageSize={5} />)
    const skeletons = document.querySelectorAll('[role="presentation"]')
    expect(skeletons.length).toBe(10)
  })
})

// ── Sorting ───────────────────────────────────────────────────────────────────

describe('DataTable — Sorting', () => {
  type SortRow = { id: number; name: string }
  const sortData: SortRow[] = [
    { id: 3, name: 'Cebola' },
    { id: 1, name: 'Abacate' },
    { id: 2, name: 'Banana' },
  ]
  const sortCols: DataTableColumn<SortRow>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nome', sortable: true },
  ]

  it('primeiro clique ordena ASC — primeiro item é Abacate', () => {
    render(<DataTable columns={sortCols} data={sortData} />)
    fireEvent.click(screen.getByRole('button', { name: 'Ordenar por Nome' }))
    const cells = screen.getAllByRole('cell')
    expect(cells[1]?.textContent).toBe('Abacate')
  })

  it('segundo clique ordena DESC — primeiro item é Cebola', () => {
    render(<DataTable columns={sortCols} data={sortData} />)
    fireEvent.click(screen.getByRole('button', { name: 'Ordenar por Nome' }))
    fireEvent.click(screen.getByRole('button', { name: 'Nome — ordenado crescente' }))
    const cells = screen.getAllByRole('cell')
    expect(cells[1]?.textContent).toBe('Cebola')
  })

  it('terceiro clique restaura ordem original — primeiro item é Cebola (original)', () => {
    render(<DataTable columns={sortCols} data={sortData} />)
    fireEvent.click(screen.getByRole('button', { name: 'Ordenar por Nome' }))
    fireEvent.click(screen.getByRole('button', { name: 'Nome — ordenado crescente' }))
    fireEvent.click(screen.getByRole('button', { name: 'Nome — ordenado decrescente' }))
    const cells = screen.getAllByRole('cell')
    expect(cells[1]?.textContent).toBe('Cebola')
  })

  it('aria-label reflete estado ASC ativo após primeiro clique', () => {
    render(<DataTable columns={sortCols} data={sortData} />)
    fireEvent.click(screen.getByRole('button', { name: 'Ordenar por Nome' }))
    expect(screen.getByRole('button', { name: 'Nome — ordenado crescente' })).toBeInTheDocument()
  })
})

// ── Filtering ─────────────────────────────────────────────────────────────────

describe('DataTable — Filtering', () => {
  type FilterRow = { id: number; name: string; status: string }
  const filterData: FilterRow[] = [
    { id: 1, name: 'Alice', status: 'active' },
    { id: 2, name: 'Bob', status: 'inactive' },
    { id: 3, name: 'Ana', status: 'active' },
  ]
  const filterCols: DataTableColumn<FilterRow>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nome', filterable: true },
    {
      key: 'status',
      header: 'Status',
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'active', label: 'Ativo' },
        { value: 'inactive', label: 'Inativo' },
      ],
    },
  ]

  it('filtro de texto reduz linhas visíveis', () => {
    render(<DataTable columns={filterCols} data={filterData} />)
    fireEvent.change(screen.getByRole('textbox', { name: 'Filtrar por Nome' }), {
      target: { value: 'A' },
    })
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Ana')).toBeInTheDocument()
    expect(screen.queryByText('Bob')).not.toBeInTheDocument()
  })

  it('filterType select filtra corretamente', () => {
    render(<DataTable columns={filterCols} data={filterData} />)
    fireEvent.change(screen.getByRole('combobox', { name: 'Filtrar por Status' }), {
      target: { value: 'inactive' },
    })
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.queryByText('Alice')).not.toBeInTheDocument()
    expect(screen.queryByText('Ana')).not.toBeInTheDocument()
  })

  it('botão Limpar filtros remove filtro e restaura todos os dados', () => {
    render(<DataTable columns={filterCols} data={filterData} />)
    fireEvent.change(screen.getByRole('textbox', { name: 'Filtrar por Nome' }), {
      target: { value: 'A' },
    })
    expect(screen.queryByText('Bob')).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('Limpar filtros'))
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Ana')).toBeInTheDocument()
  })

  it('badge N filtro ativo aparece quando há filtro ativo', () => {
    render(<DataTable columns={filterCols} data={filterData} />)
    fireEvent.change(screen.getByRole('textbox', { name: 'Filtrar por Nome' }), {
      target: { value: 'Alice' },
    })
    expect(screen.getByText('1 filtro ativo')).toBeInTheDocument()
  })

  it('badge 2 filtros ativos quando dois filtros simultâneos', () => {
    render(<DataTable columns={filterCols} data={filterData} />)
    fireEvent.change(screen.getByRole('textbox', { name: 'Filtrar por Nome' }), {
      target: { value: 'A' },
    })
    fireEvent.change(screen.getByRole('combobox', { name: 'Filtrar por Status' }), {
      target: { value: 'active' },
    })
    expect(screen.getByText('2 filtros ativos')).toBeInTheDocument()
  })
})

// ── Seleção ───────────────────────────────────────────────────────────────────

describe('DataTable — Seleção', () => {
  it('checkbox de linha chama onSelectionChange com a linha correta', () => {
    const onSelectionChange = vi.fn()
    render(
      <DataTable
        columns={columns}
        data={makeData(3)}
        selectable
        onSelectionChange={onSelectionChange}
      />,
    )
    fireEvent.click(screen.getByRole('checkbox', { name: 'Selecionar linha 1' }))
    expect(onSelectionChange).toHaveBeenCalledWith([{ id: 1, name: 'Item 1' }])
  })

  it('checkbox do header seleciona todas as linhas da página', () => {
    const onSelectionChange = vi.fn()
    const data = makeData(3)
    render(
      <DataTable
        columns={columns}
        data={data}
        selectable
        onSelectionChange={onSelectionChange}
        pageSize={10}
      />,
    )
    fireEvent.click(screen.getByRole('checkbox', { name: 'Selecionar todos da página' }))
    expect(onSelectionChange).toHaveBeenCalledWith(data)
  })

  it('linha selecionada tem classe bg-primary-50', () => {
    render(<DataTable columns={columns} data={makeData(3)} selectable />)
    fireEvent.click(screen.getByRole('checkbox', { name: 'Selecionar linha 1' }))
    const row = screen.getByText('Item 1').closest('tr')
    expect(row).toHaveClass('bg-primary-50')
  })

  it('contador N selecionados aparece quando há seleção', () => {
    render(<DataTable columns={columns} data={makeData(3)} selectable />)
    fireEvent.click(screen.getByRole('checkbox', { name: 'Selecionar linha 1' }))
    expect(screen.getByText('1 selecionado')).toBeInTheDocument()
  })

  it('checkbox do header fica indeterminate quando seleção parcial', () => {
    render(<DataTable columns={columns} data={makeData(3)} selectable pageSize={10} />)
    fireEvent.click(screen.getByRole('checkbox', { name: 'Selecionar linha 1' }))
    const headerCheckbox = screen.getByRole('checkbox', {
      name: 'Selecionar todos da página',
    }) as HTMLInputElement
    expect(headerCheckbox.indeterminate).toBe(true)
  })
})

// ── Export CSV ────────────────────────────────────────────────────────────────

describe('DataTable — Export CSV', () => {
  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => 'blob:mock')
    global.URL.revokeObjectURL = vi.fn()
  })

  it('botão Exportar CSV chama URL.createObjectURL', () => {
    render(<DataTable columns={columns} data={makeData(2)} exportable />)
    fireEvent.click(screen.getByText('Exportar CSV'))
    expect(URL.createObjectURL).toHaveBeenCalled()
  })

  it('botão Exportar CSV está visível quando exportable=true', () => {
    render(<DataTable columns={columns} data={makeData(2)} exportable />)
    expect(screen.getByText('Exportar CSV')).toBeInTheDocument()
  })
})

// ── Empty state com ação ──────────────────────────────────────────────────────

describe('DataTable — Empty state', () => {
  it('emptyAction renderiza CTA dentro do empty state', () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        emptyAction={<button>+ Novo Item</button>}
      />,
    )
    expect(screen.getByRole('button', { name: '+ Novo Item' })).toBeInTheDocument()
  })

  it('SVG do ícone Inbox presente no empty state', () => {
    render(<DataTable columns={columns} data={[]} />)
    const cell = screen.getAllByRole('cell')[0]
    expect(cell?.querySelector('svg')).not.toBeNull()
  })
})

// ── Coluna de ações ───────────────────────────────────────────────────────────

describe('DataTable — actionsColumn', () => {
  it('renderiza ação por linha para cada linha', () => {
    render(
      <DataTable
        columns={columns}
        data={makeData(2)}
        actionsColumn={row => <button>Editar {row.id}</button>}
      />,
    )
    expect(screen.getByRole('button', { name: 'Editar 1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Editar 2' })).toBeInTheDocument()
  })
})
