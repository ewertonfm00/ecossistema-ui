import { render, screen } from '@testing-library/react'
import { Divider } from './Divider'

describe('Divider', () => {
  it('renders horizontal divider without error', () => {
    render(<Divider />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('renders label text when label is provided', () => {
    render(<Divider label="or" />)
    expect(screen.getByText('or')).toBeInTheDocument()
  })

  it('has vertical aria-orientation when orientation=vertical', () => {
    render(<Divider orientation="vertical" />)
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical')
  })

  it('has horizontal aria-orientation when default', () => {
    render(<Divider />)
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('renders two hr elements when label is provided', () => {
    const { container } = render(<Divider label="section" />)
    const hrs = container.querySelectorAll('hr')
    expect(hrs).toHaveLength(2)
  })
})
