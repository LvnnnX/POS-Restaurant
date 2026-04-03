import { useUIStore } from '../../store/uiSlice'
import { useOrderStore } from '../../store/orderSlice'

export function PaymentModal() {
  const isPaymentModalOpen = useUIStore((state) => state.isPaymentModalOpen)
  const setPaymentModalOpen = useUIStore((state) => state.setPaymentModalOpen)
  const total = useOrderStore((state) => state.total())

  if (!isPaymentModalOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={() => setPaymentModalOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Payment dialog"
    >
      <div
        className="bg-white rounded-2xl p-6 w-80 max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Payment</h2>
        <div className="text-2xl font-bold text-blue-600 text-center mb-4">
          ${total.toFixed(2)}
        </div>
        <div className="flex gap-2 mb-4">
          <button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 font-medium min-h-[44px]"
            aria-label="Pay with cash"
          >
            Cash
          </button>
          <button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-medium min-h-[44px]"
            aria-label="Pay with card"
          >
            Card
          </button>
        </div>
        <button
          onClick={() => setPaymentModalOpen(false)}
          className="w-full text-slate-500 hover:text-slate-700 py-2 min-h-[44px]"
          aria-label="Cancel payment"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
