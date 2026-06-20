import { render, screen } from '@testing-library/react'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  it('renders children without error', () => {
    render(<Tooltip content="Hint"><button>hover me</button></Tooltip>)
    expect(screen.getByText('hover me')).toBeInTheDocument()
  })

  it('has role="tooltip" in DOM', () => {
    render(<Tooltip content="Hint"><button>hover me</button></Tooltip>)
    expect(screen.getByRole('tooltip', { hidden: true })).toBeInTheDocument()
  })

  it('adds aria-describedby to children', () => {
    render(<Tooltip content="Hint"><button>hover me</button></Tooltip>)
    const btn = screen.getByText('hover me')
    expect(btn).toHaveAttribute('aria-describedby')
  })

  it('renders content text in DOM', () => {
    render(<Tooltip content="Tooltip content"><button>btn</button></Tooltip>)
    expect(screen.getByText('Tooltip content')).toBeInTheDocument()
  })

  it('applies top-full class when position=bottom', () => {
    render(<Tooltip content="Hint" position="bottom"><button>btn</button></Tooltip>)
    expect(screen.getByRole('tooltip', { hidden: true })).toHaveClass('top-full')
  })
})
