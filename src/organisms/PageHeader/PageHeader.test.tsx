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
})
