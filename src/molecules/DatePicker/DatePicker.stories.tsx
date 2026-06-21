import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DatePicker } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(null)
    return <div className="p-8"><DatePicker value={value} onChange={v => setValue(v)} /></div>
  }
}

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date(2026, 5, 21))
    return <div className="p-8"><DatePicker value={value} onChange={v => setValue(v)} /></div>
  }
}

export const WithMinMax: Story = {
  render: () => {
    const today = new Date()
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate())
    const [value, setValue] = useState<Date | null>(null)
    return <div className="p-8"><DatePicker value={value} onChange={v => setValue(v)} minDate={today} maxDate={maxDate} /></div>
  }
}

export const Disabled: Story = {
  render: () => <div className="p-8"><DatePicker disabled /></div>
}
