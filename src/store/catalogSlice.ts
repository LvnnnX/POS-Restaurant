import { create } from 'zustand'
import type { Product } from '../types'

interface CatalogState {
  products: Product[]
  searchQuery: string
  selectedCategory: string | null
  setProducts: (products: Product[]) => void
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string | null) => void
  getFilteredProducts: () => Product[]
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
  products: [],
  searchQuery: '',
  selectedCategory: null,
  setProducts: (products) => set({ products }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  getFilteredProducts: () => {
    const { products, searchQuery, selectedCategory } = get()
    let filtered = products
    
    // Search works across ALL categories (ignores selected category when searching)
    if (searchQuery.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    } else if (selectedCategory) {
      // Only filter by category when NOT searching
      filtered = filtered.filter(p => p.category === selectedCategory)
    }
    
    return filtered
  },
}))
