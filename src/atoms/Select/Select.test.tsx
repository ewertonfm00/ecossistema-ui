import { render, screen, fireEvent } from '@testing-library/react'
import { Select } from './Select'

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
]

describe('Select', () => {
  it('renders all options', () => {
    render(<Select options={options} />)
    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()
  })

  it('renders placeholder as disabled option', () => {
    render(<Select options={options} placeholder="Select one" />)
    const placeholder = screen.getByText('Select one')
    expect(placeholder).toBeInTheDocument()
    expect((placeholder as HTMLOptionElement).disabled).toBe(true)
  })

  it('calls onChange with value string', () => {
    const onChange = vi.fn()
    render(<Select options={options} onChange={onChange} />)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'b' } })
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('has border-error-500 class when state=error', () => {
    render(<Select options={options} state="error" />)
    expect(screen.getByRole('combobox')).toHaveClass('border-error-500')
  })

  it('is disabled when state=disabled', () => {
    render(<Select options={options} state="disabled" />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })
})
