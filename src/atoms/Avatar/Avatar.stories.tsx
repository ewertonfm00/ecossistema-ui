import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Fallback: Story = {
  args: {
    name: 'João Silva',
    size: 'md',
  },
}

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    name: 'Maria Souza',
    size: 'md',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <Avatar name="AB" size="xs" />
      <Avatar name="AB" size="sm" />
      <Avatar name="AB" size="md" />
      <Avatar name="AB" size="lg" />
      <Avatar name="AB" size="xl" />
      <Avatar name="AB" size="2xl" />
    </div>
  ),
}
