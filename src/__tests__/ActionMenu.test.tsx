import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ActionMenu } from '../components/order/ActionMenu'

describe('ActionMenu', () => {
  it('renders three buttons', () => {
    render(<ActionMenu />)
    expect(screen.getByRole('button', { name: /print bill/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /process payment/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /toggle calculator/i })).toBeInTheDocument()
  })

  it('payment button is most prominent (green)', () => {
    render(<ActionMenu />)
    const paymentButton = screen.getByRole('button', { name: /process payment/i })
    expect(paymentButton).toHaveClass('bg-green-600')
  })
})
