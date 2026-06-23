import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from './ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: { value: 60, label: 'Carregando dados...', showValue: true },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <ProgressBar value={40} variant="default" label="Default" showValue />
      <ProgressBar value={80} variant="success" label="Concluído" showValue />
      <ProgressBar value={55} variant="warning" label="Atenção" showValue />
      <ProgressBar value={90} variant="error" label="Crítico" showValue />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <ProgressBar value={50} size="sm" label="Pequeno (sm)" />
      <ProgressBar value={50} size="md" label="Médio (md)" />
      <ProgressBar value={50} size="lg" label="Grande (lg)" />
    </div>
  ),
}

export const CustomMax: Story = {
  args: { value: 3, max: 10, label: 'Consultas realizadas', showValue: true },
}

export const NoLabel: Story = {
  args: { value: 75 },
}

export const AgendamentosConcluidos: Story = {
  render: () => (
    <div className="space-y-3 w-96">
      <ProgressBar value={12} max={20} label="Atendimentos hoje" showValue variant="default" />
      <ProgressBar value={7} max={10} label="Procedimentos agendados" showValue variant="success" />
      <ProgressBar value={3} max={5} label="Retornos pendentes" showValue variant="warning" />
    </div>
  ),
}
