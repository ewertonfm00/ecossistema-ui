import type { Meta, StoryObj } from '@storybook/react'
import { AgendaView, AgendaEvent } from './AgendaView'

const meta: Meta<typeof AgendaView> = {
  title: 'Organisms/Calendar/AgendaView',
  component: AgendaView,
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof AgendaView>

const BASE = new Date(2026, 5, 22)

const EVENTS_DEFAULT: AgendaEvent[] = [
  { id: '1', title: 'Consulta Ana Silva', start: new Date(2026, 5, 23, 9, 0), end: new Date(2026, 5, 23, 10, 0), color: '#bbf7d0' },
  { id: '2', title: 'Botox Pedro Costa', start: new Date(2026, 5, 24, 14, 0), end: new Date(2026, 5, 24, 15, 30), color: '#bfdbfe' },
  { id: '3', title: 'Limpeza de pele', start: new Date(2026, 5, 25, 10, 0), end: new Date(2026, 5, 25, 11, 0), color: '#fde68a' },
  { id: '4', title: 'Retorno Lucia Mendes', start: new Date(2026, 5, 26, 16, 0), end: new Date(2026, 5, 26, 16, 30), color: '#fecaca' },
]

const EVENTS_BUSY: AgendaEvent[] = [
  { id: '1', title: 'Consulta 1', start: new Date(2026, 5, 22, 8, 0), end: new Date(2026, 5, 22, 9, 0), color: '#bbf7d0' },
  { id: '2', title: 'Preenchimento', start: new Date(2026, 5, 22, 10, 0), end: new Date(2026, 5, 22, 11, 30), color: '#bfdbfe' },
  { id: '3', title: 'Peeling', start: new Date(2026, 5, 23, 8, 0), end: new Date(2026, 5, 23, 9, 30), color: '#fde68a' },
  { id: '4', title: 'Hidratação', start: new Date(2026, 5, 23, 11, 0), end: new Date(2026, 5, 23, 12, 0), color: '#fecaca' },
  { id: '5', title: 'Avaliação', start: new Date(2026, 5, 24, 9, 0), end: new Date(2026, 5, 24, 10, 0), color: '#e9d5ff' },
  { id: '6', title: 'Skincare', start: new Date(2026, 5, 25, 14, 0), end: new Date(2026, 5, 25, 15, 0), color: '#bbf7d0' },
]

export const Default: Story = {
  render: () => (
    <AgendaView
      events={EVENTS_DEFAULT}
      currentDate={BASE}
      onEventClick={ev => alert(ev.title)}
    />
  ),
}

export const Busy: Story = {
  render: () => (
    <AgendaView
      events={EVENTS_BUSY}
      currentDate={BASE}
      onEventClick={ev => alert(ev.title)}
    />
  ),
}
