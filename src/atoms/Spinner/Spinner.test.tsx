import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders without errors', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('has aria-label', () => {
    render(<Spinner />)
    expect(screen.getByLabelText('Carregando...')).toBeInTheDocument()
  })

  it('applies primary color by default', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toHaveClass('text-primary-600')
  })

  it('applies neutral color when specified', () => {
    render(<Spinner color="neutral" />)
    expect(screen.getByRole('status')).toHaveClass('text-neutral-400')
  })

  it('applies size classes', () => {
    render(<Spinner size="lg" />)
    expect(screen.getByRole('status')).toHaveClass('size-6')
  })
})
