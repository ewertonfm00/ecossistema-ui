import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PageHeader } from './PageHeader'
import type { BreadcrumbItem } from './PageHeader'

const breadcrumbs: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Módulos', href: '/modulos' },
  { label: 'Detalhes' },
]

describe('PageHeader', () => {
  it('renderiza title em <h1>', () => {
    render(<PageHeader title="Minha Página" />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent('Minha Página')
  })

  it('breadcrumbs renderizam como <ol> com <li> para cada item', () => {
    const { container } = render(<PageHeader title="Título" breadcrumbs={breadcrumbs} />)
    const ol = container.querySelector('ol')
    expect(ol).toBeInTheDocument()
    const listItems = ol!.querySelectorAll('li')
    expect(listItems).toHaveLength(breadcrumbs.length)
  })

  it('último breadcrumb tem aria-current="page" e não é um link', () => {
    render(<PageHeader title="Título" breadcrumbs={breadcrumbs} />)
    const currentItem = screen.getByText('Detalhes')
    expect(currentItem).toHaveAttribute('aria-current', 'page')
    expect(currentItem.tagName.toLowerCase()).not.toBe('a')
  })

  it('actions slot é renderizado quando fornecido', () => {
    render(
      <PageHeader
        title="Título"
        actions={<button>Nova Ação</button>}
      />
    )
    expect(screen.getByRole('button', { name: 'Nova Ação' })).toBeInTheDocument()
  })

  it('com 3+ breadcrumbs, itens do meio têm classe hidden md:flex', () => {
    const breadcrumbs3: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Clientes', href: '/clientes' },
      { label: 'Novo' },
    ]
    render(<PageHeader title="Novo" breadcrumbs={breadcrumbs3} />)
    // O item do meio (Clientes) deve estar dentro de li.hidden.md:flex
    const listItems = document.querySelectorAll('ol li')
    // Middle item (index 1) should have hidden class
    expect(listItems[1].className).toContain('hidden')
    expect(listItems[1].className).toContain('md:flex')
  })
})
