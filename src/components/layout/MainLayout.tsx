import type { ReactNode } from 'react'

interface MainLayoutProps {
  leftPanel: ReactNode
  rightPanel: ReactNode
}

export function MainLayout({ leftPanel, rightPanel }: MainLayoutProps) {
  return (
    <main className="h-[calc(100vh-4rem)] mt-16 grid grid-cols-1 lg:grid-cols-[35%_65%]">
      {/* Left Column - Order Management (35%) - Independent scroll */}
      <section
        role="main"
        aria-label="Order management panel"
        className="bg-slate-50 border-r border-slate-200 flex flex-col h-full"
      >
        {leftPanel}
      </section>

      {/* Right Column - Food Catalog (65%) - Independent scroll */}
      <section
        role="main"
        aria-label="Food catalog panel"
        className="bg-white flex flex-col h-full"
      >
        {rightPanel}
      </section>
    </main>
  )
}
