import type { ReactNode } from 'react'

interface MainLayoutProps {
  leftPanel: ReactNode
  centerPanel: ReactNode
  rightPanel: ReactNode
}

export function MainLayout({ leftPanel, centerPanel, rightPanel }: MainLayoutProps) {
  return (
    <main className="h-[calc(100vh-4rem)] mt-16 flex lg:grid lg:grid-cols-[30%_25%_45%]">
      {/* Left Column - Order Management (30%) - Fixed height with internal scroll */}
      <section
        role="main"
        aria-label="Order management panel"
        className="w-full lg:w-auto bg-slate-900/95 backdrop-blur-sm border-r border-emerald-700 h-full overflow-hidden flex flex-col shadow-lg"
      >
        {leftPanel}
      </section>

      {/* Center Column - Calculator (25%) - Fixed height */}
      <section
        role="complementary"
        aria-label="Calculator panel"
        className="w-full lg:w-auto bg-slate-800/95 backdrop-blur-sm border-r border-emerald-700 h-full overflow-hidden flex flex-col shadow-lg"
      >
        {centerPanel}
      </section>

      {/* Right Column - Food Catalog (45%) - Fixed height with internal scroll */}
      <section
        role="main"
        aria-label="Food catalog panel"
        className="w-full lg:w-auto bg-slate-900/95 backdrop-blur-sm h-full overflow-hidden flex flex-col"
      >
        {rightPanel}
      </section>
    </main>
  )
}
