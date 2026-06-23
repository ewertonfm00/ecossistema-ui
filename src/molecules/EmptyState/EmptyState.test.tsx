import { render, screen, fireEvent } from '@testing-library/react'
import { Search } from 'lucide-react'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('renderiza título obrigatório', () => {
    render(<EmptyState title="Nenhum resultado encontrado" />)
    expect(screen.getByText('Nenhum resultado encontrado')).toBeInTheDocument()
  })

  it('exibe description quando fornecida', () => {
    render(<EmptyState title="Vazio" description="Tente outro filtro" />)
    expect(screen.getByText('Tente outro filtro')).toBeInTheDocument()
  })

  it('não exibe description quando omitida', () => {
    const { container } = render(<EmptyState title="Vazio" />)
    expect(container.querySelectorAll('p').length).toBe(1)
  })

  it('renderiza ícone quando fornecido', () => {
    render(<EmptyState title="Sem dados" icon={<Search data-testid="icon" />} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renderiza botão de ação quando fornecido', () => {
    const onClick = vi.fn()
    render(<EmptyState title="Vazio" action={{ label: 'Adicionar', onClick }} />)
    const btn = screen.getByRole('button', { name: 'Adicionar' })
    expect(btn).toBeInTheDocument()
    fireEvent.click(btn)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('tem role="status" e aria-label', () => {
    render(<EmptyState title="Sem agendamentos" />)
    expect(screen.getByRole('status', { name: 'Sem agendamentos' })).toBeInTheDocument()
  })

  it('aplica size sm (py-6)', () => {
    const { container } = render(<EmptyState title="Pequeno" size="sm" />)
    expect(container.firstElementChild?.className).toContain('py-6')
  })

  it('aplica size lg (py-16)', () => {
    const { container } = render(<EmptyState title="Grande" size="lg" />)
    expect(container.firstElementChild?.className).toContain('py-16')
  })

  it('aplica className externo', () => {
    const { container } = render(<EmptyState title="T" className="custom-class" />)
    expect(container.firstElementChild).toHaveClass('custom-class')
  })
})
