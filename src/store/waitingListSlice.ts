import { create } from 'zustand';

// WaitingList entry represents a completed order waiting to be surfaced in the waiting list UI
export interface WaitingListItem {
  name: string;
  quantity: number;
  price: number;
}

export interface WaitingListEntry {
  id: string;
  buyerName: string;
  total: number;
  items: WaitingListItem[];
  timestamp: number;
}

export interface WaitingListSlice {
  waitingList: WaitingListEntry[];
  addToWaitingList: (entry: WaitingListEntry) => void;
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

  getWaitingList: () => get().waitingList,

  clearWaitingList: () => {
    set({ waitingList: [] });
  },
}));

export default useWaitingListStore;
