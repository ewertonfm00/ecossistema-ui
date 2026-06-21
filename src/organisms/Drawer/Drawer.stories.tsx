import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Drawer } from './Drawer'
import { Button } from '@/atoms/Button/Button'
import { Input } from '@/atoms/Input/Input'
import { FormField } from '@/molecules/FormField/FormField'

const meta: Meta<typeof Drawer> = {
  title: 'Organisms/Drawer',
  component: Drawer,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Drawer>

function DrawerDemo(props: Partial<React.ComponentProps<typeof Drawer>>) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Abrir Drawer
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={props.title ?? 'Painel lateral'}
        side={props.side}
        width={props.width}
        hideCloseButton={props.hideCloseButton}
        footer={
          props.footer ?? (
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                Salvar
              </Button>
            </>
          )
        }
      >
        {props.children ?? <p className="text-neutral-600">Conteúdo do painel lateral.</p>}
      </Drawer>
    </>
  )
}

export const Default: Story = { render: () => <DrawerDemo /> }

export const Left: Story = {
  render: () => <DrawerDemo side="left" title="Painel esquerdo" />,
}

export const Large: Story = {
  render: () => (
    <DrawerDemo width="lg" title="Editar Cliente">
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
    </DrawerDemo>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <DrawerDemo
      title="Confirmar alterações"
      footer={
        <>
          <Button variant="secondary" onClick={() => {}}>
            Descartar
          </Button>
          <Button variant="primary" onClick={() => {}}>
            Salvar alterações
          </Button>
        </>
      }
    />
  ),
}
