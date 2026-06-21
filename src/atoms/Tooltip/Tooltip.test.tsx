import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('trigger="focus": tooltip visível ao dar focus', async () => {
    render(
      <Tooltip content="Focus tooltip" trigger="focus">
        <button>focusable</button>
      </Tooltip>
    )
    const tooltip = screen.getByRole('tooltip', { hidden: true })
    expect(tooltip).toHaveClass('invisible')
    await userEvent.tab()
    expect(tooltip).toHaveClass('visible')
    expect(tooltip).not.toHaveClass('invisible')
  })

  it('trigger="both": tooltip visível ao dar focus', async () => {
    render(
      <Tooltip content="Both tooltip" trigger="both">
        <button>target</button>
      </Tooltip>
    )
    const tooltip = screen.getByRole('tooltip', { hidden: true })
    await userEvent.tab()
    expect(tooltip).toHaveClass('visible')
  })

  it('trigger="hover" (padrão): comportamento inalterado — tooltip no DOM com invisible', () => {
    render(<Tooltip content="Default"><button>btn</button></Tooltip>)
    const tooltip = screen.getByRole('tooltip', { hidden: true })
    expect(tooltip).toHaveClass('invisible')
    expect(tooltip).toHaveClass('group-hover:visible')
  })
})
