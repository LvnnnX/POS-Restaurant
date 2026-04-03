import { Navbar, MainLayout } from './components/layout'
import { ProductGrid, SubNavbar } from './components/catalog'
import { OrderList, PaymentModal, Receipt } from './components/order'
import { CalculatorPanel } from './components/calculator'

function App() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 overflow-hidden">
      <Navbar />
      <MainLayout
        leftPanel={<OrderList />}
        centerPanel={<CalculatorPanel />}
        rightPanel={
          <div className="h-full flex flex-col">
            <SubNavbar />
            <div className="flex-1 min-h-0">
              <ProductGrid />
            </div>
          </div>
        }
      />
      <PaymentModal />
      <Receipt />
    </div>
  )
}

export default App