import type { ReactNode } from 'react'

interface MainLayoutProps {
  leftPanel: ReactNode
  rightPanel: ReactNode
}

export function MainLayout({ leftPanel, rightPanel }: MainLayoutProps) {
  return (
    <main className="h-[calc(100vh-4rem)] mt-16 flex lg:grid lg:grid-cols-[35%_65%]">
      {/* Left Column - Order Management (35%) - Fixed height with internal scroll */}
      <section
        role="main"
        aria-label="Order management panel"
        className="w-full lg:w-auto bg-slate-50 border-r border-slate-200 h-full overflow-hidden flex flex-col"
      >
        {leftPanel}
      </section>

      {/* Right Column - Food Catalog (65%) - Fixed height with internal scroll */}
      <section
        role="main"
        aria-label="Food catalog panel"
        className="w-full lg:w-auto bg-white h-full overflow-hidden flex flex-col"
      >
        {rightPanel}
      </section>
    </main>
  )
}
