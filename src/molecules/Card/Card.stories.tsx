import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { Button } from '../../atoms/Button'

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'flat', 'outlined'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    variant: 'default',
    padding: 'md',
    children: <p className="text-sm text-neutral-700">Conteúdo do card</p>,
  },
}

export const WithHeaderAndFooter: Story = {
  render: () => (
    <div className="w-80">
      <Card
        header={<h3 className="text-base font-semibold text-neutral-900">Título do Card</h3>}
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" size="sm">Cancelar</Button>
            <Button variant="primary" size="sm">Confirmar</Button>
          </div>
        }
      >
        <p className="text-sm text-neutral-600">
          Este é o conteúdo principal do card com header e footer.
        </p>
      </Card>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Card variant="default"><p className="text-sm">Variant: default (shadow)</p></Card>
      <Card variant="flat"><p className="text-sm">Variant: flat (sem sombra)</p></Card>
      <Card variant="outlined"><p className="text-sm">Variant: outlined (borda)</p></Card>
    </div>
  ),
}

export const Paddings: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Card padding="none" variant="outlined"><p className="text-sm text-center py-2">padding: none</p></Card>
      <Card padding="sm" variant="outlined"><p className="text-sm">padding: sm</p></Card>
      <Card padding="md" variant="outlined"><p className="text-sm">padding: md</p></Card>
      <Card padding="lg" variant="outlined"><p className="text-sm">padding: lg</p></Card>
    </div>
  ),
}
