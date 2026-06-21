import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast } from './ToastProvider'
import { Button } from '@/atoms/Button/Button'

const meta: Meta<typeof ToastProvider> = {
  title: 'Organisms/ToastProvider',
  component: ToastProvider,
  decorators: [(Story) => <Story />],
}
export default meta
type Story = StoryObj<typeof ToastProvider>

function ToastButtons() {
  const { addToast } = useToast()
  return (
    <div className="flex flex-wrap gap-2 p-8">
      <Button variant="primary" onClick={() => addToast({ message: 'Salvo com sucesso!', variant: 'success' })}>Sucesso</Button>
      <Button variant="destructive" onClick={() => addToast({ message: 'Ocorreu um erro.', variant: 'error', title: 'Erro' })}>Erro</Button>
      <Button variant="secondary" onClick={() => addToast({ message: 'Atenção!', variant: 'warning' })}>Aviso</Button>
      <Button variant="ghost" onClick={() => addToast({ message: 'Nova informação disponível.', variant: 'info' })}>Info</Button>
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <ToastProvider><ToastButtons /></ToastProvider>
  )
}

export const BottomRight: Story = {
  render: () => (
    <ToastProvider position="bottom-right"><ToastButtons /></ToastProvider>
  )
}

export const Persistent: Story = {
  render: () => {
    function PersistentButtons() {
      const { addToast } = useToast()
      return (
        <div className="p-8">
          <Button variant="primary" onClick={() => addToast({ message: 'Este toast não fecha automaticamente.', variant: 'info', duration: 0 })}>
            Toast Persistente
          </Button>
        </div>
      )
    }
    return <ToastProvider><PersistentButtons /></ToastProvider>
  }
}

export const MultipleToasts: Story = {
  render: () => {
    function MultipleButtons() {
      const { addToast } = useToast()
      const variants = ['success', 'error', 'warning', 'info', 'success'] as const
      return (
        <div className="p-8">
          <Button
            variant="primary"
            onClick={() => {
              variants.forEach((v, i) => {
                setTimeout(() => addToast({ message: `Toast ${i + 1} — ${v}`, variant: v }), i * 200)
              })
            }}
          >
            Disparar 5 Toasts
          </Button>
        </div>
      )
    }
    return <ToastProvider maxToasts={5}><MultipleButtons /></ToastProvider>
  }
}
