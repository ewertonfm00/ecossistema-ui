import type { Meta, StoryObj } from '@storybook/react'
import { BarChart, LineChart, PieChart, AreaChart } from './Charts'

const monthlyData = [
  { mes: 'Jan', receita: 12400, procedimentos: 48 },
  { mes: 'Fev', receita: 15800, procedimentos: 61 },
  { mes: 'Mar', receita: 11200, procedimentos: 43 },
  { mes: 'Abr', receita: 18600, procedimentos: 72 },
  { mes: 'Mai', receita: 21000, procedimentos: 81 },
  { mes: 'Jun', receita: 19400, procedimentos: 75 },
]

const categoryData = [
  { name: 'Botox', value: 42 },
  { name: 'Preenchimento', value: 28 },
  { name: 'Bioestimulador', value: 15 },
  { name: 'Outros', value: 15 },
]

const meta: Meta = {
  title: 'Organisms/Charts',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta

// ── BarChart/Default ──────────────────────────────────────────────────────────

export const BarChartDefault: StoryObj = {
  name: 'BarChart/Default',
  render: () => (
    <div className="max-w-2xl">
      <BarChart
        data={monthlyData}
        xKey="mes"
        dataKeys={['receita', 'procedimentos']}
        height={300}
      />
    </div>
  ),
}

// ── BarChart/Stacked ──────────────────────────────────────────────────────────

export const BarChartStacked: StoryObj = {
  name: 'BarChart/Stacked',
  render: () => (
    <div className="max-w-2xl">
      <BarChart
        data={[
          { mes: 'Jan', botox: 8000, preench: 4000, outros: 400 },
          { mes: 'Fev', botox: 10000, preench: 5200, outros: 600 },
          { mes: 'Mar', botox: 7500, preench: 3800, outros: 900 },
        ]}
        xKey="mes"
        dataKeys={['botox', 'preench', 'outros']}
        stacked
        height={300}
      />
    </div>
  ),
}

// ── LineChart/Default ─────────────────────────────────────────────────────────

export const LineChartDefault: StoryObj = {
  name: 'LineChart/Default',
  render: () => (
    <div className="max-w-2xl">
      <LineChart
        data={monthlyData}
        xKey="mes"
        dataKeys={['receita', 'procedimentos']}
        curved
        height={300}
      />
    </div>
  ),
}

// ── PieChart/Donut ────────────────────────────────────────────────────────────

export const PieChartDonut: StoryObj = {
  name: 'PieChart/Donut',
  render: () => (
    <div className="max-w-sm">
      <PieChart data={categoryData} donut height={280} />
    </div>
  ),
}

// ── AreaChart/Default ─────────────────────────────────────────────────────────

export const AreaChartDefault: StoryObj = {
  name: 'AreaChart/Default',
  render: () => (
    <div className="max-w-2xl">
      <AreaChart
        data={monthlyData}
        xKey="mes"
        dataKeys={['receita', 'procedimentos']}
        height={300}
      />
    </div>
  ),
}

// ── Charts/CustomColors ───────────────────────────────────────────────────────

export const CustomColors: StoryObj = {
  name: 'Charts/CustomColors',
  render: () => (
    <div className="max-w-2xl space-y-8">
      <BarChart
        data={monthlyData}
        xKey="mes"
        dataKeys={['receita']}
        colors={['#0d9488']}
        height={200}
      />
      <LineChart
        data={monthlyData}
        xKey="mes"
        dataKeys={['procedimentos']}
        colors={['#db2777']}
        height={200}
      />
    </div>
  ),
}
