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

  it('secondary variant has focus ring', () => {
    render(<Button variant="secondary">Cancelar</Button>)
    expect(screen.getByRole('button')).toHaveClass('focus:shadow-focus')
  })

  it('ghost variant has focus ring', () => {
    render(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button')).toHaveClass('focus:shadow-focus')
  })

  it('soft variant has focus ring', () => {
    render(<Button variant="soft">Soft</Button>)
    expect(screen.getByRole('button')).toHaveClass('focus:shadow-focus')
  })

  it('link variant has focus ring', () => {
    render(<Button variant="link">Link</Button>)
    expect(screen.getByRole('button')).toHaveClass('focus:shadow-focus')
  })

  it('sets aria-busy when loading', () => {
    render(<Button loading>Carregando</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })

  it('has active scale class for press feedback', () => {
    render(<Button>Pressionar</Button>)
    expect(screen.getByRole('button')).toHaveClass('active:scale-[0.97]')
  })
})
