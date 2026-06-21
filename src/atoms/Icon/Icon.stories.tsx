import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {
  args: {
    name: 'Search',
    size: 24,
  },
}

export const Catalog: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4 p-4">
      {[
        'AlertCircle', 'AlertTriangle', 'Check', 'CheckCircle2',
        'ChevronDown', 'ChevronLeft', 'ChevronRight', 'Eye',
        'EyeOff', 'Info', 'Loader2', 'Search',
        'Shield', 'Sparkles', 'User', 'X',
        'XCircle', 'Menu', 'Bell', 'Settings',
        'LogOut', 'Plus', 'Trash2', 'Edit',
      ].map((name) => (
        <div key={name} className="flex flex-col items-center gap-1">
          <Icon name={name} size={24} className="text-neutral-700" />
          <span className="text-xs text-neutral-500">{name}</span>
        </div>
      ))}
    </div>
  ),
}
