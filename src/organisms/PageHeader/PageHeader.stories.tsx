import type { Meta, StoryObj } from '@storybook/react'
import { PageHeader } from './PageHeader'
import { Button } from '../../atoms/Button'

const meta: Meta<typeof PageHeader> = {
  title: 'Organisms/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PageHeader>

export const Default: Story = {
  args: {
    title: 'Painel de Controle',
  },
}

export const WithBreadcrumb: Story = {
  args: {
    title: 'Detalhes do Paciente',
    breadcrumbs: [
      { label: 'Início', href: '#' },
      { label: 'Pacientes', href: '#' },
      { label: 'João Silva' },
    ],
  },
}

export const WithActions: Story = {
  args: {
    title: 'Agendamentos',
    breadcrumbs: [
      { label: 'Início', href: '#' },
      { label: 'Agendamentos' },
    ],
    actions: (
      <>
        <Button variant="secondary" size="sm">Exportar</Button>
        <Button variant="primary" size="sm">Novo agendamento</Button>
      </>
    ),
  },
}
