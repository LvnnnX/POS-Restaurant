import { useState } from 'react'
import { FileText, Minus, Plus } from 'lucide-react'
import type { CartItem } from '../../types'
import { useOrderStore } from '../../store/orderSlice'
import { formatCurrency } from '../../types/constants'

interface OrderItemProps {
  item: CartItem
}

export function OrderItem({ item }: OrderItemProps) {
  const [showNotes, setShowNotes] = useState(false)
  const updateQuantity = useOrderStore((state) => state.updateQuantity)
  const updateNotes = useOrderStore((state) => state.updateNotes)

  return (
    <div className="flex flex-col py-3 px-3 border border-slate-700 rounded-xl bg-slate-800/50 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        {/* Item name */}
        <span className="flex-1 font-medium text-sm truncate text-white">{item.product.name}</span>

        {/* Quantity controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => updateQuantity(item.product.id, -1)}
            className="w-8 h-8 rounded-full bg-slate-600 hover:bg-slate-500 text-white flex items-center justify-center text-sm font-bold transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-6 text-center font-semibold text-emerald-400">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.product.id, 1)}
            className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center text-sm font-bold transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        {/* Unit price */}
        <span className="text-sm text-emerald-300 w-20 text-right font-medium">
          {formatCurrency(item.product.price * item.quantity)}
        </span>

        {/* Notes button */}
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="w-8 h-8 rounded-lg border border-slate-600 bg-slate-700 flex items-center justify-center hover:bg-slate-600 transition-colors"
          aria-label="Add notes"
        >
          <FileText className="w-4 h-4 text-slate-300" />
        </button>
      </div>

      {/* Notes input */}
      {showNotes && (
        <input
          type="text"
          value={item.notes}
          onChange={(e) => updateNotes(item.product.id, e.target.value)}
          placeholder="Add notes..."
          className="w-full text-xs border border-slate-600 bg-slate-700 text-white placeholder-slate-400 rounded px-2 py-1 mt-2 focus:border-emerald-500 focus:outline-none"
          aria-label="Item notes"
        />
      )}
    </div>
  )
}
