import React from 'react'
import { AppShell } from '@/organisms/AppShell/AppShell'
import { SidebarNav } from '@/organisms/SidebarNav/SidebarNav'
import { PageHeader } from '@/organisms/PageHeader/PageHeader'
import { Card } from '@/molecules/Card/Card'
import { Button } from '@/atoms/Button/Button'
import { Icon } from '@/atoms/Icon/Icon'
import type { SidebarNavItem } from '@/organisms/SidebarNav/SidebarNav'

const NAV_ITEMS: SidebarNavItem[] = [
  { label: 'Dashboard', icon: 'Sparkles', href: '/dashboard', active: true },
  { label: 'Clientes', icon: 'User', href: '/clientes' },
  { label: 'Agendamentos', icon: 'Bell', href: '/agendamentos' },
  { label: 'Financeiro', icon: 'Download', href: '/financeiro' },
  { label: 'Relatórios', icon: 'Info', href: '/relatorios' },
]

const METRICS = [
  { label: 'Clientes Ativos', value: '248', icon: 'User', trend: '+12%' },
  { label: 'Agendamentos Hoje', value: '18', icon: 'Bell', trend: '+3' },
  { label: 'Receita Mensal', value: 'R$ 12.400', icon: 'Download', trend: '+8%' },
  { label: 'Taxa de Retorno', value: '76%', icon: 'ArrowRight', trend: '+2pp' },
]

export interface DashboardPageProps {
  userName?: string
}

export function DashboardPage({ userName = 'Usuário' }: DashboardPageProps) {
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
          title="Dashboard"
          breadcrumbs={[{ label: 'Início', href: '/' }, { label: 'Dashboard' }]}
          actions={<Button variant="secondary">Exportar</Button>}
        />
        <p className="text-sm text-neutral-500 mt-4">Bem-vindo, {userName}!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {METRICS.map((m) => (
            <Card key={m.label} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-500">{m.label}</span>
                <Icon name={m.icon} size={20} className="text-neutral-400" />
              </div>
              <p className="text-2xl font-semibold text-neutral-900">{m.value}</p>
              <p className="text-sm text-emerald-600 mt-1">{m.trend}</p>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
