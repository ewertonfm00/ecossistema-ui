import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MultiSelect } from './MultiSelect'

const opts = [
  { value: 'botox', label: 'Botox' },
  { value: 'preench', label: 'Preenchimento' },
  { value: 'bio', label: 'Bioestimulador' },
]

describe('MultiSelect', () => {
  it('renderiza placeholder quando nenhum valor selecionado', () => {
    render(<MultiSelect options={opts} value={[]} onChange={vi.fn()} placeholder="Selecione procedimentos" />)
    expect(screen.getByText('Selecione procedimentos')).toBeInTheDocument()
  })

  it('clique no container abre dropdown com todas as opções', () => {
    render(<MultiSelect options={opts} value={[]} onChange={vi.fn()} />)
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getAllByRole('option')).toHaveLength(opts.length)
  })

  it('clique em opção não selecionada chama onChange com novo array', () => {
    const onChange = vi.fn()
    render(<MultiSelect options={opts} value={[]} onChange={onChange} />)
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getByRole('option', { name: /Botox/i }))
    expect(onChange).toHaveBeenCalledWith(['botox'])
  })

  it('tag × chama onChange removendo o item', () => {
    const onChange = vi.fn()
    render(<MultiSelect options={opts} value={['botox']} onChange={onChange} />)
    fireEvent.click(screen.getByRole('button', { name: /Remover Botox/i }))
    expect(onChange).toHaveBeenCalledWith([])
  })

  it('busca filtra opções corretamente', () => {
    render(<MultiSelect options={opts} value={[]} onChange={vi.fn()} searchable />)
    fireEvent.click(screen.getByRole('combobox'))
    const input = screen.getByPlaceholderText(/Selecione/i)
    fireEvent.change(input, { target: { value: 'bio' } })
    expect(screen.getByRole('option', { name: /Bioestimulador/i })).toBeInTheDocument()
    expect(screen.queryByRole('option', { name: /Botox/i })).not.toBeInTheDocument()
  })

  it('Escape fecha o dropdown', () => {
    render(<MultiSelect options={opts} value={[]} onChange={vi.fn()} />)
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getAllByRole('option')).toHaveLength(opts.length)
    const input = screen.getByPlaceholderText(/Selecione/i)
    fireEvent.keyDown(input, { key: 'Escape' })
    expect(screen.queryByRole('option')).not.toBeInTheDocument()
  })
})
