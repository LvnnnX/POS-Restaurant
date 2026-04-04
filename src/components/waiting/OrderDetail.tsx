// React import is not required with new JSX transform
import type { WaitingListEntry } from '../../store/waitingListSlice'
import { formatCurrency } from '../../types/constants'
import React, { useEffect, useRef } from 'react'
import { Clock, CheckCircle, Banknote, CreditCard } from 'lucide-react'

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
      <div className="bg-slate-800/95 border border-slate-600 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-auto p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 id="order-details-title" className="text-xl font-bold text-emerald-400">Order Details</h3>
          <button 
            ref={closeBtnRef} 
            onClick={onClose} 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-red-500 shadow-md hover:shadow-lg" 
            data-testid="order-detail-close"
          >
            Close
          </button>
        </div>

        <div className="mb-6">
          {order.admin ? (
            <div className="text-sm text-slate-300 mb-2">Admin: <span className="text-white font-medium">{order.admin}</span></div>
          ) : null}
          <div className="text-sm text-slate-300 mb-2">Buyer: <span className="text-white font-medium">{order.buyerName}</span></div>
          <div className="text-sm text-slate-300 mb-2">Time: <span className="text-white font-medium">{new Date(order.timestamp).toLocaleString()}</span></div>
          
          {/* Status and Payment Display */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-sm text-slate-300">Status:</span>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
              order.status === 'PROCESS' 
                ? 'bg-orange-600/20 text-orange-300 border border-orange-500/50' 
                : 'bg-green-600/20 text-green-300 border border-green-500/50'
            }`}>
              {order.status === 'PROCESS' ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
              {order.status}
            </span>

            {order.paymentMethod && (
              <>
                <span className="text-sm text-slate-300 ml-4">Payment:</span>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${
                  order.paymentMethod === 'Cash' 
                    ? 'bg-green-600/20 text-green-300 border-green-500/50' 
                    : 'bg-blue-600/20 text-blue-300 border-blue-500/50'
                }`}>
                  {order.paymentMethod === 'Cash' 
                    ? <Banknote className="w-3 h-3" /> 
                    : <CreditCard className="w-3 h-3" />}
                  {order.paymentMethod}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="border-t border-slate-700 mb-4 pt-4"></div>

        <ul className="space-y-3 mb-6" aria-label="Order items">
          {order.items.map((it, idx) => (
            <li key={idx} className="py-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{it.name} × {it.quantity}</span>
                <span className="text-emerald-300 font-semibold">{formatCurrency(it.price * it.quantity)}</span>
              </div>
              {it.notes ? <div className="text-xs text-slate-400 mt-2 pl-2 border-l-2 border-slate-600 italic">Notes: {it.notes}</div> : null}
            </li>
          ))}
        </ul>

        {/* Divider before Total */}
        <div className="border-t-2 border-emerald-600/30 mb-4 pt-4"></div>

        <div className="flex items-center justify-between font-bold text-xl">
          <span className="text-white">Total</span>
          <span className="text-emerald-400">{formatCurrency(order.total)}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
