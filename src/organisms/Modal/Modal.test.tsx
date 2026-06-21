import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './Modal'
import { Button } from '@/atoms/Button/Button'

function Wrapper({
  open = true,
  onClose = () => {},
}: {
  open?: boolean
  onClose?: () => void
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Título do Modal"
      footer={
        <Button variant="primary" onClick={onClose}>
          OK
        </Button>
      }
    >
      <p>Conteúdo do modal</p>
      <input data-testid="input-dentro" />
    </Modal>
  )
}

describe('Modal', () => {
  it('renderiza quando open=true', () => {
    render(<Wrapper open={true} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Título do Modal')).toBeInTheDocument()
  })

  it('não renderiza quando open=false', () => {
    render(<Wrapper open={false} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('tem aria-labelledby apontando para o título', () => {
    render(<Wrapper />)
    const dialog = screen.getByRole('dialog')
    const labelledBy = dialog.getAttribute('aria-labelledby')
    expect(labelledBy).toBeTruthy()
    const title = document.getElementById(labelledBy!)
    expect(title?.textContent).toBe('Título do Modal')
  })

  it('chama onClose ao pressionar Escape', async () => {
    const onClose = vi.fn()
    render(<Wrapper onClose={onClose} />)
    await userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('chama onClose ao clicar no overlay', () => {
    const onClose = vi.fn()
    render(<Wrapper onClose={onClose} />)
    fireEvent.click(screen.getByTestId('modal-overlay'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('NÃO chama onClose ao clicar dentro do painel', () => {
    const onClose = vi.fn()
    render(<Wrapper onClose={onClose} />)
    fireEvent.click(screen.getByText('Conteúdo do modal'))
    expect(onClose).not.toHaveBeenCalled()
  })
})
