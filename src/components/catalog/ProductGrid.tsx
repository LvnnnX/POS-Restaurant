import { useEffect } from 'react'
import { ProductCard } from './ProductCard'
import { useCatalogStore } from '../../store/catalogSlice'
import { menuItems } from '../../mocks/data/menu'
import { ChefHat, Search } from 'lucide-react'
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
      <div className="h-full flex items-center justify-center bg-slate-900">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500">
            <ChefHat className="w-8 h-8 text-emerald-400 animate-pulse" />
          </div>
          <p className="text-emerald-400 text-lg font-medium">Loading menu...</p>
          <p className="text-slate-400 text-sm">Preparing delicious options</p>
        </div>
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-900">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500">
            <Search className="w-8 h-8 text-emerald-400" />
          </div>
          <p className="text-emerald-400 text-lg font-medium">No dishes found</p>
          <p className="text-slate-400 text-sm">Try a different search or category</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-6 bg-slate-900">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
