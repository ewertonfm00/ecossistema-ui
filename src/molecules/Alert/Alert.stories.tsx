import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'Molecules/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Informação',
    description: 'Esta é uma mensagem informativa para o usuário.',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      <Alert variant="info" title="Informação" description="Mensagem informativa" />
      <Alert variant="success" title="Sucesso" description="Operação concluída com sucesso" />
      <Alert variant="warning" title="Atenção" description="Esta ação pode ter consequências" />
      <Alert variant="error" title="Erro" description="Ocorreu um erro ao processar sua solicitação" />
    </div>
  ),
}

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Alerta descartável',
    description: 'Clique no X para fechar este alerta.',
    onDismiss: () => {},
  },
}

export const TitleOnly: Story = {
  args: {
    variant: 'success',
    title: 'Dados salvos com sucesso!',
  },
}
