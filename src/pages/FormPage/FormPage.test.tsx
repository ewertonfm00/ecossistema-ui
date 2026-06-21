import { render, screen } from '@testing-library/react'
import { FormPage } from './FormPage'

describe('FormPage', () => {
  it('renders without error', () => {
    render(<FormPage />)
  })

  it('shows nome field', () => {
    render(<FormPage />)
    expect(screen.getByPlaceholderText('Ana Beatriz Santos')).toBeInTheDocument()
  })
})
