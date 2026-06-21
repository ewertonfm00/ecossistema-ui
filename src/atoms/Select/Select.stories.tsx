import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const options = [
  { value: 'br', label: 'Brasil' },
  { value: 'us', label: 'Estados Unidos' },
  { value: 'pt', label: 'Portugal' },
  { value: 'ar', label: 'Argentina', disabled: true },
]

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'error', 'disabled'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    options,
    placeholder: 'Selecione um país',
    state: 'default',
  },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <Select options={options} placeholder="Estado default" state="default" />
      <Select options={options} placeholder="Estado de erro" state="error" />
      <Select options={options} placeholder="Estado desabilitado" state="disabled" />
    </div>
  ),
}

export const WithValue: Story = {
  args: {
    options,
    value: 'br',
    state: 'default',
  },
}
