import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('renders initials from name', () => {
    render(<Avatar name="João Silva" />)
    expect(screen.getByText('JS')).toBeInTheDocument()
  })

  it('renders single initial for single word name', () => {
    render(<Avatar name="João" />)
    expect(screen.getByText('J')).toBeInTheDocument()
  })

  it('renders image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" name="João Silva" alt="Avatar de João" />)
    expect(screen.getByAltText('Avatar de João')).toBeInTheDocument()
  })

  it('applies size class', () => {
    render(<Avatar name="Test User" size="lg" />)
    const container = screen.getByText('TU').parentElement
    expect(container).toHaveClass('size-12')
  })

  it('shows fallback initials when no src', () => {
    render(<Avatar name="Maria Oliveira" />)
    expect(screen.getByText('MO')).toBeInTheDocument()
  })
})
