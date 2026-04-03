import { Image } from 'lucide-react'
import type { Product } from '../../types'
import { useOrderStore } from '../../store/orderSlice'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useOrderStore((state) => state.addToCart)

  const handleClick = () => {
    addToCart(product)
  }

  return (
    <button
      onClick={handleClick}
      aria-label={`Add ${product.name} to order, $${product.price.toFixed(2)}`}
      className="aspect-square border border-slate-200 rounded-xl bg-white hover:shadow-md hover:border-blue-300 active:scale-95 transition-shadow cursor-pointer flex flex-col overflow-hidden min-h-[44px] min-w-[44px] text-left"
    >
      <div className="bg-slate-100 rounded-t-xl h-2/3 flex items-center justify-center">
        <Image className="w-8 h-8 text-slate-400" />
      </div>
      <div className="flex flex-col flex-1">
        <span className="font-semibold text-sm truncate px-2 pt-1">{product.name}</span>
        <span className="text-lg font-bold text-blue-600 px-2 pb-2">${product.price.toFixed(2)}</span>
      </div>
    </button>
  )
}
