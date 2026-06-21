import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Divider>

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <p className="text-sm text-neutral-600">Conteúdo acima</p>
      <Divider />
      <p className="text-sm text-neutral-600">Conteúdo abaixo</p>
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="w-72">
      <p className="text-sm text-neutral-600">Conteúdo acima</p>
      <Divider label="ou continue com" />
      <p className="text-sm text-neutral-600">Conteúdo abaixo</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-2 h-8">
      <span className="text-sm text-neutral-600">Item A</span>
      <Divider orientation="vertical" />
      <span className="text-sm text-neutral-600">Item B</span>
      <Divider orientation="vertical" />
      <span className="text-sm text-neutral-600">Item C</span>
    </div>
  ),
}
