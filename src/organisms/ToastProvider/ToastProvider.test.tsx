import { render, screen, fireEvent, act } from '@testing-library/react'
import { vi } from 'vitest'
import { ToastProvider, useToast } from './ToastProvider'
import { Button } from '@/atoms/Button/Button'

function TestComponent({ duration = 4000, variant = 'success' as const }) {
  const { addToast } = useToast()
  return (
    <div>
      <Button onClick={() => addToast({ message: 'Mensagem teste', variant, duration })}>
        Add Toast
      </Button>
    </div>
  )
}

function Wrapper(props: React.ComponentProps<typeof TestComponent>) {
  return (
    <ToastProvider>
      <TestComponent {...props} />
    </ToastProvider>
  )
}

describe('ToastProvider', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renderiza children sem erro', () => {
    render(<ToastProvider><div>filho</div></ToastProvider>)
    expect(screen.getByText('filho')).toBeInTheDocument()
  })

  it('addToast exibe mensagem no DOM', () => {
    render(<Wrapper />)
    fireEvent.click(screen.getByText('Add Toast'))
    expect(screen.getByText('Mensagem teste')).toBeInTheDocument()
  })

  it('botão fechar remove toast do DOM', () => {
    render(<Wrapper />)
    fireEvent.click(screen.getByText('Add Toast'))
    expect(screen.getByText('Mensagem teste')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Fechar notificação' }))
    expect(screen.queryByText('Mensagem teste')).not.toBeInTheDocument()
  })

  it('toast é removido automaticamente após duration', async () => {
    vi.useFakeTimers()
    render(<Wrapper duration={1000} />)
    fireEvent.click(screen.getByText('Add Toast'))
    expect(screen.getByText('Mensagem teste')).toBeInTheDocument()
    act(() => { vi.advanceTimersByTime(1100) })
    expect(screen.queryByText('Mensagem teste')).not.toBeInTheDocument()
  })

  it('toast de error tem role="alert"', () => {
    render(<Wrapper variant="error" />)
    fireEvent.click(screen.getByText('Add Toast'))
    const alertEl = screen.getByRole('alert')
    expect(alertEl).toBeInTheDocument()
  })

  it('toast de success tem role="status"', () => {
    render(<Wrapper variant="success" />)
    fireEvent.click(screen.getByText('Add Toast'))
    const statusEl = screen.getByRole('status')
    expect(statusEl).toBeInTheDocument()
  })

  it('useToast lança erro fora do Provider', () => {
    function BrokenComponent() {
      useToast()
      return null
    }
    expect(() => render(<BrokenComponent />)).toThrow('useToast deve ser usado dentro de ToastProvider')
  })
})
