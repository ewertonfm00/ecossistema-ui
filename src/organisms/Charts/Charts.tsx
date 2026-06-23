import {
  AreaChart as RechartsAreaChart,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  Area,
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { cn } from '@/lib/utils'

// ── Palette ───────────────────────────────────────────────────────────────────

const CHART_PALETTE = [
  '#4f46e5',
  '#0ea5e9',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
]

// ── Types ─────────────────────────────────────────────────────────────────────

export type ChartDataPoint = Record<string, string | number>

export interface PieDataPoint {
  name: string
  value: number
}

interface BaseChartProps {
  data: ChartDataPoint[]
  height?: number
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  colors?: string[]
  className?: string
}

export interface BarChartProps extends BaseChartProps {
  xKey: string
  dataKeys: string[]
  stacked?: boolean
}

export interface LineChartProps extends BaseChartProps {
  xKey: string
  dataKeys: string[]
  curved?: boolean
}

export interface PieChartProps {
  data: PieDataPoint[]
  height?: number
  donut?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  colors?: string[]
  className?: string
}

export interface AreaChartProps extends BaseChartProps {
  xKey: string
  dataKeys: string[]
  stacked?: boolean
}

// ── BarChart ──────────────────────────────────────────────────────────────────

export function BarChart({
  data,
  xKey,
  dataKeys,
  height = 300,
  stacked = false,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  colors,
  className,
}: BarChartProps) {
  const palette = colors ?? CHART_PALETTE
  return (
    <div role="img" aria-label="Gráfico de barras" className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: '#6b7280' }} />
          <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
          {dataKeys.map((key, i) => (
            <Bar
              key={key}
              dataKey={key}
              fill={palette[i % palette.length]}
              stackId={stacked ? 'stack' : undefined}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ── LineChart ─────────────────────────────────────────────────────────────────

export function LineChart({
  data,
  xKey,
  dataKeys,
  height = 300,
  curved = false,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  colors,
  className,
}: LineChartProps) {
  const palette = colors ?? CHART_PALETTE
  return (
    <div role="img" aria-label="Gráfico de linhas" className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: '#6b7280' }} />
          <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
          {dataKeys.map((key, i) => (
            <Line
              key={key}
              type={curved ? 'monotone' : 'linear'}
              dataKey={key}
              stroke={palette[i % palette.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ── PieChart ──────────────────────────────────────────────────────────────────

export function PieChart({
  data,
  height = 300,
  donut = false,
  showLegend = true,
  showTooltip = true,
  colors,
  className,
}: PieChartProps) {
  const palette = colors ?? CHART_PALETTE
  return (
    <div role="img" aria-label="Gráfico de pizza" className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          {showTooltip && <Tooltip />}
          {showLegend && <Legend verticalAlign="bottom" />}
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={donut ? 48 : 0}
          >
            {data.map((_entry, i) => (
              <Cell key={i} fill={palette[i % palette.length]} />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

// ── AreaChart ─────────────────────────────────────────────────────────────────

export function AreaChart({
  data,
  xKey,
  dataKeys,
  height = 300,
  stacked = false,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  colors,
  className,
}: AreaChartProps) {
  const palette = colors ?? CHART_PALETTE
  return (
    <div role="img" aria-label="Gráfico de área" className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: '#6b7280' }} />
          <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
          {dataKeys.map((key, i) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={palette[i % palette.length]}
              fill={palette[i % palette.length]}
              fillOpacity={0.15}
              stackId={stacked ? 'area' : undefined}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}
