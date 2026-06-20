import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Icon } from './Icon'

describe('Icon', () => {
  it('renders a known icon', () => {
    render(<Icon name="Check" aria-hidden={false} aria-label="check icon" />)
    expect(screen.getByLabelText('check icon')).toBeInTheDocument()
  })

  it('renders empty span for unknown icon', () => {
    const { container } = render(<Icon name="UnknownIcon" />)
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('accepts size prop', () => {
    const { container } = render(<Icon name="Check" size={24} />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})
