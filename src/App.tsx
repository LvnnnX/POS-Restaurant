import { Navbar, MainLayout } from './components/layout'
import { ProductGrid, SubNavbar } from './components/catalog'
import { OrderList, PaymentModal, Receipt } from './components/order'
import { CalculatorPanel } from './components/calculator'

function App() {
  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
      <Navbar />
      <MainLayout
        leftPanel={<OrderList />}
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
      <CalculatorPanel />
    </div>
  )
}

export default App