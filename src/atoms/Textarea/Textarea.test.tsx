import { render, screen } from '@testing-library/react'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('renders without error', () => {
    render(<Textarea />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('has border-error-500 class when state=error', () => {
    render(<Textarea state="error" />)
    expect(screen.getByRole('textbox')).toHaveClass('border-error-500')
  })

  it('is disabled when state=disabled', () => {
    render(<Textarea state="disabled" />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('has rows attribute when rows prop is set', () => {
    render(<Textarea rows={5} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5')
  })

  it('renders with placeholder', () => {
    render(<Textarea placeholder="Type here..." />)
    expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument()
  })
})
