import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'error', 'disabled'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'both'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    placeholder: 'Escreva aqui...',
    rows: 4,
    state: 'default',
    resize: 'vertical',
  },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-80">
      <Textarea placeholder="Estado default" state="default" rows={3} />
      <Textarea placeholder="Estado de erro" state="error" rows={3} />
      <Textarea placeholder="Estado desabilitado" state="disabled" rows={3} />
    </div>
  ),
}

export const ResizeOptions: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-80">
      <Textarea placeholder="resize: none" resize="none" rows={3} />
      <Textarea placeholder="resize: vertical" resize="vertical" rows={3} />
      <Textarea placeholder="resize: both" resize="both" rows={3} />
    </div>
  ),
}
