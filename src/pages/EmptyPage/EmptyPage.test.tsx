import { render, screen } from '@testing-library/react'
import { EmptyPage } from './EmptyPage'

describe('EmptyPage', () => {
  it('renders without error', () => {
    render(<EmptyPage />)
  })

  it('shows alert when not loading', () => {
    render(<EmptyPage loading={false} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
