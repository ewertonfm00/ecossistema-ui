import { render, screen, fireEvent } from '@testing-library/react'
import { Radio } from './Radio'

describe('Radio', () => {
  it('renders without error', () => {
    render(<Radio id="test" name="group" value="a" />)
    expect(screen.getByRole('radio')).toBeInTheDocument()
  })

  it('is checked when checked=true', () => {
    render(<Radio id="test" name="group" value="a" checked onChange={() => {}} />)
    expect(screen.getByRole('radio')).toBeChecked()
  })

  it('has name attribute', () => {
    render(<Radio id="test" name="group1" value="a" />)
    expect(screen.getByRole('radio')).toHaveAttribute('name', 'group1')
  })

  it('calls onChange with value string', () => {
    const onChange = vi.fn()
    render(<Radio id="test" name="group" value="optionA" onChange={onChange} />)
    fireEvent.click(screen.getByRole('radio'))
    expect(onChange).toHaveBeenCalledWith('optionA')
  })

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn()
    render(<Radio id="test" name="group" value="a" disabled onChange={onChange} />)
    fireEvent.click(screen.getByRole('radio'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
