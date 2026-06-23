import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BarChart, LineChart, PieChart, AreaChart } from './Charts'

const barData = [
  { mes: 'Jan', receita: 12000, despesa: 8000 },
  { mes: 'Fev', receita: 15000, despesa: 9000 },
  { mes: 'Mar', receita: 11000, despesa: 7500 },
]

const pieData = [
  { name: 'Botox', value: 45 },
  { name: 'Preenchimento', value: 30 },
  { name: 'Outros', value: 25 },
]

// ── BarChart ──────────────────────────────────────────────────────────────────

describe('BarChart', () => {
  it('renderiza sem erro com dados válidos', () => {
    expect(() =>
      render(<BarChart data={barData} xKey="mes" dataKeys={['receita', 'despesa']} />),
    ).not.toThrow()
  })

  it('renderiza SVG no DOM', () => {
    const { container } = render(
      <BarChart data={barData} xKey="mes" dataKeys={['receita']} />,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('showLegend=false oculta a legenda', () => {
    const { container } = render(
      <BarChart data={barData} xKey="mes" dataKeys={['receita']} showLegend={false} />,
    )
    expect(container.querySelector('.recharts-legend-wrapper')).not.toBeInTheDocument()
  })

  it('className adicional é aplicado ao container', () => {
    const { container } = render(
      <BarChart data={barData} xKey="mes" dataKeys={['receita']} className="meu-grafico" />,
    )
    expect(container.firstChild).toHaveClass('meu-grafico')
  })

  it('container tem role="img" e aria-label', () => {
    render(<BarChart data={barData} xKey="mes" dataKeys={['receita']} />)
    expect(screen.getByRole('img', { name: /Gráfico de barras/i })).toBeInTheDocument()
  })
})

// ── LineChart ─────────────────────────────────────────────────────────────────

describe('LineChart', () => {
  it('renderiza sem erro com dados válidos', () => {
    expect(() =>
      render(<LineChart data={barData} xKey="mes" dataKeys={['receita']} />),
    ).not.toThrow()
  })

  it('renderiza SVG no DOM', () => {
    const { container } = render(
      <LineChart data={barData} xKey="mes" dataKeys={['receita']} />,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('container tem role="img" e aria-label de linhas', () => {
    render(<LineChart data={barData} xKey="mes" dataKeys={['receita']} />)
    expect(screen.getByRole('img', { name: /Gráfico de linhas/i })).toBeInTheDocument()
  })

  it('showLegend=false oculta a legenda', () => {
    const { container } = render(
      <LineChart data={barData} xKey="mes" dataKeys={['receita']} showLegend={false} />,
    )
    expect(container.querySelector('.recharts-legend-wrapper')).not.toBeInTheDocument()
  })
})

// ── PieChart ──────────────────────────────────────────────────────────────────

describe('PieChart', () => {
  it('renderiza sem erro com dados válidos', () => {
    expect(() => render(<PieChart data={pieData} />)).not.toThrow()
  })

  it('renderiza SVG no DOM', () => {
    const { container } = render(<PieChart data={pieData} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('container tem role="img" e aria-label de pizza', () => {
    render(<PieChart data={pieData} />)
    expect(screen.getByRole('img', { name: /Gráfico de pizza/i })).toBeInTheDocument()
  })

  it('showLegend=false oculta a legenda', () => {
    const { container } = render(<PieChart data={pieData} showLegend={false} />)
    expect(container.querySelector('.recharts-legend-wrapper')).not.toBeInTheDocument()
  })

  it('className adicional é aplicado ao container', () => {
    const { container } = render(<PieChart data={pieData} className="pizza-chart" />)
    expect(container.firstChild).toHaveClass('pizza-chart')
  })
})

// ── AreaChart ─────────────────────────────────────────────────────────────────

describe('AreaChart', () => {
  it('renderiza sem erro com dados válidos', () => {
    expect(() =>
      render(<AreaChart data={barData} xKey="mes" dataKeys={['receita']} />),
    ).not.toThrow()
  })

  it('renderiza SVG no DOM', () => {
    const { container } = render(
      <AreaChart data={barData} xKey="mes" dataKeys={['receita']} />,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('container tem role="img" e aria-label de área', () => {
    render(<AreaChart data={barData} xKey="mes" dataKeys={['receita']} />)
    expect(screen.getByRole('img', { name: /Gráfico de área/i })).toBeInTheDocument()
  })

  it('showLegend=false oculta a legenda', () => {
    const { container } = render(
      <AreaChart data={barData} xKey="mes" dataKeys={['receita']} showLegend={false} />,
    )
    expect(container.querySelector('.recharts-legend-wrapper')).not.toBeInTheDocument()
  })

  it('className adicional é aplicado ao container', () => {
    const { container } = render(
      <AreaChart data={barData} xKey="mes" dataKeys={['receita']} className="area-chart" />,
    )
    expect(container.firstChild).toHaveClass('area-chart')
  })
})
