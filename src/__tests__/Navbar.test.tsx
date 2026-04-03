import { render, screen } from '@testing-library/react'
import { Navbar } from '../components/layout/Navbar'
import { describe, it, expect } from 'vitest'

describe('Navbar', () => {
  it('renders all three sections', () => {
    render(<Navbar />)
    expect(screen.getByText('Restaurant POS')).toBeInTheDocument()
    expect(screen.getByText('Admin: John Doe')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
  })

  it('logout button has proper touch target', () => {
    render(<Navbar />)
    const button = screen.getByRole('button', { name: /logout/i })
    expect(button).toHaveClass('min-h-[44px]')
    expect(button).toHaveClass('min-w-[44px]')
  })
})
