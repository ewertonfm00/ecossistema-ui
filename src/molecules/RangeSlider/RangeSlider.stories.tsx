import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RangeSlider } from './RangeSlider'

const meta: Meta<typeof RangeSlider> = {
  title: 'Molecules/RangeSlider',
  component: RangeSlider,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof RangeSlider>

export const Default: Story = {
  render: () => {
    const [range, setRange] = useState<[number, number]>([100, 500])
    return (
      <div className="max-w-sm">
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={range}
          onChange={setRange}
          label="Faixa de Preço"
          formatValue={v => `R$ ${v}`}
        />
      </div>
    )
  },
}

export const WithFormatValue: Story = {
  render: () => {
    const [range, setRange] = useState<[number, number]>([8, 18])
    return (
      <div className="max-w-sm">
        <RangeSlider
          min={0}
          max={24}
          value={range}
          onChange={setRange}
          label="Horário de Atendimento"
          formatValue={v => `${v}h`}
        />
      </div>
    )
  },
}
