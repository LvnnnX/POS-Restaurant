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
      {/* Scrollable items area - this will show scrollbar when content overflows */}
      <div className="flex-1 overflow-y-auto min-h-0 p-3">
        {isEmpty ? (
          <div className="h-full flex items-center justify-center text-slate-400 text-sm text-center">
            No items in order — tap products to add
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
      <div className="border-t-2 border-slate-300 bg-slate-50 p-3 flex-shrink-0">
        {/* Summary */}
        <div className="flex justify-between text-sm mb-2">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold mb-3">
          <span>Total</span>
          <span className="text-blue-600 text-xl">${total.toFixed(2)}</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={handlePrint} 
            className="flex items-center justify-center gap-1 bg-slate-600 hover:bg-slate-700 text-white rounded-lg py-2 text-sm font-medium min-h-[44px]"
            aria-label="Print receipt"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
          <button 
            onClick={() => setPaymentModalOpen(true)} 
            className="flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 text-sm font-bold min-h-[44px]"
            aria-label="Process payment"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay</span>
          </button>
          <button 
            onClick={toggleCalculator} 
            className="flex items-center justify-center gap-1 bg-slate-600 hover:bg-slate-700 text-white rounded-lg py-2 text-sm font-medium min-h-[44px]"
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