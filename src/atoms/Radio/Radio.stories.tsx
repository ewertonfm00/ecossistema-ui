import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from './Radio'

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Radio',
  component: Radio,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Radio>

export const Default: Story = {
  args: {
    id: 'radio-default',
    name: 'radio-group',
    value: 'option1',
    label: 'Opção 1',
    checked: false,
  },
}

export const Checked: Story = {
  args: {
    id: 'radio-checked',
    name: 'radio-group-2',
    value: 'option1',
    label: 'Selecionado',
    checked: true,
  },
}

export const RadioGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Radio id="r1" name="plan" value="basic" label="Plano Básico" checked={false} />
      <Radio id="r2" name="plan" value="pro" label="Plano Pro" checked={true} />
      <Radio id="r3" name="plan" value="enterprise" label="Plano Enterprise" checked={false} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    id: 'radio-disabled',
    name: 'radio-group-3',
    value: 'option1',
    label: 'Desabilitado',
    disabled: true,
  },
}
