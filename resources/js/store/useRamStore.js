import { create } from 'zustand';

export const useRamStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));
