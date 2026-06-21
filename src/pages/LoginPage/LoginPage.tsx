import React from 'react'
import { Button } from '@/atoms/Button/Button'
import { Input } from '@/atoms/Input/Input'
import { FormField } from '@/molecules/FormField/FormField'
import { Card } from '@/molecules/Card/Card'
import { Alert } from '@/molecules/Alert/Alert'

export interface LoginPageProps {
  onSubmit?: (data: { email: string; password: string }) => void
  isLoading?: boolean
  error?: string
}

export function LoginPage({ onSubmit, isLoading, error }: LoginPageProps) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({ email, password })
  }

  return (
    <div className="flex h-screen items-center justify-center bg-neutral-50">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-neutral-900 mb-6">Clínica Premium</h1>
        {error && (
          <Alert variant="error" description={error} className="mb-4" />
        )}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <FormField label="E-mail" htmlFor="login-email">
              <Input
                id="login-email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>
            <FormField label="Senha" htmlFor="login-password">
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormField>
            <Button variant="primary" className="w-full" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
            <a href="#" className="block text-center text-sm text-primary-600 hover:underline">
              Esqueci minha senha
            </a>
          </div>
        </form>
      </Card>
    </div>
  )
}
