import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
    },
    badgeStyle: {
      control: 'select',
      options: ['soft', 'filled', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    badgeStyle: 'soft',
    size: 'md',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        <Badge variant="default">Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge variant="primary" badgeStyle="filled">Primary Filled</Badge>
        <Badge variant="success" badgeStyle="filled">Success Filled</Badge>
        <Badge variant="warning" badgeStyle="filled">Warning Filled</Badge>
        <Badge variant="error" badgeStyle="filled">Error Filled</Badge>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge variant="primary" badgeStyle="outline">Primary Outline</Badge>
        <Badge variant="success" badgeStyle="outline">Success Outline</Badge>
        <Badge variant="warning" badgeStyle="outline">Warning Outline</Badge>
        <Badge variant="error" badgeStyle="outline">Error Outline</Badge>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm" variant="primary">Small</Badge>
      <Badge size="md" variant="primary">Medium</Badge>
      <Badge size="lg" variant="primary">Large</Badge>
    </div>
  ),
}
