import { useState } from 'react'
import type { WaitingListEntry } from '../../store/waitingListSlice'
import { useWaitingListStore } from '../../store/waitingListSlice'
import { useAdminStore } from '../../store/adminSlice'
import { formatCurrency } from '../../types/constants'
import { OrderDetail } from './OrderDetail'
import { Clock, CheckCircle, List, User, Banknote, CreditCard } from 'lucide-react'

type StatusFilter = 'ALL' | 'PROCESS' | 'DONE'

export function WaitingList() {
  const waitingList = useWaitingListStore((state) => state.waitingList)
  const updateOrderStatus = useWaitingListStore((state) => state.updateOrderStatus)
  const adminName = useAdminStore((state) => state.adminName)
  const [selectedOrder, setSelectedOrder] = useState<WaitingListEntry | undefined>(undefined)
  const [activeStatusFilter, setActiveStatusFilter] = useState<StatusFilter>('ALL')

  // Calculate dashboard stats
  const allOrders = waitingList
  const processOrders = waitingList.filter(order => order.status === 'PROCESS')
  const doneOrders = waitingList.filter(order => order.status === 'DONE')

  // Filter orders based on selected status
  const filteredOrders = activeStatusFilter === 'ALL' 
    ? allOrders 
    : activeStatusFilter === 'PROCESS' 
    ? processOrders 
    : doneOrders

  // Group filtered orders by day
  const groupOrdersByDay = (orders: WaitingListEntry[]) => {
    const groups: { [key: string]: WaitingListEntry[] } = {}
    
    orders.forEach(order => {
      const date = new Date(order.timestamp)
      const dateKey = date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
      
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(order)
    })

    // Sort groups by date (most recent first)
    const sortedGroups: { [key: string]: WaitingListEntry[] } = {}
    Object.keys(groups)
      .sort((a, b) => {
        const dateA = groups[a][0].timestamp
        const dateB = groups[b][0].timestamp
        return dateB - dateA
      })
      .forEach(key => {
        sortedGroups[key] = groups[key].sort((a, b) => b.timestamp - a.timestamp)
      })

    return sortedGroups
  }

  const groupedOrders = groupOrdersByDay(filteredOrders)

  const handleStatusChange = (orderId: string, newStatus: 'PROCESS' | 'DONE') => {
    updateOrderStatus(orderId, newStatus)
  }

  return (
    <section className="h-full overflow-y-auto p-6 bg-slate-900">
      {/* Dashboard with 3-Status Tabs */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Order Dashboard</h2>
        
        {/* Clickable Dashboard Status Cards */}
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setActiveStatusFilter('ALL')}
            className={`p-4 rounded-xl transition-all duration-200 transform hover:scale-105 ${
              activeStatusFilter === 'ALL'
                ? 'bg-blue-600 border-2 border-blue-400 shadow-lg'
                : 'bg-blue-600/20 border border-blue-500 hover:bg-blue-600/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <List className="w-6 h-6 text-blue-400" />
              <div className="text-left">
                <div className="text-2xl font-bold text-blue-400">{allOrders.length}</div>
                <div className="text-sm text-blue-300">ALL ORDERS</div>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => setActiveStatusFilter('PROCESS')}
            className={`p-4 rounded-xl transition-all duration-200 transform hover:scale-105 ${
              activeStatusFilter === 'PROCESS'
                ? 'bg-orange-600 border-2 border-orange-400 shadow-lg'
                : 'bg-orange-600/20 border border-orange-500 hover:bg-orange-600/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-orange-400" />
              <div className="text-left">
                <div className="text-2xl font-bold text-orange-400">{processOrders.length}</div>
                <div className="text-sm text-orange-300">PROCESS</div>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => setActiveStatusFilter('DONE')}
            className={`p-4 rounded-xl transition-all duration-200 transform hover:scale-105 ${
              activeStatusFilter === 'DONE'
                ? 'bg-green-600 border-2 border-green-400 shadow-lg'
                : 'bg-green-600/20 border border-green-500 hover:bg-green-600/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div className="text-left">
                <div className="text-2xl font-bold text-green-400">{doneOrders.length}</div>
                <div className="text-sm text-green-300">DONE</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Day-Grouped Orders List */}
      {filteredOrders.length === 0 ? (
        <div role="status" aria-live="polite" className="flex items-center justify-center h-full text-slate-400">
          {activeStatusFilter === 'ALL' 
            ? 'No orders at the moment.' 
            : `No ${activeStatusFilter.toLowerCase()} orders at the moment.`}
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedOrders).map(([dateKey, orders]) => (
            <div key={dateKey} className="space-y-3">
              {/* Day Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px bg-slate-700"></div>
                <h3 className="text-lg font-semibold text-slate-300 px-3">{dateKey}</h3>
                <div className="flex-1 h-px bg-slate-700"></div>
              </div>
              
              {/* Orders for this day */}
              {orders.map((order) => (
                <div
                  data-testid="waiting-item"
                  key={order.id}
                  className="border border-slate-700 rounded-xl p-4 bg-slate-800/50"
                >
                  {/* Buyer Name - Primary Display (Larger) */}
                  <div className="mb-2">
                    <div className="text-2xl font-bold text-white">{order.buyerName}</div>
                    <div className="text-slate-400 text-sm">{new Date(order.timestamp).toLocaleTimeString()}</div>
                  </div>

                  {/* Admin Name - Secondary Display (Matches navbar format) */}
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 text-sm font-medium">
                      Admin: {adminName}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 mb-2 sm:mb-0">
                      {/* Status and Payment Badges */}
                      <div className="flex items-center gap-2 mb-2">
                        {/* Status Badge */}
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'PROCESS' 
                            ? 'bg-orange-600/20 text-orange-300 border border-orange-500/50' 
                            : 'bg-green-600/20 text-green-300 border border-green-500/50'
                        }`}>
                          {order.status === 'PROCESS' ? <Clock className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          {order.status}
                        </span>

                        {/* Payment Method Badge */}
                        {order.paymentMethod && (
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${
                            order.paymentMethod === 'Cash' 
                              ? 'bg-green-600/20 text-green-300 border-green-500/50' 
                              : 'bg-blue-600/20 text-blue-300 border-blue-500/50'
                          }`}>
                            {order.paymentMethod === 'Cash' 
                              ? <Banknote className="w-4 h-4" /> 
                              : <CreditCard className="w-4 h-4" />}
                            {order.paymentMethod}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-bold text-emerald-300">{formatCurrency(order.total)}</div>
                      
                      {/* Status Toggle Button */}
                      <button
                        onClick={() => handleStatusChange(order.id, order.status === 'PROCESS' ? 'DONE' : 'PROCESS')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          order.status === 'PROCESS' 
                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                            : 'bg-orange-600 hover:bg-orange-700 text-white'
                        }`}
                        title={order.status === 'PROCESS' ? 'Mark as Done' : 'Mark as Process'}
                      >
                        {order.status === 'PROCESS' ? 'Mark Done' : 'Mark Process'}
                      </button>
                      
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium"
                        aria-label="View order details"
                        data-testid="view-details-button"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <OrderDetail order={selectedOrder} onClose={() => setSelectedOrder(undefined)} />
    </section>
  )
}

export default WaitingList
