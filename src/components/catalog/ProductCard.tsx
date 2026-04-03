import { Plus } from 'lucide-react'
import type { Product } from '../../types'
import { useOrderStore } from '../../store/orderSlice'
import { formatCurrency } from '../../types/constants'

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
      aria-label={`Add ${product.name} to order, ${formatCurrency(product.price)}`}
      className="aspect-square border border-slate-600 rounded-2xl bg-slate-800/90 backdrop-blur-sm hover:shadow-xl hover:border-emerald-500 hover:scale-105 active:scale-100 transition-all duration-200 cursor-pointer flex flex-col overflow-hidden min-h-[44px] min-w-[44px] text-left group"
    >
      <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-t-2xl h-2/3 flex items-center justify-center relative overflow-hidden border-b border-slate-600">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextElementSibling?.classList.remove('hidden')
          }}
        />
        <div className="hidden w-full h-full flex items-center justify-center">
          <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
            <Plus className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      <div className="flex flex-col flex-1 p-3 bg-slate-800">
        <span className="font-semibold text-sm text-white truncate mb-1">{product.name}</span>
        <span className="text-lg font-bold text-emerald-400">{formatCurrency(product.price)}</span>
      </div>
    </button>
  )
}
