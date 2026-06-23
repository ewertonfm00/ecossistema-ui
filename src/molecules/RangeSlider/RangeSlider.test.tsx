import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { RangeSlider } from './RangeSlider'

describe('RangeSlider', () => {
  it('renderiza dois inputs type="range"', () => {
    const { container } = render(
      <RangeSlider min={0} max={100} value={[20, 80]} onChange={vi.fn()} />,
    )
    const inputs = container.querySelectorAll('input[type="range"]')
    expect(inputs).toHaveLength(2)
  })

  it('defaultValue define posição inicial dos handles', () => {
    const { container } = render(
      <RangeSlider min={0} max={100} defaultValue={[25, 75]} onChange={vi.fn()} />,
    )
    const [minInput, maxInput] = container.querySelectorAll('input[type="range"]')
    expect((minInput as HTMLInputElement).value).toBe('25')
    expect((maxInput as HTMLInputElement).value).toBe('75')
  })

  it('mudança no handle mínimo chama onChange com array atualizado', () => {
    const onChange = vi.fn()
    const { container } = render(
      <RangeSlider min={0} max={100} value={[20, 80]} onChange={onChange} />,
    )
    const [minInput] = container.querySelectorAll('input[type="range"]')
    fireEvent.change(minInput, { target: { value: '30' } })
    expect(onChange).toHaveBeenCalledWith([30, 80])
  })

  it('handle mínimo não ultrapassa máximo (clamp)', () => {
    const onChange = vi.fn()
    const { container } = render(
      <RangeSlider min={0} max={100} value={[20, 50]} onChange={onChange} />,
    )
    const [minInput] = container.querySelectorAll('input[type="range"]')
    fireEvent.change(minInput, { target: { value: '60' } })
    const called = onChange.mock.calls[0]?.[0] as [number, number]
    expect(called[0]).toBeLessThan(called[1])
  })

  it('label e formatValue são exibidos', () => {
    render(
      <RangeSlider
        min={0}
        max={24}
        value={[8, 18]}
        onChange={vi.fn()}
        label="Horário"
        formatValue={v => `${v}h`}
      />,
    )
    expect(screen.getByText('Horário')).toBeInTheDocument()
    expect(screen.getByText('8h — 18h')).toBeInTheDocument()
  })
})
