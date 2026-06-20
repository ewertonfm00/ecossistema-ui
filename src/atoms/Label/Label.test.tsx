import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Label } from './Label'

describe('Label', () => {
  it('renders without errors', () => {
    render(<Label>Nome</Label>)
    expect(screen.getByText('Nome')).toBeInTheDocument()
  })

  it('renders with htmlFor attribute', () => {
    render(<Label htmlFor="name-input">Nome</Label>)
    expect(screen.getByText('Nome').closest('label')).toHaveAttribute('for', 'name-input')
  })

  it('renders required indicator', () => {
    render(<Label variant="required">Nome</Label>)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('renders optional text', () => {
    render(<Label variant="optional">Nome</Label>)
    expect(screen.getByText('(opcional)')).toBeInTheDocument()
  })

  it('applies error color for error variant', () => {
    render(<Label variant="error">Nome</Label>)
    const label = screen.getByText('Nome').closest('label')
    expect(label).toHaveClass('text-accent-600')
  })
})
