import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { FileUpload } from './FileUpload'

function makeFile(name: string, type: string, size = 100) {
  const file = new File(['x'.repeat(size)], name, { type })
  return file
}

describe('FileUpload', () => {
  it('renderiza área de drop com texto padrão', () => {
    render(<FileUpload onFiles={vi.fn()} />)
    expect(screen.getByText(/Arraste arquivos aqui/i)).toBeInTheDocument()
  })

  it('aceita arquivo válido e chama onFiles', () => {
    const onFiles = vi.fn()
    const { container } = render(<FileUpload onFiles={onFiles} accept="image/*" />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const file = makeFile('foto.jpg', 'image/jpeg')
    fireEvent.change(input, { target: { files: [file] } })
    expect(onFiles).toHaveBeenCalledWith([file])
  })

  it('arquivo com tipo inválido exibe mensagem de erro', async () => {
    const onFiles = vi.fn()
    const { container } = render(<FileUpload onFiles={onFiles} accept="image/*" />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const file = makeFile('doc.pdf', 'application/pdf')
    fireEvent.change(input, { target: { files: [file] } })
    expect(screen.getByText(/Tipo não permitido/i)).toBeInTheDocument()
    expect(onFiles).not.toHaveBeenCalled()
  })

  it('arquivo maior que maxSize exibe mensagem de tamanho', () => {
    const onFiles = vi.fn()
    const { container } = render(<FileUpload onFiles={onFiles} maxSize={50} />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const file = makeFile('grande.jpg', 'image/jpeg', 100)
    fireEvent.change(input, { target: { files: [file] } })
    expect(screen.getByText(/Arquivo muito grande/i)).toBeInTheDocument()
    expect(onFiles).not.toHaveBeenCalled()
  })

  it('botão × remove arquivo da lista', () => {
    const onFiles = vi.fn()
    const { container } = render(<FileUpload onFiles={onFiles} />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const file = makeFile('foto.jpg', 'image/jpeg')
    fireEvent.change(input, { target: { files: [file] } })
    expect(screen.getByText('foto.jpg')).toBeInTheDocument()
    const removeBtn = screen.getByRole('button', { name: /Remover foto.jpg/i })
    fireEvent.click(removeBtn)
    expect(screen.queryByText('foto.jpg')).not.toBeInTheDocument()
  })

  it('renderiza role="region" com aria-label correto', () => {
    render(<FileUpload onFiles={vi.fn()} />)
    expect(screen.getByRole('region', { name: /Área de upload/i })).toBeInTheDocument()
  })
})
