import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    id: 'checkbox-default',
    label: 'Aceitar termos de uso',
    checked: false,
  },
}

export const Checked: Story = {
  args: {
    id: 'checkbox-checked',
    label: 'Item selecionado',
    checked: true,
  },
}

export const Indeterminate: Story = {
  args: {
    id: 'checkbox-indeterminate',
    label: 'Estado indeterminado',
    indeterminate: true,
  },
}

export const Disabled: Story = {
  args: {
    id: 'checkbox-disabled',
    label: 'Desabilitado',
    disabled: true,
  },
}
