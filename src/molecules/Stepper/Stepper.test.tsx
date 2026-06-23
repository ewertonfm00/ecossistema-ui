import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Stepper, StepList, Step, StepPanel } from './Stepper'

const ThreeSteps = ({ defaultValue = 0 }: { defaultValue?: number }) => (
  <Stepper defaultValue={defaultValue}>
    <StepList>
      <Step label="Dados" />
      <Step label="Histórico" />
      <Step label="Fotos" />
    </StepList>
    <StepPanel step={0}>Panel Dados</StepPanel>
    <StepPanel step={1}>Panel Histórico</StepPanel>
    <StepPanel step={2}>Panel Fotos</StepPanel>
  </Stepper>
)

// ── Renderização ──────────────────────────────────────────────────────────────

describe('Stepper — renderização', () => {
  it('renderiza StepList com 3 steps', () => {
    render(<ThreeSteps />)
    expect(screen.getAllByRole('button')).toHaveLength(3)
  })

  it('step 0 é o step atual por padrão', () => {
    render(<ThreeSteps />)
    expect(screen.getByRole('button', { name: /Dados.*atual/i })).toHaveAttribute(
      'aria-current',
      'step',
    )
  })

  it('StepPanel do step atual é visível, demais ficam hidden', () => {
    render(<ThreeSteps defaultValue={0} />)
    const allPanels = screen.getAllByRole('region', { hidden: true })
    expect(allPanels).toHaveLength(3)
    expect(allPanels[0]).not.toHaveClass('hidden')
    const hiddenPanels = allPanels.filter(p => p.classList.contains('hidden'))
    expect(hiddenPanels).toHaveLength(2)
  })
})

// ── Estados dos steps ─────────────────────────────────────────────────────────

describe('Stepper — estados dos steps', () => {
  it('step anterior ao atual tem ícone Check (svg) — completed', () => {
    render(<ThreeSteps defaultValue={1} />)
    const completedBtn = screen.getByRole('button', { name: /Dados.*concluído/i })
    expect(completedBtn.querySelector('svg')).toBeInTheDocument()
  })

  it('step atual tem aria-current="step"', () => {
    render(<ThreeSteps defaultValue={1} />)
    expect(screen.getByRole('button', { name: /Histórico.*atual/i })).toHaveAttribute(
      'aria-current',
      'step',
    )
  })

  it('step posterior ao atual é disabled', () => {
    render(<ThreeSteps defaultValue={1} />)
    expect(screen.getByRole('button', { name: /Fotos.*pendente/i })).toBeDisabled()
  })

  it('step completado é clicável — navega para ele ao clicar', () => {
    render(<ThreeSteps defaultValue={1} />)
    fireEvent.click(screen.getByRole('button', { name: /Dados.*concluído/i }))
    expect(screen.getByRole('button', { name: /Dados.*atual/i })).toHaveAttribute(
      'aria-current',
      'step',
    )
  })
})

// ── Orientação ────────────────────────────────────────────────────────────────

describe('Stepper — orientação', () => {
  it('orientação horizontal aplica flex-row no ol do StepList', () => {
    render(
      <Stepper orientation="horizontal">
        <StepList>
          <Step label="A" />
          <Step label="B" />
        </StepList>
      </Stepper>,
    )
    expect(document.querySelector('ol')).toHaveClass('flex-row')
  })

  it('orientação vertical aplica flex-col no ol do StepList', () => {
    render(
      <Stepper orientation="vertical">
        <StepList>
          <Step label="A" />
          <Step label="B" />
        </StepList>
      </Stepper>,
    )
    expect(document.querySelector('ol')).toHaveClass('flex-col')
  })
})

// ── Controlado ────────────────────────────────────────────────────────────────

describe('Stepper — controlado', () => {
  it('onChange é chamado com o índice correto ao clicar em step completado', () => {
    const onChange = vi.fn()
    render(
      <Stepper value={2} onChange={onChange}>
        <StepList>
          <Step label="A" />
          <Step label="B" />
          <Step label="C" />
        </StepList>
      </Stepper>,
    )
    fireEvent.click(screen.getByRole('button', { name: /A.*concluído/i }))
    expect(onChange).toHaveBeenCalledWith(0)
  })

  it('modo controlado sem onChange não muda step ao clicar', () => {
    render(
      <Stepper value={2}>
        <StepList>
          <Step label="A" />
          <Step label="B" />
          <Step label="C" />
        </StepList>
        <StepPanel step={0}>Panel A</StepPanel>
        <StepPanel step={1}>Panel B</StepPanel>
        <StepPanel step={2}>Panel C</StepPanel>
      </Stepper>,
    )
    fireEvent.click(screen.getByRole('button', { name: /A.*concluído/i }))
    expect(screen.getByRole('button', { name: /C.*atual/i })).toHaveAttribute(
      'aria-current',
      'step',
    )
  })
})

// ── StepPanel ─────────────────────────────────────────────────────────────────

describe('Stepper — StepPanel', () => {
  it('apenas o StepPanel do step atual é visível', () => {
    render(<ThreeSteps defaultValue={1} />)
    const allPanels = screen.getAllByRole('region', { hidden: true })
    expect(allPanels[1]).not.toHaveClass('hidden')
  })

  it('StepPanel de steps diferentes do atual têm classe hidden', () => {
    render(<ThreeSteps defaultValue={1} />)
    const allPanels = screen.getAllByRole('region', { hidden: true })
    expect(allPanels[0]).toHaveClass('hidden')
    expect(allPanels[2]).toHaveClass('hidden')
  })
})

// ── Descrição ─────────────────────────────────────────────────────────────────

describe('Stepper — descrição', () => {
  it('description é renderizada quando fornecida', () => {
    render(
      <Stepper>
        <StepList>
          <Step label="Dados" description="Informações pessoais" />
          <Step label="Histórico" />
        </StepList>
      </Stepper>,
    )
    expect(screen.getByText('Informações pessoais')).toBeInTheDocument()
  })
})
