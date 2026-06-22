import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from './DataTable'
import { Badge } from '../../atoms/Badge'
import { Button } from '../../atoms/Button'

type Row = {
  id: number
  name: string
  email: string
  status: string
  role: string
  value: number
}

const mockData: Row[] = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  name: `Usuário ${i + 1}`,
  email: `user${i + 1}@example.com`,
  status: i % 3 === 0 ? 'inactive' : 'active',
  role: i % 5 === 0 ? 'admin' : 'user',
  value: Math.round((i + 1) * 137.5),
}))

const baseColumns = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'name', header: 'Nome' },
  { key: 'email', header: 'Email' },
  {
    key: 'status',
    header: 'Status',
    render: (_: unknown, row: Row) => (
      <Badge variant={row.status === 'active' ? 'success' : 'default'} badgeStyle="soft">
        {row.status === 'active' ? 'Ativo' : 'Inativo'}
      </Badge>
    ),
  },
  { key: 'role', header: 'Papel' },
]

const meta: Meta<typeof DataTable> = {
  title: 'Organisms/DataTable',
  component: DataTable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DataTable>

// ── Stories originais ─────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    columns: baseColumns,
    data: mockData.slice(0, 5),
    pageSize: 10,
  },
}

export const Loading: Story = {
  args: {
    columns: baseColumns,
    data: [],
    loading: true,
    pageSize: 5,
  },
}

export const Empty: Story = {
  args: {
    columns: baseColumns,
    data: [],
    emptyMessage: 'Nenhum usuário encontrado',
  },
}

export const Paginated: Story = {
  args: {
    columns: baseColumns,
    data: mockData,
    pageSize: 10,
  },
}

// ── Sorting ───────────────────────────────────────────────────────────────────

export const Sortable: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', width: '60px', sortable: true },
      { key: 'name', header: 'Nome', sortable: true },
      { key: 'value', header: 'Valor (R$)', sortable: true },
      { key: 'role', header: 'Papel' },
    ],
    data: mockData.slice(0, 10),
    pageSize: 10,
  },
}

// ── Filtering ─────────────────────────────────────────────────────────────────

export const Filterable: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', width: '60px' },
      { key: 'name', header: 'Nome', filterable: true },
      { key: 'email', header: 'Email', filterable: true },
      {
        key: 'status',
        header: 'Status',
        filterable: true,
        filterType: 'select' as const,
        filterOptions: [
          { value: 'active', label: 'Ativo' },
          { value: 'inactive', label: 'Inativo' },
        ],
        render: (_: unknown, row: Row) => (
          <Badge variant={row.status === 'active' ? 'success' : 'default'} badgeStyle="soft">
            {row.status === 'active' ? 'Ativo' : 'Inativo'}
          </Badge>
        ),
      },
    ],
    data: mockData.slice(0, 15),
    pageSize: 10,
  },
}

// ── Seleção ───────────────────────────────────────────────────────────────────

export const Selectable: Story = {
  args: {
    columns: baseColumns,
    data: mockData.slice(0, 8),
    selectable: true,
    pageSize: 10,
    onSelectionChange: (rows: Row[]) => console.log('Selecionados:', rows),
  },
}

// ── Export CSV ────────────────────────────────────────────────────────────────

export const Exportable: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Nome' },
      { key: 'email', header: 'Email' },
      { key: 'value', header: 'Valor' },
    ],
    data: mockData.slice(0, 10),
    exportable: true,
    exportFilename: 'clientes',
    pageSize: 10,
  },
}

// ── Empty state com ação ──────────────────────────────────────────────────────

export const WithEmptyAction: Story = {
  args: {
    columns: baseColumns,
    data: [],
    emptyMessage: 'Nenhum cliente cadastrado ainda.',
    emptyAction: <Button size="sm">+ Novo Cliente</Button>,
  },
}

// ── Coluna de ações ───────────────────────────────────────────────────────────

export const WithActionsColumn: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', width: '60px' },
      { key: 'name', header: 'Nome' },
      { key: 'email', header: 'Email' },
    ],
    data: mockData.slice(0, 5),
    actionsColumn: (row: Row) => (
      <div className="flex items-center justify-end gap-2">
        <Button size="sm" variant="ghost" onClick={() => alert(`Editar ${row.name}`)}>
          Editar
        </Button>
        <Button size="sm" variant="ghost" onClick={() => alert(`Excluir ${row.name}`)}>
          Excluir
        </Button>
      </div>
    ),
    pageSize: 10,
  },
}

// ── Full Featured ─────────────────────────────────────────────────────────────

export const FullFeatured: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', width: '60px', sortable: true },
      { key: 'name', header: 'Nome', sortable: true, filterable: true },
      { key: 'email', header: 'Email', filterable: true },
      {
        key: 'status',
        header: 'Status',
        filterable: true,
        filterType: 'select' as const,
        filterOptions: [
          { value: 'active', label: 'Ativo' },
          { value: 'inactive', label: 'Inativo' },
        ],
        render: (_: unknown, row: Row) => (
          <Badge variant={row.status === 'active' ? 'success' : 'default'} badgeStyle="soft">
            {row.status === 'active' ? 'Ativo' : 'Inativo'}
          </Badge>
        ),
      },
      { key: 'value', header: 'Valor (R$)', sortable: true },
    ],
    data: mockData.slice(0, 20),
    selectable: true,
    exportable: true,
    exportFilename: 'usuarios',
    pageSize: 8,
    emptyMessage: 'Nenhum usuário encontrado.',
    emptyAction: <Button size="sm">+ Novo Usuário</Button>,
    actionsColumn: (row: Row) => (
      <div className="flex items-center justify-end gap-2">
        <Button size="sm" variant="ghost">
          Editar
        </Button>
        <Button size="sm" variant="ghost">
          Excluir
        </Button>
      </div>
    ),
    onSelectionChange: (rows: Row[]) => console.log(`${rows.length} selecionados`),
  },
}
