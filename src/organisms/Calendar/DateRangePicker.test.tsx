import { render, screen, fireEvent } from '@testing-library/react'
import { useState } from 'react'
import { DateRangePicker, DateRange } from './DateRangePicker'

function Wrapper({ initialRange }: { initialRange?: DateRange }) {
  const [range, setRange] = useState<DateRange>(initialRange ?? { start: null, end: null })
  return <DateRangePicker value={range} onChange={setRange} />
}

function findInMonthCell(cells: HTMLElement[], text: string): HTMLElement | undefined {
  return cells.find(c => c.textContent?.trim() === text && !c.className.includes('text-neutral-300'))
}

describe('DateRangePicker', () => {
  it('renderiza 2 meses quando showTwoMonths=true', () => {
    render(<DateRangePicker onChange={() => {}} showTwoMonths />)
    const grids = screen.getAllByRole('grid')
    expect(grids.length).toBe(2)
  })

  it('primeiro clique define start com end=null', () => {
    const onChange = vi.fn()
    render(<DateRangePicker onChange={onChange} value={{ start: null, end: null }} />)
    const cells = screen.getAllByRole('gridcell')
    const day15 = findInMonthCell(cells, '15')
    day15 && fireEvent.click(day15)
    expect(onChange).toHaveBeenCalledTimes(1)
    const [arg] = onChange.mock.calls[0]
    expect(arg.start).toBeTruthy()
    expect(arg.end).toBeNull()
  })

  it('segundo clique define end', () => {
    render(<Wrapper />)
    const cells = screen.getAllByRole('gridcell')
    const day5 = findInMonthCell(cells, '5')
    const day20 = findInMonthCell(cells, '20')
    day5 && fireEvent.click(day5)
    day20 && fireEvent.click(day20)
    const allCells = screen.getAllByRole('gridcell')
    const endCell = allCells.find(c => c.getAttribute('aria-label')?.includes('fim do intervalo'))
    expect(endCell).toBeTruthy()
  })

  it('clique antes do start inverte os valores', () => {
    const onChange = vi.fn()
    const { rerender } = render(
      <DateRangePicker onChange={onChange} value={{ start: null, end: null }} />,
    )

    const cells1 = screen.getAllByRole('gridcell')
    const day20 = findInMonthCell(cells1, '20')
    day20 && fireEvent.click(day20)

    expect(onChange).toHaveBeenCalledTimes(1)
    const firstRange = onChange.mock.calls[0][0] as DateRange
    expect(firstRange.end).toBeNull()

    rerender(<DateRangePicker onChange={onChange} value={firstRange} />)

    const cells2 = screen.getAllByRole('gridcell')
    const day10 = findInMonthCell(cells2, '10')
    day10 && fireEvent.click(day10)

    expect(onChange).toHaveBeenCalledTimes(2)
    const secondRange = onChange.mock.calls[1][0] as DateRange
    expect(secondRange.start!.getDate()).toBe(10)
    expect(secondRange.end!.getDate()).toBe(20)
  })

  it('dias entre start e end ganham classe de highlight', () => {
    const start = new Date(2026, 5, 5)
    const end = new Date(2026, 5, 15)
    render(<DateRangePicker value={{ start, end }} onChange={() => {}} showTwoMonths={false} />)
    const cells = screen.getAllByRole('gridcell')
    const june10 = cells.find(c =>
      c.getAttribute('aria-label')?.includes('no intervalo selecionado') &&
      c.getAttribute('aria-label')?.includes('10'),
    )
    expect(june10).toBeTruthy()
    expect(june10?.className).toContain('bg-primary-100')
  })
})
