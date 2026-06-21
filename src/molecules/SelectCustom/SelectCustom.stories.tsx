import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SelectCustom } from './SelectCustom'
import type { SelectCustomOption } from './SelectCustom'

const meta: Meta<typeof SelectCustom> = {
  title: 'Molecules/SelectCustom',
  component: SelectCustom,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof SelectCustom>

const OPTIONS_10: SelectCustomOption[] = [
  { value: 'sp', label: 'São Paulo' }, { value: 'rj', label: 'Rio de Janeiro' },
  { value: 'mg', label: 'Minas Gerais' }, { value: 'rs', label: 'Rio Grande do Sul' },
  { value: 'pr', label: 'Paraná' }, { value: 'ba', label: 'Bahia' },
  { value: 'sc', label: 'Santa Catarina' }, { value: 'go', label: 'Goiás' },
  { value: 'pe', label: 'Pernambuco' }, { value: 'ce', label: 'Ceará' },
]

const OPTIONS_GROUPED: SelectCustomOption[] = [
  { value: 'geral', label: 'Geral', group: 'Consultas' },
  { value: 'derma', label: 'Dermatologia', group: 'Consultas' },
  { value: 'facial', label: 'Limpeza Facial', group: 'Estética' },
  { value: 'corporal', label: 'Modelagem Corporal', group: 'Estética' },
  { value: 'laser', label: 'Laser CO2', group: 'Procedimentos' },
  { value: 'botox', label: 'Toxina Botulínica', group: 'Procedimentos' },
]

export const Default: Story = {
  render: () => {
    const [v, setV] = useState<string | undefined>()
    return <div className="p-8 w-64"><SelectCustom options={OPTIONS_10} value={v} onChange={v => setV(v as string)} /></div>
  }
}

export const Searchable: Story = {
  render: () => {
    const [v, setV] = useState<string | undefined>()
    return <div className="p-8 w-64"><SelectCustom options={OPTIONS_10} value={v} onChange={v => setV(v as string)} searchable placeholder="Estado..." /></div>
  }
}

export const Multiple: Story = {
  render: () => {
    const [v, setV] = useState<string[]>([])
    return <div className="p-8 w-72"><SelectCustom options={OPTIONS_10} value={v} onChange={v => setV(v as string[])} multiple placeholder="Selecione estados..." /></div>
  }
}

export const WithGroups: Story = {
  render: () => {
    const [v, setV] = useState<string | undefined>()
    return <div className="p-8 w-64"><SelectCustom options={OPTIONS_GROUPED} value={v} onChange={v => setV(v as string)} /></div>
  }
}

export const Clearable: Story = {
  render: () => {
    const [v, setV] = useState<string | undefined>('sp')
    return <div className="p-8 w-64"><SelectCustom options={OPTIONS_10} value={v} onChange={v => setV(v as string)} clearable /></div>
  }
}

export const Disabled: Story = {
  render: () => <div className="p-8 w-64"><SelectCustom options={OPTIONS_10} disabled placeholder="Desabilitado" /></div>
}

export const NoOptions: Story = {
  render: () => {
    const [v, setV] = useState<string | undefined>()
    return <div className="p-8 w-64"><SelectCustom options={[]} value={v} onChange={v => setV(v as string)} noOptionsText="Nenhuma opção disponível" /></div>
  }
}
