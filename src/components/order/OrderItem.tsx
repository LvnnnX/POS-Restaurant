import { useState } from 'react'
import { FileText, Minus, Plus } from 'lucide-react'
import type { CartItem } from '../../types'
import { useOrderStore } from '../../store/orderSlice'

interface OrderItemProps {
  item: CartItem
}

export function OrderItem({ item }: OrderItemProps) {
  const [showNotes, setShowNotes] = useState(false)
  const updateQuantity = useOrderStore((state) => state.updateQuantity)
  const updateNotes = useOrderStore((state) => state.updateNotes)

  return (
    <div className="flex flex-col py-2 px-3 border-b border-slate-100">
      <div className="flex items-center gap-2">
        {/* Item name */}
        <span className="flex-1 font-medium text-sm truncate">{item.product.name}</span>

        {/* Quantity controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => updateQuantity(item.product.id, -1)}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-sm font-bold"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-6 text-center font-semibold">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.product.id, 1)}
            className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center text-sm font-bold"
            aria-label="Increase quantity"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        {/* Unit price */}
        <span className="text-sm text-slate-600 w-16 text-right">
          ${(item.product.price * item.quantity).toFixed(2)}
        </span>

        {/* Notes button */}
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-100"
          aria-label="Add notes"
        >
          <FileText className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      {/* Notes input */}
      {showNotes && (
        <input
          type="text"
          value={item.notes}
          onChange={(e) => updateNotes(item.product.id, e.target.value)}
          placeholder="Add notes..."
          className="w-full text-xs border border-slate-300 rounded px-2 py-1 mt-1"
          aria-label="Item notes"
        />
      )}
    </div>
  )
}
