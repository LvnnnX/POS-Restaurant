import { create } from 'zustand'
import type { BreadcrumbItem } from '../types'

interface UIState {
  breadcrumbs: BreadcrumbItem[]
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void
  isCalculatorOpen: boolean
  toggleCalculator: () => void
  isPaymentModalOpen: boolean
  setPaymentModalOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  breadcrumbs: [{ label: 'Home', path: '/' }],
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
  isCalculatorOpen: false,
  toggleCalculator: () => set((state) => ({ isCalculatorOpen: !state.isCalculatorOpen })),
  isPaymentModalOpen: false,
  setPaymentModalOpen: (open) => set({ isPaymentModalOpen: open }),
}))
