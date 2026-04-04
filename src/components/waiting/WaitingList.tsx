import { useState } from 'react'
import type { WaitingListEntry } from '../../store/waitingListSlice'
import { useWaitingListStore } from '../../store/waitingListSlice'
import { formatCurrency } from '../../types/constants'
import { OrderDetail } from './OrderDetail'
import { Clock, CheckCircle } from 'lucide-react'

export function WaitingList() {
  const waitingList = useWaitingListStore((state) => state.waitingList)
  const updateOrderStatus = useWaitingListStore((state) => state.updateOrderStatus)
  const [selectedOrder, setSelectedOrder] = useState<WaitingListEntry | undefined>(undefined)

  // Calculate dashboard stats
  const processOrders = waitingList.filter(order => order.status === 'PROCESS')
  const doneOrders = waitingList.filter(order => order.status === 'DONE')

  const handleStatusChange = (orderId: string, newStatus: 'PROCESS' | 'DONE') => {
    updateOrderStatus(orderId, newStatus)
  }

  return (
    <section className="h-full overflow-y-auto p-6 bg-slate-900">
      {/* Dashboard */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Order Dashboard</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-orange-600/20 border border-orange-500 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-2xl font-bold text-orange-400">{processOrders.length}</div>
                <div className="text-sm text-orange-300">PROCESS</div>
              </div>
            </div>
          </div>
          <div className="bg-green-600/20 border border-green-500 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-green-400">{doneOrders.length}</div>
                <div className="text-sm text-green-300">DONE</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {waitingList.length === 0 ? (
        <div role="status" aria-live="polite" className="flex items-center justify-center h-full text-slate-400">
          No waiting orders at the moment.
        </div>
      ) : (
        <div className="space-y-3">
          {waitingList.map((order) => {
            // Item notes are shown in the detail view; no notes preview on the waiting list
            return (
              <div
                data-testid="waiting-item"
                key={order.id}
                className="flex flex-col sm:flex-row sm:items-start sm:justify-between border border-slate-700 rounded-xl p-3 bg-slate-800/50"
              >
                <div className="min-w-0 mb-2 sm:mb-0">
                  <div className="font-semibold text-white truncate">{order.buyerName}</div>
                  <div className="text-slate-400 text-xs">{new Date(order.timestamp).toLocaleString()}</div>
                  
                  {/* Status Badge */}
                  <div className="mt-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'PROCESS' 
                        ? 'bg-orange-600/20 text-orange-300 border border-orange-500/50' 
                        : 'bg-green-600/20 text-green-300 border border-green-500/50'
                    }`}>
                      {order.status === 'PROCESS' ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                      {order.status}
                    </span>
                  </div>

                  {order.paymentMethod ? (
                    <div className="text-xs text-slate-400 mt-1">Payment: {order.paymentMethod}</div>
                  ) : null}
                  {order.admin ? (
                    <div className="text-xs text-slate-400 mt-1">Admin: {order.admin}</div>
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold text-emerald-300">{formatCurrency(order.total)}</div>
                  
                  {/* Status Toggle Button */}
                  <button
                    onClick={() => handleStatusChange(order.id, order.status === 'PROCESS' ? 'DONE' : 'PROCESS')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      order.status === 'PROCESS' 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-orange-600 hover:bg-orange-700 text-white'
                    }`}
                    title={order.status === 'PROCESS' ? 'Mark as Done' : 'Mark as Process'}
                  >
                    {order.status === 'PROCESS' ? 'Done' : 'Process'}
                  </button>
                  
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
            )
          })}
        </div>
      )}

      <OrderDetail order={selectedOrder} onClose={() => setSelectedOrder(undefined)} />
    </section>
  )
}

export default WaitingList
