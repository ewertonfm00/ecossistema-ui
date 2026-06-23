import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DateRangePicker, DateRange } from './DateRangePicker'

const meta: Meta<typeof DateRangePicker> = {
  title: 'Organisms/Calendar/DateRangePicker',
  component: DateRangePicker,
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof DateRangePicker>

export const Default: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>({ start: null, end: null })
    return <DateRangePicker value={range} onChange={setRange} />
  },
}

export const WithInitialRange: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>({
      start: new Date(2026, 5, 10),
      end: new Date(2026, 5, 20),
    })
    return <DateRangePicker value={range} onChange={setRange} />
  },
}
