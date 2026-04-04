// React import is not required with new JSX transform
import type { WaitingListEntry } from '../../store/waitingListSlice'
import { formatCurrency } from '../../types/constants'
import React, { useEffect, useRef } from 'react'

export function OrderDetail({ order, onClose }: { order?: WaitingListEntry; onClose: () => void }) {
  if (!order) return null
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  // Focus management: when opened, focus the close button for quick keyboard dismissal
  useEffect(() => {
    if (order && closeBtnRef.current) closeBtnRef.current.focus()
  }, [order])

  // Keyboard support: Escape closes the dialog
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4"
      role="dialog"
      aria-labelledby="order-details-title"
      aria-modal="true"
      onKeyDown={onKeyDown}
    >
      <div className="bg-slate-800/95 border border-slate-700 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-auto p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 id="order-details-title" className="text-lg font-semibold text-emerald-400">Order Details</h3>
          <button ref={closeBtnRef} onClick={onClose} className="text-slate-300 hover:text-white" data-testid="order-detail-close">Close</button>
        </div>

        <div className="mb-3">
          <div className="text-sm text-slate-300">Buyer: <span className="text-white">{order.buyerName}</span></div>
          <div className="text-sm text-slate-300">Time: <span className="text-white">{new Date(order.timestamp).toLocaleString()}</span></div>
        </div>

        <div className="border-t border-slate-700 mb-2 pt-2"></div>

        <ul className="space-y-2 mb-3" aria-label="Order items">
          {order.items.map((it, idx) => (
            <li key={idx} className="flex justify-between items-center py-1">
              <span className="text-sm text-white">{it.name} × {it.quantity}</span>
              <span className="text-sm text-emerald-300">{formatCurrency(it.price * it.quantity)}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between font-semibold">
          <span>Total</span>
          <span className="text-emerald-300">{formatCurrency(order.total)}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
