import { create } from 'zustand';

// WaitingList entry represents a completed order waiting to be surfaced in the waiting list UI
export interface WaitingListItem {
  name: string;
  quantity: number;
  price: number;
  // Optional per-item notes (from cart item notes)
  notes?: string;
}

export interface WaitingListEntry {
  id: string;
  buyerName: string;
  total: number;
  items: WaitingListItem[];
  timestamp: number;
  status: 'PROCESS' | 'DONE';
  // Optional order-wide data captured during completion
  notes?: string;
  paymentMethod?: string;
  admin?: string;
}

export interface WaitingListSlice {
  waitingList: WaitingListEntry[];
  addToWaitingList: (entry: WaitingListEntry) => void;
  updateOrderStatus: (orderId: string, status: 'PROCESS' | 'DONE') => void;
  getWaitingList: () => WaitingListEntry[];
  clearWaitingList: () => void;
}

// Zustand slice for managing the WaitingList
export const useWaitingListStore = create<WaitingListSlice>((set, get) => ({
  waitingList: [],

  addToWaitingList: (entry: WaitingListEntry) => {
    const current = get().waitingList;
    set({ waitingList: [...current, entry] });
  },

  updateOrderStatus: (orderId: string, status: 'PROCESS' | 'DONE') => {
    const current = get().waitingList;
    const updated = current.map(order => 
      order.id === orderId ? { ...order, status } : order
    );
    set({ waitingList: updated });
  },

  getWaitingList: () => get().waitingList,

  clearWaitingList: () => {
    set({ waitingList: [] });
  },
}));

export default useWaitingListStore;
