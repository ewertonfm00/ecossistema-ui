import { render, screen, fireEvent } from '@testing-library/react'
import { CalendarPicker } from './CalendarPicker'

const JUN_1 = new Date(2026, 5, 1)
const JUN_15 = new Date(2026, 5, 15)

describe('CalendarPicker', () => {
  it('renderiza header com mês e ano corretos', () => {
    render(<CalendarPicker defaultValue={JUN_15} onChange={() => {}} />)
    expect(screen.getByText(/junho/i)).toBeInTheDocument()
    expect(screen.getByText(/2026/i)).toBeInTheDocument()
  })

  it('botão > avança para o próximo mês', () => {
    render(<CalendarPicker defaultValue={JUN_15} onChange={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: 'Próximo mês' }))
    expect(screen.getByText(/julho/i)).toBeInTheDocument()
  })

  it('botão < volta ao mês anterior', () => {
    render(<CalendarPicker defaultValue={JUN_15} onChange={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: 'Mês anterior' }))
    expect(screen.getByText(/maio/i)).toBeInTheDocument()
  })

  it('clique em dia válido chama onChange com Date correto', () => {
    const onChange = vi.fn()
    render(<CalendarPicker defaultValue={JUN_1} onChange={onChange} />)
    const cells = screen.getAllByRole('gridcell')
    const june10 = cells.find(
      c => c.textContent?.trim() === '10' && !c.className.includes('text-neutral-300'),
    )
    june10 && fireEvent.click(june10)
    expect(onChange).toHaveBeenCalledTimes(1)
    const called = onChange.mock.calls[0][0] as Date
    expect(called.getDate()).toBe(10)
    expect(called.getMonth()).toBe(5)
  })

  it('dia com disabled=true não chama onChange ao clicar', () => {
    const onChange = vi.fn()
    render(
      <CalendarPicker
        defaultValue={JUN_1}
        onChange={onChange}
        disabled={d => d.getDay() === 0}
      />,
    )
    const cells = screen.getAllByRole('gridcell')
    const sunday = cells.find(c => c.getAttribute('aria-disabled') === 'true')
    sunday && fireEvent.click(sunday)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('dia de hoje tem classe ring distinguível', () => {
    const today = new Date()
    const other =
      today.getDate() === 1
        ? new Date(today.getFullYear(), today.getMonth(), 2)
        : new Date(today.getFullYear(), today.getMonth(), 1)
    render(<CalendarPicker defaultValue={other} onChange={() => {}} />)
    const cells = screen.getAllByRole('gridcell')
    const todayCell = cells.find(c => c.className.includes('ring'))
    expect(todayCell).toBeTruthy()
  })
})
