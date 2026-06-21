import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    content: 'Esta é uma dica útil',
    position: 'top',
    children: <button className="px-3 py-1.5 bg-neutral-100 rounded text-sm">Passe o mouse</button>,
  },
}

export const AllPositions: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-12 py-16">
      <Tooltip content="Tooltip acima" position="top">
        <button className="px-3 py-1.5 bg-neutral-100 rounded text-sm">Top</button>
      </Tooltip>
      <Tooltip content="Tooltip abaixo" position="bottom">
        <button className="px-3 py-1.5 bg-neutral-100 rounded text-sm">Bottom</button>
      </Tooltip>
      <Tooltip content="Tooltip à esquerda" position="left">
        <button className="px-3 py-1.5 bg-neutral-100 rounded text-sm">Left</button>
      </Tooltip>
      <Tooltip content="Tooltip à direita" position="right">
        <button className="px-3 py-1.5 bg-neutral-100 rounded text-sm">Right</button>
      </Tooltip>
    </div>
  ),
}

export const FocusTrigger: Story = {
  name: 'Focus Trigger',
  args: {
    content: 'Abre com foco (Tab)',
    trigger: 'focus',
    children: <button className="px-3 py-1.5 bg-neutral-100 rounded text-sm">Dê Tab aqui</button>,
  },
}

export const BothTrigger: Story = {
  name: 'Both (Hover + Focus)',
  args: {
    content: 'Abre em hover E em foco',
    trigger: 'both',
    children: <button className="px-3 py-1.5 bg-neutral-100 rounded text-sm">Hover ou Tab</button>,
  },
}
