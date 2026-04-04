import { useState } from 'react'
import { useOrderStore } from '../../store/orderSlice'
import { formatCurrency } from '../../types/constants'
import { CreditCard, Printer } from 'lucide-react'

interface OrderConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OrderConfirmationModal({ isOpen, onClose }: OrderConfirmationModalProps) {
  const items = useOrderStore((state) => state.items)
  const buyerName = useOrderStore((state) => state.buyerName)
  const tax = useOrderStore((state) => state.tax())
  const total = useOrderStore((state) => state.total())
  const setPaymentMethod = useOrderStore((state) => state.setPaymentMethod)
  const completeOrder = useOrderStore((state) => state.completeOrder)
  const paymentMethod = useOrderStore((state) => state.paymentMethod)
  
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)

  if (!isOpen) return null

  const handlePaymentSelection = (method: 'Cash' | 'Transfer') => {
    setPaymentMethod(method)
    setShowPaymentOptions(false)
    setOrderCompleted(true)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleFinishOrder = () => {
    completeOrder()
    onClose()
    setShowPaymentOptions(false)
    setOrderCompleted(false)
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Order confirmation dialog"
    >
      <div
        className="bg-slate-800 border border-slate-600 rounded-2xl p-6 w-full max-w-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Order Confirmation</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Buyer Name */}
        <div className="mb-4">
          <div className="text-sm text-slate-300">Buyer Name:</div>
          <div className="text-lg text-white font-semibold">{buyerName}</div>
        </div>

        {/* Ordered Items */}
        <div className="mb-4">
          <div className="text-sm text-slate-300 mb-2">Ordered Items:</div>
          <div className="bg-slate-700/50 rounded-lg p-3 max-h-40 overflow-y-auto">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-1">
                <div>
                  <span className="text-white">{item.product.name}</span>
                  <span className="text-slate-300 ml-2">× {item.quantity}</span>
                  {item.notes && (
                    <div className="text-xs text-slate-400 mt-1">Notes: {item.notes}</div>
                  )}
                </div>
                <span className="text-emerald-300">{formatCurrency(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Payment */}
        <div className="border-t border-slate-700 pt-3 mb-6">
          <div className="flex justify-between text-sm text-slate-300 mb-1">
            <span>Tax (10%)</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-white">
            <span>Total Payment</span>
            <span className="text-emerald-400">{formatCurrency(total)}</span>
          </div>
        </div>

        {/* Payment Section */}
        {!showPaymentOptions && !orderCompleted && (
          <button
            onClick={() => setShowPaymentOptions(true)}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl py-3 text-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            PAYMENT
          </button>
        )}

        {/* Payment Options */}
        {showPaymentOptions && !orderCompleted && (
          <div className="space-y-3">
            <div className="text-sm text-slate-300 text-center mb-3">Select Payment Method:</div>
            <div className="flex gap-3">
              <button
                onClick={() => handlePaymentSelection('Cash')}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 font-medium transition-colors flex items-center justify-center gap-2"
              >
                💰 Cash
              </button>
              <button
                onClick={() => handlePaymentSelection('Transfer')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-medium transition-colors flex items-center justify-center gap-2"
              >
                💳 Transfer
              </button>
            </div>
          </div>
        )}

        {/* Print Button - shows after payment selection */}
        {orderCompleted && paymentMethod && (
          <div className="space-y-3">
            <div className="text-center text-green-400 text-sm mb-3">
              Payment method selected: {paymentMethod}
            </div>
            <button
              onClick={handlePrint}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white rounded-xl py-3 font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mb-3"
            >
              <Printer className="w-5 h-5" />
              PRINT RECEIPT
            </button>
            <button
              onClick={handleFinishOrder}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl py-3 text-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              FINISH ORDER
            </button>
          </div>
        )}
      </div>
    </div>
  )
}