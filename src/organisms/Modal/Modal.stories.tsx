import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '@/atoms/Button/Button'
import { Input } from '@/atoms/Input/Input'
import { FormField } from '@/molecules/FormField/FormField'

const meta: Meta<typeof Modal> = {
  title: 'Organisms/Modal',
  component: Modal,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Modal>

function ModalDemo(props: Partial<React.ComponentProps<typeof Modal>>) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Abrir Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={props.title ?? 'Confirmar ação'}
        size={props.size}
        hideCloseButton={props.hideCloseButton}
        footer={
          props.footer ?? (
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                Confirmar
              </Button>
            </>
          )
        }
      >
        {props.children ?? (
          <p className="text-neutral-600">Tem certeza que deseja realizar esta ação?</p>
        )}
      </Modal>
    </>
  )
}

export const Default: Story = { render: () => <ModalDemo /> }

export const Small: Story = {
  render: () => <ModalDemo size="sm" title="Confirmar exclusão" />,
}

export const Large: Story = {
  render: () => (
    <ModalDemo size="lg" title="Cadastrar Cliente">
      <div className="space-y-4">
        <FormField label="Nome completo" htmlFor="nome" required>
          <Input id="nome" placeholder="Ana Beatriz Santos" />
        </FormField>
        <FormField label="E-mail" htmlFor="email" required>
          <Input id="email" type="email" placeholder="ana@email.com" />
        </FormField>
        <FormField label="Telefone" htmlFor="telefone">
          <Input id="telefone" placeholder="(11) 98765-4321" />
        </FormField>
      </div>
    </ModalDemo>
  ),
}

export const NoCloseButton: Story = {
  render: () => <ModalDemo hideCloseButton title="Ação obrigatória" />,
}
