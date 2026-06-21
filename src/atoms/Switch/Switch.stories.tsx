import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {
    checked: false,
    'aria-label': 'Toggle',
  },
}

export const On: Story = {
  args: {
    checked: true,
    'aria-label': 'Toggle ativado',
  },
}

export const WithLabel: Story = {
  args: {
    checked: true,
    label: 'Notificações ativas',
    labelPosition: 'right',
  },
}

export const Disabled: Story = {
  args: {
    checked: false,
    label: 'Funcionalidade desabilitada',
    disabled: true,
  },
}
