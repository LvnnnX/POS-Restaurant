import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { OrderList } from '../components/order/OrderList'
import { useOrderStore } from '../store/orderSlice'

// Reset store before each test
beforeEach(() => {
  useOrderStore.setState({ items: [] })
})

describe('OrderList', () => {
  it('shows empty state when no items', () => {
    render(<OrderList />)
    expect(screen.getByText('No items in order — tap products to add')).toBeInTheDocument()
  })

  it('displays tax and total when items exist', () => {
    // Add item via store
    useOrderStore.setState({
      items: [{
        product: { id: '1', name: 'Test', price: 10, category: 'Test', isAvailable: true },
        quantity: 1,
        notes: ''
      }] as any
    })
    render(<OrderList />)
    expect(screen.getByText('Tax')).toBeInTheDocument()
    expect(screen.getByText('Total')).toBeInTheDocument()
  })
})
