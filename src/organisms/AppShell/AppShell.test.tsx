import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
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
})
