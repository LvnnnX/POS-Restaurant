import { create } from 'zustand'
import type { CartItem, Product } from '../types'
import { TAX_RATE } from '../types/constants'
import type { WaitingListEntry, WaitingListItem } from './waitingListSlice'
import { useWaitingListStore } from './waitingListSlice'

interface OrderState {
  items: CartItem[]
  buyerName: string
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, delta: number) => void
  updateNotes: (productId: string, notes: string) => void
  setBuyerName: (name: string) => void
  clearCart: () => void
  subtotal: () => number
  tax: () => number
  total: () => number
  completeOrder: () => void
}

export const useOrderStore = create<OrderState>((set, get) => ({
  items: [],
  buyerName: '',
  addToCart: (product) => set((state) => {
    const existing = state.items.find(i => i.product.id === product.id)
    if (existing) {
      return { items: state.items.map(i =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      )}
    }
    return { items: [...state.items, { product, quantity: 1, notes: '' }] }
  }),
  removeFromCart: (productId) => set((state) => ({
    items: state.items.filter(i => i.product.id !== productId)
  })),
  updateQuantity: (productId, delta) => set((state) => ({
    items: state.items.map(i => {
      if (i.product.id !== productId) return i
      const newQty = i.quantity + delta
      return newQty <= 0 ? null : { ...i, quantity: newQty }
    }).filter(Boolean) as CartItem[]
  })),
  updateNotes: (productId, notes) => set((state) => ({
    items: state.items.map(i =>
      i.product.id === productId ? { ...i, notes } : i
    )
  })),
  setBuyerName: (name) => set({ buyerName: name }),
  clearCart: () => set({ items: [], buyerName: '' }),
  subtotal: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  tax: () => get().subtotal() * TAX_RATE,
  total: () => get().subtotal() + get().tax(),
  completeOrder: () => {
    const currentItems = get().items
    if (currentItems.length === 0) return

    const entry: WaitingListEntry = {
      id: String(Date.now()),
      buyerName: get().buyerName,
      total: get().total(),
      items: currentItems.map((ci): WaitingListItem => ({
        name: ci.product.name,
        quantity: ci.quantity,
        price: ci.product.price
      })),
      timestamp: Date.now()
    }

    // Access waiting list store without using hooks inside actions
    useWaitingListStore.getState().addToWaitingList(entry)

    // Clear active cart after moving to waiting list
    set({ items: [], buyerName: '' })
  },
}))
