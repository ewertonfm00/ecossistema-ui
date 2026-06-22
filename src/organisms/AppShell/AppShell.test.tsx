import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AppShell } from './AppShell'

describe('AppShell', () => {
  it('renders sidebar and children', () => {
    render(
      <AppShell sidebar={<div>Sidebar Content</div>}>
        <div>Main Content</div>
      </AppShell>
    )
    expect(screen.getByText('Sidebar Content')).toBeInTheDocument()
    expect(screen.getByText('Main Content')).toBeInTheDocument()
  })

  it('<aside> está presente no DOM', () => {
    const { container } = render(
      <AppShell sidebar={<div>Nav</div>}>
        <div>Content</div>
      </AppShell>
    )
    expect(container.querySelector('aside')).toBeInTheDocument()
  })

  it('<aside> tem aria-label="Navegação lateral"', () => {
    render(
      <AppShell sidebar={<div>Nav</div>}>
        <div>Content</div>
      </AppShell>
    )
    expect(screen.getByRole('complementary', { name: 'Navegação lateral' })).toBeInTheDocument()
  })

  it('<main> tem id="main-content"', () => {
    const { container } = render(
      <AppShell sidebar={<div>Nav</div>}>
        <div>Content</div>
      </AppShell>
    )
    expect(container.querySelector('main#main-content')).toBeInTheDocument()
  })

  it('sidebarOpen=true renderiza o Drawer com conteúdo da sidebar', () => {
    render(
      <AppShell
        sidebar={<div>Mobile Sidebar</div>}
        sidebarOpen={true}
        onSidebarClose={() => {}}
      >
        <div>Content</div>
      </AppShell>
    )
    // Drawer renderiza como role="dialog"
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getAllByText('Mobile Sidebar').length).toBeGreaterThan(0)
  })

  it('onSidebarClose é chamado ao pressionar Escape no Drawer', () => {
    const handleClose = vi.fn()
    render(
      <AppShell
        sidebar={<div>Sidebar</div>}
        sidebarOpen={true}
        onSidebarClose={handleClose}
      >
        <div>Content</div>
      </AppShell>
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(handleClose).toHaveBeenCalled()
  })

  it('sidebar desktop tem classe hidden lg:flex', () => {
    const { container } = render(
      <AppShell sidebar={<div>Nav</div>}>
        <div>Content</div>
      </AppShell>
    )
    const aside = container.querySelector('aside')
    expect(aside?.className).toContain('hidden')
    expect(aside?.className).toContain('lg:flex')
  })

  it('slot header é renderizado quando fornecido', () => {
    render(
      <AppShell sidebar={<div>Nav</div>} header={<header>Top Bar</header>}>
        <div>Content</div>
      </AppShell>
    )
    expect(screen.getByText('Top Bar')).toBeInTheDocument()
  })
})
