import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MultiSelect } from './MultiSelect'

const profissionais = [
  { value: 'ana', label: 'Ana Beatriz' },
  { value: 'carlos', label: 'Carlos Eduardo' },
  { value: 'juliana', label: 'Juliana Ferreira' },
  { value: 'marcos', label: 'Marcos Oliveira' },
  { value: 'priscila', label: 'Priscila Santos' },
]

const meta: Meta<typeof MultiSelect> = {
  title: 'Molecules/MultiSelect',
  component: MultiSelect,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof MultiSelect>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return (
      <div className="max-w-sm space-y-2">
        <MultiSelect
          options={profissionais}
          value={value}
          onChange={setValue}
          placeholder="Selecione profissionais"
        />
        {value.length > 0 && (
          <p className="text-xs text-neutral-500">Selecionados: {value.join(', ')}</p>
        )}
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="max-w-sm">
      <MultiSelect
        options={profissionais}
        value={['ana', 'juliana']}
        onChange={() => {}}
        disabled
        placeholder="Seleção desabilitada"
      />
    </div>
  ),
}
