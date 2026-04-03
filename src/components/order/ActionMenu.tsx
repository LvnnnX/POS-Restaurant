import { Printer, CreditCard, Calculator } from 'lucide-react'
import { useUIStore } from '../../store/uiSlice'
import { useOrderStore } from '../../store/orderSlice'

export function ActionMenu() {
  const toggleCalculator = useUIStore((state) => state.toggleCalculator)
  const setPaymentModalOpen = useUIStore((state) => state.setPaymentModalOpen)
  const total = useOrderStore((state) => state.total())

  const handlePrint = () => {
    window.print()
  }

  const handlePayment = () => {
    setPaymentModalOpen(true)
  }

  return (
    <div className="grid grid-cols-3 gap-2 p-3">
      {/* Print Bill */}
      <button
        onClick={handlePrint}
        className="flex flex-col items-center gap-1 bg-slate-600 hover:bg-slate-700 text-white rounded-lg py-3 text-sm font-medium min-h-[44px] transition-colors"
        aria-label={`Print bill - total ${total.toFixed(2)}`}
      >
        <Printer className="w-5 h-5" />
        <span>Print Bill</span>
      </button>

      {/* Payment/Charge - MOST PROMINENT */}
      <button
        onClick={handlePayment}
        className="flex flex-col items-center gap-1 bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 text-sm font-bold min-h-[44px] transition-colors"
        aria-label="Process payment"
      >
        <CreditCard className="w-5 h-5" />
        <span>Payment</span>
      </button>

      {/* Calculator */}
      <button
        onClick={toggleCalculator}
        className="flex flex-col items-center gap-1 bg-slate-600 hover:bg-slate-700 text-white rounded-lg py-3 text-sm font-medium min-h-[44px] transition-colors"
        aria-label="Toggle calculator"
      >
        <Calculator className="w-5 h-5" />
        <span>Calculator</span>
      </button>
    </div>
  )
}
