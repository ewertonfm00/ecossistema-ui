import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'Molecules/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Toast>

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Notificação',
    description: 'Esta é uma mensagem de notificação.',
    duration: 0,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Toast variant="info" title="Info" description="Mensagem informativa" duration={0} />
      <Toast variant="success" title="Sucesso" description="Operação realizada com sucesso!" duration={0} />
      <Toast variant="warning" title="Atenção" description="Verifique as informações antes de continuar" duration={0} />
      <Toast variant="error" title="Erro" description="Ocorreu um erro inesperado" duration={0} />
    </div>
  ),
}

export const WithClose: Story = {
  args: {
    variant: 'success',
    title: 'Arquivo salvo',
    description: 'O arquivo foi salvo com sucesso.',
    duration: 0,
    onClose: () => {},
  },
}

export const AutoDismiss: Story = {
  args: {
    variant: 'info',
    title: 'Auto-descartável',
    description: 'Esta notificação fecha automaticamente em 3 segundos.',
    duration: 3000,
    onClose: () => {},
  },
}
