import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProductCard } from '../components/catalog/ProductCard'
import type { Product } from '../types'

const mockProduct: Product = {
  id: 'test-1',
  name: 'Test Burger',
  price: 15000, // Updated to IDR price
  category: 'Burgers',
  isAvailable: true
}

describe('ProductCard', () => {
  it('renders product name and price', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Burger')).toBeInTheDocument()
    expect(screen.getByText(/Rp.*15.*000/)).toBeInTheDocument()
  })

  it('has aria-label with product info', () => {
    render(<ProductCard product={mockProduct} />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label')
    const ariaLabel = button.getAttribute('aria-label')
    expect(ariaLabel).toMatch(/Add Test Burger to order, Rp.*15.*000/)
  })
})
