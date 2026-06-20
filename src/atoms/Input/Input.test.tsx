import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('renders without errors', () => {
    render(<Input placeholder="Digite aqui" />)
    expect(screen.getByPlaceholderText('Digite aqui')).toBeInTheDocument()
  })

  it('applies default border class', () => {
    render(<Input placeholder="test" />)
    expect(screen.getByPlaceholderText('test')).toHaveClass('border-neutral-200')
  })

  it('applies error state class', () => {
    render(<Input placeholder="test" state="error" />)
    expect(screen.getByPlaceholderText('test')).toHaveClass('border-error-500')
  })

  it('is disabled when disabled prop is passed', () => {
    render(<Input placeholder="test" disabled />)
    expect(screen.getByPlaceholderText('test')).toBeDisabled()
  })

  it('applies size class for lg', () => {
    render(<Input placeholder="test" size="lg" />)
    expect(screen.getByPlaceholderText('test')).toHaveClass('h-12')
  })
})
