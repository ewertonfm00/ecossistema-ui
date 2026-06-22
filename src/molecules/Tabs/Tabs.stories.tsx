import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabList, Tab, TabPanel } from './Tabs'
import { Icon } from '../../atoms/Icon/Icon'

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

// ── Default (line) ────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabList>
        <Tab value="overview">Visão Geral</Tab>
        <Tab value="history">Histórico</Tab>
        <Tab value="settings">Configurações</Tab>
      </TabList>
      <TabPanel value="overview" className="pt-4">
        <p className="text-sm text-neutral-600">Conteúdo da visão geral do paciente.</p>
      </TabPanel>
      <TabPanel value="history" className="pt-4">
        <p className="text-sm text-neutral-600">Histórico de procedimentos e consultas.</p>
      </TabPanel>
      <TabPanel value="settings" className="pt-4">
        <p className="text-sm text-neutral-600">Preferências e configurações da conta.</p>
      </TabPanel>
    </Tabs>
  ),
}

// ── Pill ──────────────────────────────────────────────────────────────────────

export const Pill: Story = {
  render: () => (
    <Tabs defaultValue="daily" variant="pill">
      <TabList>
        <Tab value="daily">Diário</Tab>
        <Tab value="weekly">Semanal</Tab>
        <Tab value="monthly">Mensal</Tab>
      </TabList>
      <TabPanel value="daily" className="pt-4">
        <p className="text-sm text-neutral-600">Relatório diário de atendimentos.</p>
      </TabPanel>
      <TabPanel value="weekly" className="pt-4">
        <p className="text-sm text-neutral-600">Relatório semanal de atendimentos.</p>
      </TabPanel>
      <TabPanel value="monthly" className="pt-4">
        <p className="text-sm text-neutral-600">Relatório mensal de atendimentos.</p>
      </TabPanel>
    </Tabs>
  ),
}

// ── Card ──────────────────────────────────────────────────────────────────────

export const Card: Story = {
  render: () => (
    <Tabs defaultValue="active" variant="card">
      <TabList>
        <Tab value="active">Ativos</Tab>
        <Tab value="inactive">Inativos</Tab>
        <Tab value="all">Todos</Tab>
      </TabList>
      <TabPanel value="active" className="pt-4">
        <p className="text-sm text-neutral-600">12 clientes ativos este mês.</p>
      </TabPanel>
      <TabPanel value="inactive" className="pt-4">
        <p className="text-sm text-neutral-600">3 clientes sem agendamento há mais de 60 dias.</p>
      </TabPanel>
      <TabPanel value="all" className="pt-4">
        <p className="text-sm text-neutral-600">Total: 15 clientes cadastrados.</p>
      </TabPanel>
    </Tabs>
  ),
}

// ── WithIcons ─────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="data">
      <TabList>
        <Tab value="data">
          <Icon name="User" size={14} />
          Dados
        </Tab>
        <Tab value="appointments">
          <Icon name="Calendar" size={14} />
          Agendamentos
        </Tab>
        <Tab value="photos">
          <Icon name="Image" size={14} />
          Fotos
        </Tab>
      </TabList>
      <TabPanel value="data" className="pt-4">
        <p className="text-sm text-neutral-600">Dados cadastrais do paciente.</p>
      </TabPanel>
      <TabPanel value="appointments" className="pt-4">
        <p className="text-sm text-neutral-600">Histórico e próximos agendamentos.</p>
      </TabPanel>
      <TabPanel value="photos" className="pt-4">
        <p className="text-sm text-neutral-600">Fotos de antes e depois dos procedimentos.</p>
      </TabPanel>
    </Tabs>
  ),
}

// ── WithDisabledTab ───────────────────────────────────────────────────────────

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabList>
        <Tab value="overview">Visão Geral</Tab>
        <Tab value="reports" disabled>
          Relatórios (em breve)
        </Tab>
        <Tab value="settings">Configurações</Tab>
      </TabList>
      <TabPanel value="overview" className="pt-4">
        <p className="text-sm text-neutral-600">Dados disponíveis para visualização.</p>
      </TabPanel>
      <TabPanel value="reports" className="pt-4">
        <p className="text-sm text-neutral-600">Relatórios avançados — em desenvolvimento.</p>
      </TabPanel>
      <TabPanel value="settings" className="pt-4">
        <p className="text-sm text-neutral-600">Configurações gerais do módulo.</p>
      </TabPanel>
    </Tabs>
  ),
}

// ── Controlled ────────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: () => {
    const [active, setActive] = useState('a')
    return (
      <div className="space-y-4">
        <p className="text-xs text-neutral-500">Tab ativa: <strong>{active}</strong></p>
        <Tabs value={active} onChange={setActive}>
          <TabList>
            <Tab value="a">Aba A</Tab>
            <Tab value="b">Aba B</Tab>
            <Tab value="c">Aba C</Tab>
          </TabList>
          <TabPanel value="a" className="pt-4">
            <p className="text-sm text-neutral-600">Conteúdo da Aba A.</p>
          </TabPanel>
          <TabPanel value="b" className="pt-4">
            <p className="text-sm text-neutral-600">Conteúdo da Aba B.</p>
          </TabPanel>
          <TabPanel value="c" className="pt-4">
            <p className="text-sm text-neutral-600">Conteúdo da Aba C.</p>
          </TabPanel>
        </Tabs>
      </div>
    )
  },
}

// ── ManyTabs ──────────────────────────────────────────────────────────────────

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="t1">
      <TabList className="overflow-x-auto">
        {Array.from({ length: 6 }, (_, i) => (
          <Tab key={`t${i + 1}`} value={`t${i + 1}`} className="whitespace-nowrap">
            Aba {i + 1}
          </Tab>
        ))}
      </TabList>
      {Array.from({ length: 6 }, (_, i) => (
        <TabPanel key={`t${i + 1}`} value={`t${i + 1}`} className="pt-4">
          <p className="text-sm text-neutral-600">Conteúdo da Aba {i + 1}.</p>
        </TabPanel>
      ))}
    </Tabs>
  ),
}
