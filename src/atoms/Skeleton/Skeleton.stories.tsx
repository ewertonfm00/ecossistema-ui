import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['rect', 'circle', 'text'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: {
    variant: 'rect',
    width: '100%',
    height: '1rem',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <Skeleton variant="rect" height="4rem" />
      <Skeleton variant="circle" width="3rem" height="3rem" />
      <Skeleton variant="text" height="1rem" />
      <Skeleton variant="text" width="80%" height="1rem" />
      <Skeleton variant="text" width="60%" height="1rem" />
    </div>
  ),
}

export const ContentLoading: Story = {
  render: () => (
    <div className="w-80 p-4 bg-white rounded-lg shadow-sm border border-neutral-200">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton variant="circle" width="2.5rem" height="2.5rem" />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton variant="text" height="0.875rem" width="60%" />
          <Skeleton variant="text" height="0.75rem" width="40%" />
        </div>
      </div>
      <Skeleton variant="rect" height="8rem" className="mb-3" />
      <div className="flex flex-col gap-2">
        <Skeleton variant="text" height="0.875rem" />
        <Skeleton variant="text" height="0.875rem" width="90%" />
        <Skeleton variant="text" height="0.875rem" width="75%" />
      </div>
    </div>
  ),
}
