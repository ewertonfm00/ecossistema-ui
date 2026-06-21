import { render, screen } from '@testing-library/react'
import { DashboardPage } from './DashboardPage'

describe('DashboardPage', () => {
  it('renders without error', () => {
    render(<DashboardPage />)
  })

  it('shows navigation', () => {
    render(<DashboardPage />)
    expect(screen.getByRole('navigation', { name: 'Menu principal' })).toBeInTheDocument()
  })
})
