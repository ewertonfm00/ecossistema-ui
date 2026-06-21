import React from 'react'
import { AppShell } from '@/organisms/AppShell/AppShell'
import { SidebarNav } from '@/organisms/SidebarNav/SidebarNav'
import { PageHeader } from '@/organisms/PageHeader/PageHeader'
import { DataTable } from '@/organisms/DataTable/DataTable'
import { Button } from '@/atoms/Button/Button'
import type { SidebarNavItem } from '@/organisms/SidebarNav/SidebarNav'
import type { DataTableColumn } from '@/organisms/DataTable/DataTable'

const NAV_ITEMS: SidebarNavItem[] = [
  { label: 'Dashboard', icon: 'Sparkles', href: '/dashboard' },
  { label: 'Clientes', icon: 'User', href: '/clientes', active: true },
  { label: 'Agendamentos', icon: 'Bell', href: '/agendamentos' },
  { label: 'Financeiro', icon: 'Download', href: '/financeiro' },
  { label: 'Relatórios', icon: 'Info', href: '/relatorios' },
]

interface Cliente {
  id: number
  nome: string
  email: string
  telefone: string
  status: 'Ativo' | 'Inativo'
  ultimaVisita: string
}

const CLIENTES: Cliente[] = [
  { id: 1, nome: 'Ana Beatriz Santos', email: 'ana@email.com', telefone: '(11) 98765-4321', status: 'Ativo', ultimaVisita: '2026-06-15' },
  { id: 2, nome: 'Carlos Eduardo Lima', email: 'carlos@email.com', telefone: '(11) 91234-5678', status: 'Ativo', ultimaVisita: '2026-06-10' },
  { id: 3, nome: 'Mariana Oliveira', email: 'mariana@email.com', telefone: '(21) 99876-5432', status: 'Inativo', ultimaVisita: '2026-05-20' },
  { id: 4, nome: 'Roberto Alves', email: 'roberto@email.com', telefone: '(11) 97654-3210', status: 'Ativo', ultimaVisita: '2026-06-18' },
  { id: 5, nome: 'Patricia Costa', email: 'patricia@email.com', telefone: '(31) 98888-7777', status: 'Ativo', ultimaVisita: '2026-06-12' },
  { id: 6, nome: 'Fernando Souza', email: 'fernando@email.com', telefone: '(41) 96666-5555', status: 'Inativo', ultimaVisita: '2026-04-30' },
  { id: 7, nome: 'Lucia Ferreira', email: 'lucia@email.com', telefone: '(11) 94444-3333', status: 'Ativo', ultimaVisita: '2026-06-17' },
  { id: 8, nome: 'Jose Silva', email: 'jose@email.com', telefone: '(21) 92222-1111', status: 'Ativo', ultimaVisita: '2026-06-14' },
  { id: 9, nome: 'Camila Rodrigues', email: 'camila@email.com', telefone: '(11) 91111-0000', status: 'Ativo', ultimaVisita: '2026-06-11' },
  { id: 10, nome: 'Diego Martins', email: 'diego@email.com', telefone: '(31) 95555-4444', status: 'Inativo', ultimaVisita: '2026-05-05' },
  { id: 11, nome: 'Fernanda Lima', email: 'fernanda@email.com', telefone: '(11) 93333-2222', status: 'Ativo', ultimaVisita: '2026-06-16' },
  { id: 12, nome: 'Guilherme Santos', email: 'guilherme@email.com', telefone: '(41) 97777-6666', status: 'Ativo', ultimaVisita: '2026-06-09' },
  { id: 13, nome: 'Helena Pereira', email: 'helena@email.com', telefone: '(21) 96543-2109', status: 'Inativo', ultimaVisita: '2026-03-15' },
  { id: 14, nome: 'Igor Andrade', email: 'igor@email.com', telefone: '(11) 98901-2345', status: 'Ativo', ultimaVisita: '2026-06-13' },
  { id: 15, nome: 'Julia Nascimento', email: 'julia@email.com', telefone: '(31) 97890-1234', status: 'Ativo', ultimaVisita: '2026-06-19' },
]

const COLUMNS: DataTableColumn<Cliente>[] = [
  { key: 'nome', header: 'Nome' },
  { key: 'email', header: 'E-mail' },
  { key: 'telefone', header: 'Telefone' },
  {
    key: 'status',
    header: 'Status',
    render: (value: unknown) => (
      <span className={String(value) === 'Ativo' ? 'text-emerald-600 font-medium' : 'text-neutral-400'}>
        {String(value)}
      </span>
    ),
  },
  { key: 'ultimaVisita', header: 'Última Visita' },
]

export interface ListingPageProps {
  loading?: boolean
}

export function ListingPage({ loading }: ListingPageProps) {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <AppShell
      sidebar={
        <SidebarNav
          items={NAV_ITEMS}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
        />
      }
    >
      <div className="p-6">
        <PageHeader
          title="Clientes"
          breadcrumbs={[{ label: 'Início', href: '/' }, { label: 'Clientes' }]}
          actions={<Button variant="primary">Novo Cliente</Button>}
        />
        <div className="mt-6">
          <DataTable
            columns={COLUMNS}
            data={CLIENTES}
            loading={loading}
            pageSize={10}
          />
        </div>
      </div>
    </AppShell>
  )
}
