import type { Meta, StoryObj } from '@storybook/react'
import { FormField } from './FormField'
import { Input } from '../../atoms/Input'

const meta: Meta<typeof FormField> = {
  title: 'Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FormField>

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <FormField label="Nome completo" htmlFor="nome">
        <Input id="nome" placeholder="Digite seu nome" />
      </FormField>
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <div className="w-80">
      <FormField label="Email" htmlFor="email" required>
        <Input id="email" type="email" placeholder="seu@email.com" />
      </FormField>
    </div>
  ),
}

export const Optional: Story = {
  render: () => (
    <div className="w-80">
      <FormField label="Telefone" htmlFor="telefone" optional>
        <Input id="telefone" placeholder="(11) 99999-9999" />
      </FormField>
    </div>
  ),
}

export const WithHint: Story = {
  render: () => (
    <div className="w-80">
      <FormField label="Senha" htmlFor="senha" hint="Mínimo 8 caracteres com letra e número">
        <Input id="senha" type="password" placeholder="••••••••" />
      </FormField>
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="w-80">
      <FormField label="Email" htmlFor="email-error" error="Este email já está em uso" required>
        <Input id="email-error" type="email" placeholder="seu@email.com" state="error" />
      </FormField>
    </div>
  ),
}
