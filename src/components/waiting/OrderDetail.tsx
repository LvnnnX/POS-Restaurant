// React import is not required with new JSX transform
import type { WaitingListEntry } from '../../store/waitingListSlice'
import { formatCurrency } from '../../types/constants'
import React, { useEffect, useRef } from 'react'
import { Clock, CheckCircle } from 'lucide-react'

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

  // Notes are displayed per-item; no order-level notes aggregation in header

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-labelledby="order-details-title"
      aria-modal="true"
      onKeyDown={onKeyDown}
    >
      <div className="bg-slate-800/95 border border-slate-700 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-auto p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 id="order-details-title" className="text-lg font-semibold text-emerald-400">Order Details</h3>
          <button 
            ref={closeBtnRef} 
            onClick={onClose} 
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors border border-red-500" 
            data-testid="order-detail-close"
          >
            Close
          </button>
        </div>

        <div className="mb-3">
          {order.admin ? (
            <div className="text-sm text-slate-300">Admin: <span className="text-white">{order.admin}</span></div>
          ) : null}
          <div className="text-sm text-slate-300">Buyer: <span className="text-white">{order.buyerName}</span></div>
          <div className="text-sm text-slate-300">Time: <span className="text-white">{new Date(order.timestamp).toLocaleString()}</span></div>
          
          {/* Status Display */}
          <div className="text-sm text-slate-300 mt-2">
            Status: 
            <span className={`inline-flex items-center gap-1 ml-2 px-2 py-1 rounded-full text-xs font-medium ${
              order.status === 'PROCESS' 
                ? 'bg-orange-600/20 text-orange-300 border border-orange-500/50' 
                : 'bg-green-600/20 text-green-300 border border-green-500/50'
            }`}>
              {order.status === 'PROCESS' ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
              {order.status}
            </span>
          </div>
        </div>

        <div className="border-t border-slate-700 mb-2 pt-2"></div>

        <ul className="space-y-2 mb-3" aria-label="Order items">
          {order.items.map((it, idx) => (
            <li key={idx} className="py-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">{it.name} × {it.quantity}</span>
                <span className="text-sm text-emerald-300">{formatCurrency(it.price * it.quantity)}</span>
              </div>
              {it.notes ? <div className="text-xs text-slate-300 mt-1">Notes: {it.notes}</div> : null}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between font-semibold">
          <span>Total</span>
          <span className="text-emerald-300">{formatCurrency(order.total)}</span>
        </div>
        {order.paymentMethod ? (
          <div className="text-sm text-slate-300 mt-1">Payment Method: <span className="text-white">{order.paymentMethod}</span></div>
        ) : null}
      </div>
    </div>
  )
}

export default OrderDetail
