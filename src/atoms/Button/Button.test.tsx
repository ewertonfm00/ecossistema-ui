import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders without errors', () => {
    render(<Button>Clique</Button>)
    expect(screen.getByRole('button', { name: 'Clique' })).toBeInTheDocument()
  })

  it('renders primary variant by default', () => {
    render(<Button>Clique</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-primary-700')
  })

  it('renders disabled state correctly', () => {
    render(<Button disabled>Clique</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders loading spinner when loading=true', () => {
    render(<Button loading>Clique</Button>)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Cancelar</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-white')
  })

  it('renders full width when fullWidth=true', () => {
    render(<Button fullWidth>Confirmar</Button>)
    expect(screen.getByRole('button')).toHaveClass('w-full')
  })

  it('applies lg size class', () => {
    render(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-11')
  })
})
