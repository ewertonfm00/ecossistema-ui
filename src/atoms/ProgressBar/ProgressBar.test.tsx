import { render, screen } from '@testing-library/react'
import { ProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  it('renderiza com valor padrão', () => {
    render(<ProgressBar value={50} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toBeInTheDocument()
    expect(bar).toHaveAttribute('aria-valuenow', '50')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
  })

  it('exibe label quando fornecida', () => {
    render(<ProgressBar value={30} label="Carregando..." />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('exibe percentual quando showValue=true', () => {
    render(<ProgressBar value={75} showValue />)
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('clampeia valor acima do máximo', () => {
    render(<ProgressBar value={150} max={100} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '150')
    const fill = bar.firstElementChild as HTMLElement
    expect(fill.style.width).toBe('100%')
  })

  it('clampeia valor negativo para 0%', () => {
    render(<ProgressBar value={-10} />)
    const bar = screen.getByRole('progressbar')
    const fill = bar.firstElementChild as HTMLElement
    expect(fill.style.width).toBe('0%')
  })

  it('aplica variant success', () => {
    render(<ProgressBar value={60} variant="success" />)
    const bar = screen.getByRole('progressbar')
    const fill = bar.firstElementChild as HTMLElement
    expect(fill.className).toContain('bg-green-500')
  })

  it('aplica variant error', () => {
    render(<ProgressBar value={80} variant="error" />)
    const bar = screen.getByRole('progressbar')
    const fill = bar.firstElementChild as HTMLElement
    expect(fill.className).toContain('bg-red-500')
  })

  it('aplica size lg na track', () => {
    render(<ProgressBar value={50} size="lg" />)
    const bar = screen.getByRole('progressbar')
    expect(bar.className).toContain('h-4')
  })

  it('aplica className externo', () => {
    render(<ProgressBar value={50} className="my-custom" />)
    const outer = screen.getByRole('progressbar').parentElement
    expect(outer).toHaveClass('my-custom')
  })

  it('usa max personalizado no cálculo', () => {
    render(<ProgressBar value={1} max={4} showValue />)
    expect(screen.getByText('25%')).toBeInTheDocument()
  })
})
