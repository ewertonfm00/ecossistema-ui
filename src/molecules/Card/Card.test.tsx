import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card } from './Card'

describe('Card', () => {
  it('renderiza children no corpo', () => {
    render(<Card>Conteúdo do card</Card>)
    expect(screen.getByText('Conteúdo do card')).toBeInTheDocument()
  })

  it('renderiza header quando fornecido', () => {
    render(<Card header={<span>Cabeçalho</span>}>Corpo</Card>)
    expect(screen.getByText('Cabeçalho')).toBeInTheDocument()
  })

  it('renderiza footer quando fornecido', () => {
    render(<Card footer={<span>Rodapé</span>}>Corpo</Card>)
    expect(screen.getByText('Rodapé')).toBeInTheDocument()
  })

  it('variante outlined aplica border', () => {
    const { container } = render(<Card variant="outlined">Conteúdo</Card>)
    expect(container.firstChild).toHaveClass('border-neutral-200')
  })

  it('variante flat não tem shadow-sm', () => {
    const { container } = render(<Card variant="flat">Conteúdo</Card>)
    expect(container.firstChild).not.toHaveClass('shadow-sm')
  })

  it('padding lg aplica p-8', () => {
    const { container } = render(<Card padding="lg">Conteúdo</Card>)
    expect(container.firstChild).toHaveClass('p-8')
  })
})
