import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders without errors', () => {
    render(<Badge>Novo</Badge>)
    expect(screen.getByText('Novo')).toBeInTheDocument()
  })

  it('applies soft default style by default', () => {
    render(<Badge>Novo</Badge>)
    expect(screen.getByText('Novo')).toHaveClass('bg-neutral-100')
  })

  it('applies primary soft variant', () => {
    render(<Badge variant="primary">Ativo</Badge>)
    expect(screen.getByText('Ativo')).toHaveClass('bg-primary-100')
  })

  it('applies filled style', () => {
    render(<Badge badgeStyle="filled">Ativo</Badge>)
    expect(screen.getByText('Ativo')).toHaveClass('bg-neutral-600')
  })

  it('applies lg size', () => {
    render(<Badge size="lg">Grande</Badge>)
    expect(screen.getByText('Grande')).toHaveClass('px-3')
  })
})
