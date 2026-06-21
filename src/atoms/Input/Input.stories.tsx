import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'disabled'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Digite aqui...',
    size: 'md',
    state: 'default',
  },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <Input placeholder="Estado default" state="default" />
      <Input placeholder="Estado de erro" state="error" />
      <Input placeholder="Estado desabilitado" state="disabled" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <Input placeholder="Small" size="sm" />
      <Input placeholder="Medium" size="md" />
      <Input placeholder="Large" size="lg" />
    </div>
  ),
}

export const WithAddon: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <Input placeholder="example.com" leftAddon="https://" />
      <Input placeholder="0,00" rightAddon="BRL" />
    </div>
  ),
}
