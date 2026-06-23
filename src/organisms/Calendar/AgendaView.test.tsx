import { render, screen, fireEvent } from '@testing-library/react'
import { AgendaView, AgendaEvent } from './AgendaView'

const BASE_DATE = new Date(2026, 5, 22)

const EVENTS: AgendaEvent[] = [
  {
    id: '1',
    title: 'Consulta Ana',
    start: new Date(2026, 5, 22, 9, 0),
    end: new Date(2026, 5, 22, 10, 0),
    color: '#bbf7d0',
  },
  {
    id: '2',
    title: 'Botox Pedro',
    start: new Date(2026, 5, 23, 14, 0),
    end: new Date(2026, 5, 23, 15, 0),
  },
]

describe('AgendaView', () => {
  it('renderiza 7 colunas de dias', () => {
    const { container } = render(<AgendaView events={[]} currentDate={BASE_DATE} />)
    const grid = container.querySelector('[role="grid"]')
    expect(grid?.children.length).toBe(8)
  })

  it('evento renderiza título no DOM', () => {
    render(<AgendaView events={EVENTS} currentDate={BASE_DATE} />)
    expect(screen.getByText('Consulta Ana')).toBeInTheDocument()
    expect(screen.getByText('Botox Pedro')).toBeInTheDocument()
  })

  it('onEventClick chamado ao clicar no card', () => {
    const onClick = vi.fn()
    render(<AgendaView events={EVENTS} currentDate={BASE_DATE} onEventClick={onClick} />)
    fireEvent.click(screen.getByText('Consulta Ana'))
    expect(onClick).toHaveBeenCalledWith(EVENTS[0])
  })

  it('evento sem cor usa fallback visual (bg #e0e7ff)', () => {
    render(<AgendaView events={EVENTS} currentDate={BASE_DATE} />)
    const botoxCard = screen.getByText('Botox Pedro').closest('div')
    expect(botoxCard?.style.backgroundColor).toBe('rgb(224, 231, 255)')
  })
})
