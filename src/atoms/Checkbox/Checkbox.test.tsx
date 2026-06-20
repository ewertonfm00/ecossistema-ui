import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders without error', () => {
    render(<Checkbox id="test" />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('is checked when checked=true', () => {
    render(<Checkbox id="test" checked onChange={() => {}} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('sets indeterminate when indeterminate=true', () => {
    render(<Checkbox id="test" indeterminate />)
    expect((screen.getByRole('checkbox') as HTMLInputElement).indeterminate).toBe(true)
  })

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn()
    render(<Checkbox id="test" disabled onChange={onChange} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('renders label when provided', () => {
    render(<Checkbox id="test" label="label text" />)
    expect(screen.getByText('label text')).toBeInTheDocument()
  })
})
