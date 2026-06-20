import { render, screen } from '@testing-library/react'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders without error', () => {
    render(<Skeleton />)
    expect(screen.getByRole('presentation', { hidden: true })).toBeInTheDocument()
  })

  it('has rounded-full class when variant=circle', () => {
    render(<Skeleton variant="circle" />)
    expect(screen.getByRole('presentation', { hidden: true })).toHaveClass('rounded-full')
  })

  it('has rounded class and not rounded-md when variant=text', () => {
    render(<Skeleton variant="text" />)
    const el = screen.getByRole('presentation', { hidden: true })
    expect(el).toHaveClass('rounded')
    expect(el).not.toHaveClass('rounded-md')
  })

  it('applies numeric width as px in style', () => {
    render(<Skeleton width={200} />)
    const el = screen.getByRole('presentation', { hidden: true })
    expect(el).toHaveStyle({ width: '200px' })
  })

  it('has aria-hidden="true"', () => {
    render(<Skeleton />)
    expect(screen.getByRole('presentation', { hidden: true })).toHaveAttribute('aria-hidden', 'true')
  })
})
