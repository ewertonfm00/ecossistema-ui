import { render, screen } from '@testing-library/react'
import { ListingPage } from './ListingPage'

describe('ListingPage', () => {
  it('renders without error', () => {
    render(<ListingPage />)
  })

  it('shows at least one row', () => {
    render(<ListingPage />)
    expect(screen.getByText('Ana Beatriz Santos')).toBeInTheDocument()
  })
})
