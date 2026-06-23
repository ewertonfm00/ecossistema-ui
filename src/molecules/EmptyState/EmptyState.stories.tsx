import type { Meta, StoryObj } from '@storybook/react'
import { Calendar, Search, FileText, Users } from 'lucide-react'
import { EmptyState } from './EmptyState'

const meta: Meta<typeof EmptyState> = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    title: 'Nenhum resultado encontrado',
    description: 'Tente ajustar os filtros ou criar um novo registro.',
    icon: <Search />,
    action: { label: 'Limpar filtros', onClick: () => {} },
  },
}

export const SemAgendamentos: Story = {
  args: {
    title: 'Sem agendamentos para hoje',
    description: 'Nenhum procedimento está agendado para esta data.',
    icon: <Calendar />,
    action: { label: 'Agendar consulta', onClick: () => {} },
  },
}

export const SemPacientes: Story = {
  args: {
    title: 'Nenhum paciente cadastrado',
    description: 'Comece adicionando o seu primeiro paciente.',
    icon: <Users />,
    action: { label: 'Adicionar paciente', onClick: () => {} },
  },
}

export const SemDocumentos: Story = {
  args: {
    title: 'Sem documentos',
    icon: <FileText />,
  },
}

export const SizeSm: Story = {
  args: {
    title: 'Lista vazia',
    description: 'Nenhum item encontrado.',
    size: 'sm',
  },
}

export const SizeLg: Story = {
  args: {
    title: 'Área vazia',
    description: 'Adicione conteúdo para começar.',
    icon: <Search />,
    action: { label: 'Começar', onClick: () => {} },
    size: 'lg',
  },
}

export const SemIconeSemAcao: Story = {
  args: {
    title: 'Nenhum dado disponível',
    description: 'Os dados serão exibidos aqui quando disponíveis.',
  },
}
