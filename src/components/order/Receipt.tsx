import { useOrderStore } from '../../store/orderSlice'
import { formatCurrency } from '../../types/constants'

export function Receipt() {
  const items = useOrderStore((state) => state.items)
  const buyerName = useOrderStore((state) => state.buyerName)
  const subtotal = useOrderStore((state) => state.subtotal())
  const tax = useOrderStore((state) => state.tax())
  const total = useOrderStore((state) => state.total())

  const formatDate = () => {
    const d = new Date()
    return d.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`

  return (
    <div className="print-receipt hidden print:block p-4 text-sm font-mono bg-white">
      {/* Header */}
      <div className="text-center border-b-2 border-dashed border-gray-400 pb-4 mb-4">
        <h1 className="text-2xl font-bold">WARUNG NUSANTARA</h1>
        <p className="text-xs text-gray-600">Jl. Raya Kuliner No. 123, Jakarta</p>
        <p className="text-xs text-gray-600">Telp: (021) 123-4567</p>
      </div>

      {/* Order Info */}
      <div className="border-b border-dashed border-gray-400 pb-2 mb-4">
        <p><span className="font-bold">Order #:</span> {orderId}</p>
        <p><span className="font-bold">Tanggal:</span> {formatDate()}</p>
        {buyerName && <p><span className="font-bold">Customer:</span> {buyerName}</p>}
      </div>

      {/* Items Table */}
      <table className="w-full mb-4">
        <thead>
          <tr className="border-b-2 border-gray-800">
            <th className="text-left py-1">Item</th>
            <th className="text-right py-1">Qty</th>
            <th className="text-right py-1">Harga</th>
            <th className="text-right py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.product.id}>
              <td className="py-1">
                {item.product.name}
                {item.notes && <span className="text-xs text-gray-500 block">  - {item.notes}</span>}
              </td>
              <td className="text-right py-1">{item.quantity}</td>
              <td className="text-right py-1">{formatCurrency(item.product.price)}</td>
              <td className="text-right py-1">{formatCurrency(item.product.price * item.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="border-t-2 border-dashed border-gray-400 pt-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Pajak (10%):</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold mt-2 pt-2 border-t-2 border-gray-800">
          <span>TOTAL:</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t-2 border-dashed border-gray-400">
        <p className="text-lg font-bold">Terima kasih atas kunjungan Anda!</p>
        <p className="text-sm text-gray-600">Silakan datang kembali</p>
      </div>
    </div>
  )
}