import React, { useId, useState } from 'react'
import { cn } from '@/lib/utils'

export interface RangeSliderProps {
  value?: [number, number]
  defaultValue?: [number, number]
  min: number
  max: number
  step?: number
  onChange: (value: [number, number]) => void
  formatValue?: (v: number) => string
  label?: string
  className?: string
}

export function RangeSlider({
  value,
  defaultValue,
  min,
  max,
  step = 1,
  onChange,
  formatValue,
  label,
  className,
}: RangeSliderProps) {
  const id = useId()
  const isControlled = value !== undefined
  const [internal, setInternal] = useState<[number, number]>(defaultValue ?? [min, max])
  const [low, high] = isControlled ? (value as [number, number]) : internal

  const fmt = formatValue ?? ((v: number) => String(v))

  const leftPct = ((low - min) / (max - min)) * 100
  const rightPct = 100 - ((high - min) / (max - min)) * 100

  function updateLow(next: number) {
    const clamped = Math.min(next, high - step)
    const updated: [number, number] = [clamped, high]
    if (!isControlled) setInternal(updated)
    onChange(updated)
  }

  function updateHigh(next: number) {
    const clamped = Math.max(next, low + step)
    const updated: [number, number] = [low, clamped]
    if (!isControlled) setInternal(updated)
    onChange(updated)
  }

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-neutral-700">{label}</span>
          <span className="text-neutral-500 font-medium">
            {fmt(low)} — {fmt(high)}
          </span>
        </div>
      )}

      <div className="relative h-5 w-full select-none">
        {/* Track base */}
        <div className="absolute top-1/2 left-0 right-0 h-1.5 -translate-y-1/2 rounded-full bg-neutral-200" />
        {/* Active range */}
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary-600"
          style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
        />

        {/* Min input */}
        <input
          id={`${id}-min`}
          type="range"
          min={min}
          max={max}
          step={step}
          value={low}
          aria-label="Valor mínimo"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={low}
          onChange={e => updateLow(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
          style={{ pointerEvents: 'none' }}
        />

        {/* Max input */}
        <input
          id={`${id}-max`}
          type="range"
          min={min}
          max={max}
          step={step}
          value={high}
          aria-label="Valor máximo"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={high}
          onChange={e => updateHigh(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
          style={{ pointerEvents: 'none' }}
        />
      </div>

      <div className="mt-1 flex justify-between text-xs text-neutral-400">
        <span>{fmt(min)}</span>
        <span>{fmt(max)}</span>
      </div>
    </div>
  )
}
