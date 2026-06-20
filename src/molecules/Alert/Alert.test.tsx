import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Alert } from './Alert'

describe('Alert', () => {
  it('renderiza sem erro (smoke test)', () => {
    render(<Alert />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('variante info aplica bg-info-50', () => {
    render(<Alert variant="info" />)
    expect(screen.getByRole('alert')).toHaveClass('bg-info-50')
  })

  it('variante success aplica bg-success-50', () => {
    render(<Alert variant="success" />)
    expect(screen.getByRole('alert')).toHaveClass('bg-success-50')
  })

  it('variante warning aplica bg-warning-50', () => {
    render(<Alert variant="warning" />)
    expect(screen.getByRole('alert')).toHaveClass('bg-warning-50')
  })

  it('variante error aplica bg-error-50', () => {
    render(<Alert variant="error" />)
    expect(screen.getByRole('alert')).toHaveClass('bg-error-50')
  })

  it('title renderiza corretamente', () => {
    render(<Alert title="Atenção!" />)
    expect(screen.getByText('Atenção!')).toBeInTheDocument()
  })

  it('description renderiza quando fornecida', () => {
    render(<Alert description="Verifique os dados informados" />)
    expect(screen.getByText('Verifique os dados informados')).toBeInTheDocument()
  })

  it('onDismiss exibe botão de fechar', () => {
    render(<Alert onDismiss={() => {}} />)
    expect(screen.getByRole('button', { name: 'Fechar' })).toBeInTheDocument()
  })

  it('role="alert" presente', () => {
    render(<Alert />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('aria-live="assertive" em error', () => {
    render(<Alert variant="error" />)
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive')
  })

  it('aria-live="assertive" em warning', () => {
    render(<Alert variant="warning" />)
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive')
  })

  it('aria-live="polite" em info', () => {
    render(<Alert variant="info" />)
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite')
  })

  it('aria-live="polite" em success', () => {
    render(<Alert variant="success" />)
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite')
  })
})
