import { OrderItem } from './OrderItem'
import { useOrderStore } from '../../store/orderSlice'
import { useUIStore } from '../../store/uiSlice'
import { Printer, CreditCard, User, Calculator } from 'lucide-react'
import { CalculatorPanel } from '../calculator/CalculatorPanel'
import { useState } from 'react'
import { formatCurrency } from '../../types/constants'

export function OrderList() {
  const items = useOrderStore((state) => state.items)
  const buyerName = useOrderStore((state) => state.buyerName)
  const setBuyerName = useOrderStore((state) => state.setBuyerName)
  const tax = useOrderStore((state) => state.tax())
  const total = useOrderStore((state) => state.total())
  const paymentMethod = useOrderStore((state) => state.paymentMethod)
  const setPaymentModalOpen = useUIStore((state) => state.setPaymentModalOpen)
  // Sticky calculator state
  const [showCalculator, setShowCalculator] = useState(false)

  const handlePrint = () => window.print()

  const isEmpty = items.length === 0
  const completeOrder = useOrderStore((state) => state.completeOrder)

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-3 flex-shrink-0">
        <h2 className="text-lg font-semibold">Current Order</h2>
        <p className="text-emerald-100 text-sm">{items.length} item{items.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Buyer Name Section */}
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex-shrink-0">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buyer name..."
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 min-h-[40px]"
            aria-label="Buyer name"
            data-testid="buyer-name"
          />
        </div>
      </div>

      {/* Scrollable items area - this will show scrollbar when content overflows */}
      {/* Added a dedicated scrollbar class to style and ensure isolation of scrolling to this area only */}
      <div className="flex-1 overflow-y-auto min-h-0 p-4 bg-slate-900 order-list-scrollarea">
        {isEmpty ? (
          <div className="h-full flex items-center justify-center text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500">
                <Printer className="w-8 h-8 text-emerald-400" />
              </div>
              <p className="text-emerald-400 text-sm">No items in order</p>
              <p className="text-slate-400 text-xs">Tap products to add</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <OrderItem key={item.product.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Sticky Summary + Actions - bottom bar with calculator toggle (sticky) */}
      <div className="border-t-2 border-emerald-600 bg-slate-800 p-4 flex-shrink-0 sticky bottom-0 z-20">
        {/* Summary */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm text-emerald-300">
            <span>Tax (10%)</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-white border-t border-emerald-600 pt-2">
            <span>Total</span>
            <span className="text-emerald-400">{formatCurrency(total)}</span>
          </div>
        </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {paymentMethod && (
          <button 
            onClick={handlePrint} 
            className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl py-3 text-sm font-medium min-h-[44px] transition-all duration-200 shadow-lg hover:shadow-xl border border-slate-600"
            aria-label="Print receipt"
            data-testid="print-receipt"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
        )}
        <button 
          onClick={() => setPaymentModalOpen(true)} 
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl py-3 text-sm font-bold min-h-[44px] transition-all duration-200 shadow-lg hover:shadow-xl"
          aria-label="Process payment"
          data-testid="open-payment-modal"
        >
          <CreditCard className="w-4 h-4" />
          <span>Pay</span>
        </button>
        <button
          onClick={() => setShowCalculator((s) => !s)}
          className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl py-3 text-sm font-medium min-h-[44px] transition-all duration-200 shadow-lg hover:shadow-xl"
          aria-label="Toggle calculator"
        >
          <Calculator className="w-4 h-4" />
          <span>{showCalculator ? 'Hide Calculator' : 'Show Calculator'}</span>
        </button>
        <button
          onClick={completeOrder}
          disabled={isEmpty}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl py-3 text-sm font-bold min-h-[44px] transition-all duration-200 shadow-lg hover:shadow-xl"
          aria-label="Complete order"
          data-testid="complete-order"
        >
          <span>Complete Order</span>
        </button>
      </div>
      {showCalculator && (
        <div className="w-full mt-2" style={{ height: 320, overflow: 'hidden' }} aria-label="Sticky calculator" data-testid="sticky-calculator">
          <CalculatorPanel />
        </div>
      )}
      </div>
    </div>
  )
}
