import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FormField } from './FormField'

describe('FormField', () => {
  it('renderiza label e children sem erro', () => {
    render(
      <FormField label="E-mail" htmlFor="email">
        <input id="email" />
      </FormField>
    )
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
  })

  it('variante required exibe asterisco', () => {
    render(
      <FormField label="Nome" htmlFor="nome" required>
        <input id="nome" />
      </FormField>
    )
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('variante optional exibe "(opcional)"', () => {
    render(
      <FormField label="Bio" htmlFor="bio" optional>
        <input id="bio" />
      </FormField>
    )
    expect(screen.getByText('(opcional)')).toBeInTheDocument()
  })

  it('error exibe mensagem de erro', () => {
    render(
      <FormField label="E-mail" htmlFor="email" error="E-mail inválido">
        <input id="email" />
      </FormField>
    )
    expect(screen.getByText('E-mail inválido')).toBeInTheDocument()
  })

  it('label usa variante error quando error presente', () => {
    render(
      <FormField label="E-mail" htmlFor="email" error="Inválido">
        <input id="email" />
      </FormField>
    )
    const label = screen.getByText('E-mail').closest('label')
    expect(label).toHaveClass('text-accent-600')
  })

  it('hint exibe texto de dica quando sem error', () => {
    render(
      <FormField label="Senha" htmlFor="pwd" hint="Mínimo 8 caracteres">
        <input id="pwd" />
      </FormField>
    )
    expect(screen.getByText('Mínimo 8 caracteres')).toBeInTheDocument()
  })

  it('error tem prioridade visual sobre hint', () => {
    render(
      <FormField label="Senha" htmlFor="pwd" hint="Dica" error="Erro obrigatório">
        <input id="pwd" />
      </FormField>
    )
    expect(screen.getByText('Erro obrigatório')).toBeInTheDocument()
    expect(screen.queryByText('Dica')).not.toBeInTheDocument()
  })
})
