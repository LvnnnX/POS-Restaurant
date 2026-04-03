import { useEffect } from 'react'
import { ProductCard } from './ProductCard'
import { useCatalogStore } from '../../store/catalogSlice'
import { menuItems } from '../../mocks/data/menu'
import type { Product } from '../../types'

export function ProductGrid() {
  const products = useCatalogStore((state) => state.products)
  const setProducts = useCatalogStore((state) => state.setProducts)
  const getFilteredProducts = useCatalogStore((state) => state.getFilteredProducts)

  useEffect(() => {
    // In development, use MSW API; in production, use static data
    if (import.meta.env.DEV) {
      fetch('/api/menu')
        .then((res) => res.json())
        .then((data: Product[]) => setProducts(data))
        .catch((err) => {
          console.error('Failed to fetch menu:', err)
          // Fallback to static data if MSW fails
          setProducts(menuItems)
        })
    } else {
      // Production: use static menu data directly
      setProducts(menuItems)
    }
  }, [setProducts])

  const filteredProducts = getFilteredProducts()

  if (products.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400 text-sm">
        Loading products...
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400 text-sm">
        No products found
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
