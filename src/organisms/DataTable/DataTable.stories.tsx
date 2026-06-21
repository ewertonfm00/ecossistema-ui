import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from './DataTable'
import { Badge } from '../../atoms/Badge'

type Row = {
  id: number
  name: string
  email: string
  status: string
  role: string
}

const mockData: Row[] = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  name: `Usuário ${i + 1}`,
  email: `user${i + 1}@example.com`,
  status: i % 3 === 0 ? 'inactive' : 'active',
  role: i % 5 === 0 ? 'admin' : 'user',
}))

const columns = [
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

export const Default: Story = {
  args: {
    columns,
    data: mockData.slice(0, 5),
    pageSize: 10,
  },
}

export const Loading: Story = {
  args: {
    columns,
    data: [],
    loading: true,
    pageSize: 5,
  },
}

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: 'Nenhum usuário encontrado',
  },
}

export const Paginated: Story = {
  args: {
    columns,
    data: mockData,
    pageSize: 10,
  },
}
