import { useState } from 'react'
import type { WaitingListEntry } from '../../store/waitingListSlice'
import { useWaitingListStore } from '../../store/waitingListSlice'
import { formatCurrency } from '../../types/constants'
import { OrderDetail } from './OrderDetail'

export function WaitingList() {
  const waitingList = useWaitingListStore((state) => state.waitingList)
  const [selectedOrder, setSelectedOrder] = useState<WaitingListEntry | undefined>(undefined)

  return (
    <section className="h-full overflow-y-auto p-6 bg-slate-900">
      {waitingList.length === 0 ? (
        <div role="status" aria-live="polite" className="flex items-center justify-center h-full text-slate-400">
          No waiting orders at the moment.
        </div>
      ) : (
        <div className="space-y-3">
          {waitingList.map((order) => (
            <div
              data-testid="waiting-item"
              key={order.id}
              className="flex items-center justify-between border border-slate-700 rounded-xl p-3 bg-slate-800/50"
            >
              <div className="min-w-0">
                <div className="font-semibold text-white truncate">{order.buyerName}</div>
                <div className="text-slate-400 text-xs">{new Date(order.timestamp).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm font-semibold text-emerald-300">{formatCurrency(order.total)}</div>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
                  aria-label="View order details"
                  data-testid="view-details-button"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <OrderDetail order={selectedOrder} onClose={() => setSelectedOrder(undefined)} />
    </section>
  )
}

export default WaitingList
