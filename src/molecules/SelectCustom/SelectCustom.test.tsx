import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SelectCustom } from './SelectCustom'
import type { SelectCustomOption } from './SelectCustom'

const OPTIONS: SelectCustomOption[] = [
  { value: 'a', label: 'Opção A' },
  { value: 'b', label: 'Opção B' },
  { value: 'c', label: 'Opção C', disabled: true },
]

describe('SelectCustom', () => {
  it('renderiza sem erro', () => {
    render(<SelectCustom options={OPTIONS} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('exibe placeholder quando sem valor', () => {
    render(<SelectCustom options={OPTIONS} placeholder="Escolha..." />)
    expect(screen.getByText('Escolha...')).toBeInTheDocument()
  })

  it('clicar no trigger abre dropdown com role="listbox"', () => {
    render(<SelectCustom options={OPTIONS} />)
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('selecionar opção chama onChange com valor correto', () => {
    const onChange = vi.fn()
    render(<SelectCustom options={OPTIONS} onChange={onChange} />)
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getByRole('option', { name: 'Opção A' }))
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('Escape fecha dropdown', () => {
    render(<SelectCustom options={OPTIONS} />)
    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    fireEvent.keyDown(trigger, { key: 'Escape' })
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('múltipla seleção — 2 opções selecionadas aparecem no trigger', () => {
    render(<SelectCustom options={OPTIONS} multiple value={['a', 'b']} />)
    expect(screen.getByText('Opção A')).toBeInTheDocument()
    expect(screen.getByText('Opção B')).toBeInTheDocument()
  })

  it('searchable — filtrar por texto reduz opções', () => {
    render(<SelectCustom options={OPTIONS} searchable />)
    fireEvent.click(screen.getByRole('combobox'))
    const searchInput = screen.getByRole('searchbox')
    fireEvent.change(searchInput, { target: { value: 'B' } })
    expect(screen.getByRole('option', { name: 'Opção B' })).toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Opção A' })).not.toBeInTheDocument()
  })

  it('trigger tem role="combobox" e aria-expanded correto', () => {
    render(<SelectCustom options={OPTIONS} />)
    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('opção tem role="option" e aria-selected correto', () => {
    render(<SelectCustom options={OPTIONS} value="a" />)
    fireEvent.click(screen.getByRole('combobox'))
    const optA = screen.getByRole('option', { name: /Opção A/i })
    expect(optA).toHaveAttribute('aria-selected', 'true')
    const optB = screen.getByRole('option', { name: /Opção B/i })
    expect(optB).toHaveAttribute('aria-selected', 'false')
  })
})
