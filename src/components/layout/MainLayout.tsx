import { useState, useRef } from 'react'
import type { ReactNode } from 'react'
import { ProductGrid } from '../catalog/ProductGrid'
import { WaitingList } from '../waiting/WaitingList'

interface MainLayoutProps {
  leftPanel: ReactNode
  centerPanel: ReactNode
  rightPanel: ReactNode
}

export function MainLayout({ leftPanel, centerPanel, rightPanel }: MainLayoutProps) {
  // Ensure centerPanel remains referenced to satisfy TS noUnusedLocals if enabled
  void centerPanel;
  // Silence unused prop warning since rightPanel is no longer directly rendered
  void rightPanel;
  type View = 'menu' | 'waitinglist'
  const [currentView, setCurrentView] = useState<View>('menu')
  const leftPanelRef = useRef<HTMLDivElement | null>(null)
  const focusLeftPanel = () => { leftPanelRef.current?.focus() }
  return (
    <main className="h-[calc(100vh-4rem)] mt-16 flex lg:grid lg:grid-cols-[35%_65%]">
      {/* Left Column - Order Management (30%) - Fixed height with internal scroll */}
      <section
        role="main"
        aria-label="Order management panel"
        className="w-full lg:w-auto bg-slate-900/95 backdrop-blur-sm border-r border-emerald-700 h-full overflow-hidden flex flex-col shadow-lg"
      >
        <div ref={leftPanelRef} tabIndex={-1}>{leftPanel}</div>
      </section>

      {/* Center Column removed: Calculator panel is no longer part of the grid */}

      {/* Right Column - Food Catalog (45%) - Fixed height with internal scroll (view toggle) */}
      <section
        role="main"
        aria-label="Food catalog panel"
        className="w-full lg:w-auto bg-slate-900/95 backdrop-blur-sm h-full overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-slate-900/70" aria-label="Panel toggle controls">
          <span className="text-sm font-semibold text-slate-100">Menu</span>
          <div data-testid="panel-toggle" className="flex gap-2">
            <button
              onClick={() => { setCurrentView('menu'); setTimeout(focusLeftPanel, 0); }}
              aria-pressed={currentView === 'menu'}
              aria-label="Show Menu"
              className={currentView === 'menu'
                ? 'px-3 py-2 rounded-md bg-emerald-700 text-white text-sm'
                : 'px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-white text-sm'}
            >
              Menu
            </button>
            <button
              onClick={() => { setCurrentView('waitinglist'); setTimeout(focusLeftPanel, 0); }}
              aria-pressed={currentView === 'waitinglist'}
              aria-label="Show Waiting List"
              className={currentView === 'waitinglist' 
                ? 'px-3 py-2 rounded-md bg-emerald-700 text-white text-sm'
                : 'px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-white text-sm'}
            >
              Waiting List
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className={currentView === 'menu' ? 'block h-full overflow-auto' : 'hidden h-full'}>
            <ProductGrid />
          </div>
          <div className={currentView === 'waitinglist' ? 'block h-full overflow-auto' : 'hidden h-full'}>
            <WaitingList />
          </div>
        </div>
      </section>
    </main>
  )
}
