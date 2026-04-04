import { create } from 'zustand'

interface AdminState {
  adminName: string
  setAdminName: (name: string) => void
  getAdminName: () => string
}

export const useAdminStore = create<AdminState>((set, get) => ({
  adminName: 'John Doe', // Default admin name (matches navbar)
  setAdminName: (name: string) => set({ adminName: name }),
  getAdminName: () => get().adminName,
}))