import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CalendarPicker } from './CalendarPicker'

const meta: Meta<typeof CalendarPicker> = {
  title: 'Organisms/Calendar/CalendarPicker',
  component: CalendarPicker,
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof CalendarPicker>

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date())
    return <CalendarPicker value={date} onChange={setDate} locale="pt-BR" />
  },
}

export const WithDisabledDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date())
    return (
      <CalendarPicker
        value={date}
        onChange={setDate}
        disabled={d => d.getDay() === 0 || d.getDay() === 6}
        locale="pt-BR"
      />
    )
  },
}
