import { useUIStore } from '../../store/uiSlice'
import { useOrderStore } from '../../store/orderSlice'
import { formatCurrency } from '../../types/constants'

export function PaymentModal() {
  const isPaymentModalOpen = useUIStore((state) => state.isPaymentModalOpen)
  const setPaymentModalOpen = useUIStore((state) => state.setPaymentModalOpen)
  const total = useOrderStore((state) => state.total())

  if (!isPaymentModalOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
      onClick={() => setPaymentModalOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Payment dialog"
    >
      <div
        className="bg-slate-800 border border-slate-600 rounded-2xl p-6 w-80 max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-white">Payment</h2>
        <div className="text-2xl font-bold text-emerald-400 text-center mb-4">
          {formatCurrency(total)}
        </div>
        <div className="flex gap-2 mb-4">
          <button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 font-medium min-h-[44px] transition-colors"
            aria-label="Pay with cash"
          >
            Cash
          </button>
          <button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-medium min-h-[44px] transition-colors"
            aria-label="Pay with card"
          >
            Card
          </button>
        </div>
        <button
          onClick={() => setPaymentModalOpen(false)}
          className="w-full text-slate-400 hover:text-slate-200 py-2 min-h-[44px] transition-colors"
          aria-label="Cancel payment"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
