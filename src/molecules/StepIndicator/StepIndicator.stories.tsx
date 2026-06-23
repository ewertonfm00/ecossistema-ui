import type { Meta, StoryObj } from '@storybook/react'
import { StepIndicator } from './StepIndicator'

const meta: Meta<typeof StepIndicator> = {
  title: 'Molecules/StepIndicator',
  component: StepIndicator,
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof StepIndicator>

const STEPS_AGENDAMENTO = [
  { label: 'Paciente', description: 'Dados pessoais' },
  { label: 'Procedimento', description: 'Tipo de tratamento' },
  { label: 'Data e Hora', description: 'Agendamento' },
  { label: 'Confirmação', description: 'Revisão final' },
]

export const PrimeiraEtapa: Story = {
  args: { steps: STEPS_AGENDAMENTO, current: 0 },
}

export const EtapaIntermediaria: Story = {
  args: { steps: STEPS_AGENDAMENTO, current: 2 },
}

export const Concluido: Story = {
  args: { steps: STEPS_AGENDAMENTO, current: 4 },
}

export const Vertical: Story = {
  args: { steps: STEPS_AGENDAMENTO, current: 1, orientation: 'vertical' },
}

export const SemDescricao: Story = {
  args: {
    steps: [{ label: 'Passo 1' }, { label: 'Passo 2' }, { label: 'Passo 3' }],
    current: 1,
  },
}

export const DoisPassos: Story = {
  args: {
    steps: [{ label: 'Início' }, { label: 'Fim' }],
    current: 0,
  },
}
