import { OrderItem } from './OrderItem'
import { useOrderStore } from '../../store/orderSlice'
import { useUIStore } from '../../store/uiSlice'
import { Printer, CreditCard, Calculator } from 'lucide-react'

export function OrderList() {
  const items = useOrderStore((state) => state.items)
  const tax = useOrderStore((state) => state.tax())
  const total = useOrderStore((state) => state.total())
  const toggleCalculator = useUIStore((state) => state.toggleCalculator)
  const setPaymentModalOpen = useUIStore((state) => state.setPaymentModalOpen)

  const handlePrint = () => window.print()

  const isEmpty = items.length === 0

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-3 flex-shrink-0">
        <h2 className="text-lg font-semibold">Current Order</h2>
        <p className="text-emerald-100 text-sm">{items.length} item{items.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Scrollable items area - this will show scrollbar when content overflows */}
      <div className="flex-1 overflow-y-auto min-h-0 p-4">
        {isEmpty ? (
          <div className="h-full flex items-center justify-center text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <Printer className="w-8 h-8 text-emerald-500" />
              </div>
              <p className="text-emerald-400 text-sm">No items in order</p>
              <p className="text-emerald-300 text-xs">Tap products to add</p>
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

      {/* Sticky Summary + Actions - fixed at bottom */}
      <div className="border-t-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 flex-shrink-0">
        {/* Summary */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm text-emerald-700">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-emerald-800 border-t border-emerald-200 pt-2">
            <span>Total</span>
            <span className="text-emerald-600">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={handlePrint} 
            className="flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-700 text-white rounded-xl py-3 text-sm font-medium min-h-[44px] transition-all duration-200 shadow-lg hover:shadow-xl"
            aria-label="Print receipt"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
          <button 
            onClick={() => setPaymentModalOpen(true)} 
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl py-3 text-sm font-bold min-h-[44px] transition-all duration-200 shadow-lg hover:shadow-xl"
            aria-label="Process payment"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay</span>
          </button>
          <button 
            onClick={toggleCalculator} 
            className="flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-700 text-white rounded-xl py-3 text-sm font-medium min-h-[44px] transition-all duration-200 shadow-lg hover:shadow-xl"
            aria-label="Toggle calculator"
          >
            <Calculator className="w-4 h-4" />
            <span>Calc</span>
          </button>
        </div>
      </div>
    </div>
  )
}