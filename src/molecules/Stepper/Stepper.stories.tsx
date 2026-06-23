import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Stepper, StepList, Step, StepPanel } from './Stepper'
import { Icon } from '../../atoms/Icon/Icon'

const meta: Meta<typeof Stepper> = {
  title: 'Molecules/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Stepper>

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <Stepper defaultValue={1}>
      <StepList>
        <Step label="Dados do Paciente" />
        <Step label="Histórico Clínico" />
        <Step label="Fotos" />
        <Step label="Confirmação" />
      </StepList>
      <StepPanel step={0} className="pt-6">
        <p className="text-sm text-neutral-600">Formulário de dados cadastrais do paciente.</p>
      </StepPanel>
      <StepPanel step={1} className="pt-6">
        <p className="text-sm text-neutral-600">Histórico de procedimentos e alergias.</p>
      </StepPanel>
      <StepPanel step={2} className="pt-6">
        <p className="text-sm text-neutral-600">Upload de fotos antes/depois dos procedimentos.</p>
      </StepPanel>
      <StepPanel step={3} className="pt-6">
        <p className="text-sm text-neutral-600">Revisão e confirmação do cadastro.</p>
      </StepPanel>
    </Stepper>
  ),
}

// ── WithDescriptions ──────────────────────────────────────────────────────────

export const WithDescriptions: Story = {
  render: () => (
    <Stepper defaultValue={0}>
      <StepList>
        <Step label="Dados" description="Nome e contato" />
        <Step label="Configuração" description="Preferências de atendimento" />
        <Step label="Confirmação" description="Revisar e salvar" />
      </StepList>
      <StepPanel step={0} className="pt-6">
        <p className="text-sm text-neutral-600">Preencha seus dados pessoais.</p>
      </StepPanel>
      <StepPanel step={1} className="pt-6">
        <p className="text-sm text-neutral-600">Configure suas preferências de atendimento.</p>
      </StepPanel>
      <StepPanel step={2} className="pt-6">
        <p className="text-sm text-neutral-600">Confirme e finalize o cadastro.</p>
      </StepPanel>
    </Stepper>
  ),
}

// ── Vertical ──────────────────────────────────────────────────────────────────

export const Vertical: Story = {
  render: () => (
    <div className="max-w-xs">
      <Stepper defaultValue={1} orientation="vertical">
        <StepList>
          <Step label="Selecionar Dados" description="Dataset de treinamento" />
          <Step label="Configurar Modelo" description="Arquitetura e parâmetros" />
          <Step label="Executar" description="Iniciar treinamento" />
        </StepList>
      </Stepper>
    </div>
  ),
}

// ── Controlled ────────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: () => {
    const [step, setStep] = useState(0)
    const total = 3
    return (
      <div className="space-y-6">
        <Stepper value={step} onChange={setStep}>
          <StepList>
            <Step label="Passo 1" />
            <Step label="Passo 2" />
            <Step label="Passo 3" />
          </StepList>
          <StepPanel step={0} className="pt-6">
            <p className="text-sm text-neutral-600">Conteúdo do Passo 1.</p>
          </StepPanel>
          <StepPanel step={1} className="pt-6">
            <p className="text-sm text-neutral-600">Conteúdo do Passo 2.</p>
          </StepPanel>
          <StepPanel step={2} className="pt-6">
            <p className="text-sm text-neutral-600">Conteúdo do Passo 3 — concluído!</p>
          </StepPanel>
        </Stepper>
        <div className="flex gap-3">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-4 py-2 text-sm font-medium rounded-md border border-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <button
            onClick={() => setStep(s => Math.min(total - 1, s + 1))}
            disabled={step === total - 1}
            className="px-4 py-2 text-sm font-medium rounded-md bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
        <p className="text-xs text-neutral-500">Step atual: {step}</p>
      </div>
    )
  },
}

// ── AllCompleted ──────────────────────────────────────────────────────────────

export const AllCompleted: Story = {
  render: () => (
    <Stepper defaultValue={4}>
      <StepList>
        <Step label="Dados" />
        <Step label="Histórico" />
        <Step label="Fotos" />
        <Step label="Revisão" />
      </StepList>
    </Stepper>
  ),
}

// ── WithCustomIcons ───────────────────────────────────────────────────────────

export const WithCustomIcons: Story = {
  render: () => (
    <Stepper defaultValue={1}>
      <StepList>
        <Step label="Perfil" icon={<Icon name="User" size={16} />} />
        <Step label="Documentos" icon={<Icon name="FileText" size={16} />} />
        <Step label="Concluído" icon={<Icon name="CheckCircle" size={16} />} />
      </StepList>
      <StepPanel step={0} className="pt-6">
        <p className="text-sm text-neutral-600">Configure seu perfil.</p>
      </StepPanel>
      <StepPanel step={1} className="pt-6">
        <p className="text-sm text-neutral-600">Envie seus documentos.</p>
      </StepPanel>
      <StepPanel step={2} className="pt-6">
        <p className="text-sm text-neutral-600">Tudo pronto!</p>
      </StepPanel>
    </Stepper>
  ),
}
