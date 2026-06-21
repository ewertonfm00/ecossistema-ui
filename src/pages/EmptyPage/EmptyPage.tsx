import React from 'react'
import { AppShell } from '@/organisms/AppShell/AppShell'
import { SidebarNav } from '@/organisms/SidebarNav/SidebarNav'
import { PageHeader } from '@/organisms/PageHeader/PageHeader'
import { Card } from '@/molecules/Card/Card'
import { Alert } from '@/molecules/Alert/Alert'
import { Icon } from '@/atoms/Icon/Icon'
import { Skeleton } from '@/atoms/Skeleton/Skeleton'
import { Button } from '@/atoms/Button/Button'
import type { SidebarNavItem } from '@/organisms/SidebarNav/SidebarNav'

const NAV_ITEMS: SidebarNavItem[] = [
  { label: 'Dashboard', icon: 'Sparkles', href: '/dashboard' },
  { label: 'Clientes', icon: 'User', href: '/clientes' },
  { label: 'Agendamentos', icon: 'Bell', href: '/agendamentos' },
  { label: 'Financeiro', icon: 'Download', href: '/financeiro' },
  { label: 'Relatórios', icon: 'Info', href: '/relatorios', active: true },
]

export interface EmptyPageProps {
  loading?: boolean
}

export function EmptyPage({ loading = false }: EmptyPageProps) {
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
          title="Relatórios"
          breadcrumbs={[{ label: 'Início', href: '/' }, { label: 'Relatórios' }]}
          actions={<Button variant="primary">Gerar Relatório</Button>}
        />
        <div className="mt-6">
          {loading ? (
            <Card className="p-6">
              <Skeleton height="1.5rem" className="mb-3 w-1/3" />
              <Skeleton height="1rem" className="mb-2" />
              <Skeleton height="1rem" className="mb-2 w-4/5" />
              <Skeleton height="1rem" className="mb-2 w-3/5" />
              <Skeleton height="8rem" className="mt-4" />
            </Card>
          ) : (
            <>
              <Alert
                variant="info"
                description='Nenhum relatório foi gerado ainda. Configure os filtros e clique em "Gerar Relatório".'
                className="mb-4"
              />
              <Card className="p-12 flex flex-col items-center justify-center text-center">
                <Icon name="XCircle" size={48} className="text-neutral-300 mb-4" />
                <h2 className="text-lg font-medium text-neutral-600 mb-2">Sem relatórios</h2>
                <p className="text-sm text-neutral-400 max-w-xs">
                  Gere seu primeiro relatório usando o botão acima.
                </p>
              </Card>
            </>
          )}
        </div>
      </div>
    </AppShell>
  )
}
