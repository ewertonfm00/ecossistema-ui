import React from 'react'
import { AppShell } from '@/organisms/AppShell/AppShell'
import { SidebarNav } from '@/organisms/SidebarNav/SidebarNav'
import { PageHeader } from '@/organisms/PageHeader/PageHeader'
import { Card } from '@/molecules/Card/Card'
import { FormField } from '@/molecules/FormField/FormField'
import { Button } from '@/atoms/Button/Button'
import { Input } from '@/atoms/Input/Input'
import { Textarea } from '@/atoms/Textarea/Textarea'
import { Select } from '@/atoms/Select/Select'
import { Radio } from '@/atoms/Radio/Radio'
import { Switch } from '@/atoms/Switch/Switch'
import { Checkbox } from '@/atoms/Checkbox/Checkbox'
import type { SidebarNavItem } from '@/organisms/SidebarNav/SidebarNav'

const NAV_ITEMS: SidebarNavItem[] = [
  { label: 'Dashboard', icon: 'Sparkles', href: '/dashboard' },
  { label: 'Clientes', icon: 'User', href: '/clientes', active: true },
  { label: 'Agendamentos', icon: 'Bell', href: '/agendamentos' },
  { label: 'Financeiro', icon: 'Download', href: '/financeiro' },
  { label: 'Relatórios', icon: 'Info', href: '/relatorios' },
]

export interface FormPageProps {
  onSubmit?: (data: Record<string, unknown>) => void
}

export function FormPage({ onSubmit }: FormPageProps) {
  const [collapsed, setCollapsed] = React.useState(false)
  const [newsletter, setNewsletter] = React.useState(false)
  const [statusValue, setStatusValue] = React.useState('ativo')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({})
  }

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
          title="Novo Cliente"
          breadcrumbs={[
            { label: 'Início', href: '/' },
            { label: 'Clientes', href: '/clientes' },
            { label: 'Novo' },
          ]}
        />
        <Card className="p-6 mt-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Nome completo" htmlFor="form-nome" required>
                <Input id="form-nome" placeholder="Ana Beatriz Santos" />
              </FormField>
              <FormField label="E-mail" htmlFor="form-email" required>
                <Input id="form-email" type="email" placeholder="ana@email.com" />
              </FormField>
              <FormField label="Telefone" htmlFor="form-telefone">
                <Input id="form-telefone" placeholder="(11) 98765-4321" />
              </FormField>
              <FormField label="Especialidade" htmlFor="form-especialidade">
                <Select
                  options={[
                    { value: 'geral', label: 'Geral' },
                    { value: 'estetica', label: 'Estética' },
                  ]}
                  placeholder="Selecione..."
                />
              </FormField>
              <FormField label="Observações" htmlFor="form-obs" className="col-span-2">
                <Textarea
                  id="form-obs"
                  placeholder="Observações sobre o cliente..."
                  rows={3}
                />
              </FormField>
              <div className="col-span-2">
                <FormField label="Status" htmlFor="form-status">
                  <div className="flex items-center gap-6 mt-1">
                    <Radio
                      id="status-ativo"
                      name="status"
                      value="ativo"
                      checked={statusValue === 'ativo'}
                      onChange={setStatusValue}
                      label="Ativo"
                    />
                    <Radio
                      id="status-inativo"
                      name="status"
                      value="inativo"
                      checked={statusValue === 'inativo'}
                      onChange={setStatusValue}
                      label="Inativo"
                    />
                  </div>
                </FormField>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <Switch
                  checked={newsletter}
                  onChange={setNewsletter}
                  aria-label="Receber comunicações por e-mail"
                />
                <span className="text-sm font-medium text-neutral-700">
                  Receber comunicações por e-mail
                </span>
              </div>
              <div className="col-span-2">
                <Checkbox id="termos" label="Aceito os termos de uso" />
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <Button variant="secondary" type="button">Cancelar</Button>
              <Button variant="primary" type="submit">Salvar Cliente</Button>
            </div>
          </form>
        </Card>
      </div>
    </AppShell>
  )
}
