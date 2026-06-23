import { render, screen } from '@testing-library/react'
import { StepIndicator } from './StepIndicator'

const STEPS = [
  { label: 'Dados' },
  { label: 'Endereço' },
  { label: 'Confirmação' },
]

describe('StepIndicator', () => {
  it('renderiza todos os steps', () => {
    render(<StepIndicator steps={STEPS} current={0} />)
    expect(screen.getByText('Dados')).toBeInTheDocument()
    expect(screen.getByText('Endereço')).toBeInTheDocument()
    expect(screen.getByText('Confirmação')).toBeInTheDocument()
  })

  it('mostra numeração para steps pendentes', () => {
    render(<StepIndicator steps={STEPS} current={0} />)
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('step atual tem ring visual', () => {
    const { container } = render(<StepIndicator steps={STEPS} current={1} />)
    const circles = container.querySelectorAll('div[class*="ring-2"]')
    expect(circles.length).toBeGreaterThan(0)
  })

  it('steps anteriores mostram ícone de check', () => {
    render(<StepIndicator steps={STEPS} current={2} />)
    const checks = document.querySelectorAll('svg')
    expect(checks.length).toBeGreaterThanOrEqual(2)
  })

  it('exibe description quando fornecida', () => {
    const steps = [{ label: 'Passo 1', description: 'Detalhes do passo' }]
    render(<StepIndicator steps={steps} current={0} />)
    expect(screen.getByText('Detalhes do passo')).toBeInTheDocument()
  })

  it('renderiza em orientação vertical', () => {
    const { container } = render(<StepIndicator steps={STEPS} current={1} orientation="vertical" />)
    const list = container.querySelector('ol')
    expect(list?.className).toContain('flex-col')
  })

  it('renderiza nav com aria-label', () => {
    render(<StepIndicator steps={STEPS} current={0} />)
    expect(screen.getByRole('navigation', { name: 'Indicador de etapas' })).toBeInTheDocument()
  })
})
