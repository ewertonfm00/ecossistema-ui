import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SidebarNav } from './SidebarNav'
import type { SidebarNavItem } from './SidebarNav'

const items: SidebarNavItem[] = [
  { label: 'Dashboard', icon: 'Menu', href: '/dashboard', active: true },
  { label: 'Configurações', icon: 'Settings', href: '/settings' },
  { label: 'Bloqueado', icon: 'Shield', href: '/blocked', disabled: true },
]

describe('SidebarNav', () => {
  it('renderiza labels dos itens', () => {
    render(<SidebarNav items={items} />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Configurações')).toBeInTheDocument()
    expect(screen.getByText('Bloqueado')).toBeInTheDocument()
  })

  it('item ativo tem aria-current="page"', () => {
    render(<SidebarNav items={items} />)
    const activeLink = screen.getByRole('link', { name: /Dashboard/i })
    expect(activeLink).toHaveAttribute('aria-current', 'page')
  })

  it('collapsed=true → labels têm classe sr-only', () => {
    render(<SidebarNav items={items} collapsed={true} />)
    const labelSpans = screen.getAllByText(/Dashboard|Configurações|Bloqueado/)
    labelSpans.forEach(span => {
      expect(span).toHaveClass('sr-only')
    })
  })

  it('botão toggle chama onToggleCollapse ao clicar', () => {
    const onToggle = vi.fn()
    render(<SidebarNav items={items} onToggleCollapse={onToggle} />)
    const toggleButton = screen.getByRole('button', { name: /Recolher menu/i })
    fireEvent.click(toggleButton)
    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('item disabled tem classe pointer-events-none', () => {
    render(<SidebarNav items={items} />)
    const disabledLink = screen.getByRole('link', { name: /Bloqueado/i })
    expect(disabledLink).toHaveClass('pointer-events-none')
  })

  it('compact=true oculta os labels dos itens com sr-only', () => {
    const singleItem = [{ label: 'Início', icon: 'Home', href: '/' }]
    render(<SidebarNav items={singleItem} compact={true} />)
    const label = screen.getByText('Início')
    expect(label.className).toContain('sr-only')
  })
})
