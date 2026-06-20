import { render, screen, fireEvent } from '@testing-library/react'
import { Switch } from './Switch'

describe('Switch', () => {
  it('renders without error', () => {
    render(<Switch aria-label="toggle" />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('has bg-primary-700 class when checked=true', () => {
    render(<Switch checked aria-label="toggle" onChange={() => {}} />)
    expect(screen.getByRole('switch')).toHaveClass('bg-primary-700')
  })

  it('has bg-neutral-200 class when checked=false', () => {
    render(<Switch checked={false} aria-label="toggle" />)
    expect(screen.getByRole('switch')).toHaveClass('bg-neutral-200')
  })

  it('calls onChange when clicked', () => {
    const onChange = vi.fn()
    render(<Switch aria-label="toggle" onChange={onChange} />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalled()
  })

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn()
    render(<Switch disabled aria-label="toggle" onChange={onChange} />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('has role="switch" and aria-checked', () => {
    render(<Switch checked aria-label="toggle" onChange={() => {}} />)
    const btn = screen.getByRole('switch')
    expect(btn).toHaveAttribute('aria-checked', 'true')
  })
})
