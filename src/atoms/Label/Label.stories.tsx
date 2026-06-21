import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './Label'

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'required', 'optional', 'error'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    children: 'Nome completo',
    variant: 'default',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Label variant="default">Label padrão</Label>
      <Label variant="required">Campo obrigatório</Label>
      <Label variant="optional">Campo opcional</Label>
      <Label variant="error">Campo com erro</Label>
    </div>
  ),
}
