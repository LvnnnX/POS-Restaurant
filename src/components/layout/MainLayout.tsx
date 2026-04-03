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
        className="w-full lg:w-auto bg-white/90 backdrop-blur-sm border-r border-emerald-200 h-full overflow-hidden flex flex-col shadow-lg"
      >
        {leftPanel}
      </section>

      {/* Right Column - Food Catalog (65%) - Fixed height with internal scroll */}
      <section
        role="main"
        aria-label="Food catalog panel"
        className="w-full lg:w-auto bg-white/70 backdrop-blur-sm h-full overflow-hidden flex flex-col"
      >
        {rightPanel}
      </section>
    </main>
  )
}
