import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DatePicker } from './DatePicker'

describe('DatePicker', () => {
  it('renderiza sem erro', () => {
    render(<DatePicker />)
    expect(screen.getByPlaceholderText('DD/MM/AAAA')).toBeInTheDocument()
  })

  it('input tem placeholder correto', () => {
    render(<DatePicker placeholder="Selecione a data" />)
    expect(screen.getByPlaceholderText('Selecione a data')).toBeInTheDocument()
  })

  it('clicar no botão de calendário abre o dropdown', () => {
    render(<DatePicker />)
    const calBtn = screen.getByRole('button', { name: 'Abrir calendário' })
    fireEvent.click(calBtn)
    expect(screen.getByTestId('calendar-dropdown')).toBeInTheDocument()
  })

  it('Escape fecha o calendário', () => {
    render(<DatePicker />)
    fireEvent.click(screen.getByRole('button', { name: 'Abrir calendário' }))
    expect(screen.getByTestId('calendar-dropdown')).toBeInTheDocument()
    // Disparar Escape no input (que está dentro do container com onKeyDown)
    fireEvent.keyDown(screen.getByPlaceholderText('DD/MM/AAAA'), { key: 'Escape', code: 'Escape' })
    expect(screen.queryByTestId('calendar-dropdown')).not.toBeInTheDocument()
  })

  it('selecionar um dia chama onChange com a data correta', () => {
    const onChange = vi.fn()
    render(<DatePicker value={new Date(2026, 5, 1)} onChange={onChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Abrir calendário' }))
    // Clicar no dia 15 do mês atual — aria-label exata para evitar match em "15"/"25"
    const day15 = screen.getByRole('gridcell', { name: '15 de Junho de 2026' })
    fireEvent.click(day15)
    expect(onChange).toHaveBeenCalledWith(expect.any(Date))
    const calledWith = onChange.mock.calls[0][0] as Date
    expect(calledWith.getDate()).toBe(15)
    expect(calledWith.getMonth()).toBe(5) // Junho = index 5
  })

  it('dias desabilitados têm aria-disabled="true"', () => {
    const minDate = new Date(2026, 5, 10)
    render(<DatePicker value={new Date(2026, 5, 1)} minDate={minDate} />)
    fireEvent.click(screen.getByRole('button', { name: 'Abrir calendário' }))
    // Usar aria-label exata para evitar match em "15" e "25"
    const day5 = screen.getByRole('gridcell', { name: '5 de Junho de 2026' })
    expect(day5).toHaveAttribute('aria-disabled', 'true')
  })
})
