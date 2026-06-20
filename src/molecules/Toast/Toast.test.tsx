import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Toast } from './Toast'

describe('Toast', () => {
  it('renderiza sem erro (smoke test)', () => {
    render(<Toast title="Mensagem" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('title renderiza corretamente', () => {
    render(<Toast title="Operação concluída" />)
    expect(screen.getByText('Operação concluída')).toBeInTheDocument()
  })

  it('duration=0 não chama onClose automaticamente', () => {
    const onClose = vi.fn()
    render(<Toast title="Toast" duration={0} onClose={onClose} />)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('onClose exibe botão de fechar quando fornecido', () => {
    render(<Toast title="Toast" onClose={() => {}} />)
    expect(screen.getByRole('button', { name: 'Fechar' })).toBeInTheDocument()
  })

  it('role="status" presente', () => {
    render(<Toast title="Toast" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('aria-live="polite" presente', () => {
    render(<Toast title="Toast" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')
  })
})
