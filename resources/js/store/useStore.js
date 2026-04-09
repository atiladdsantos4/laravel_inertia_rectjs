import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 1. Create the store with persist middleware
export const useStore = create(
  persist(
    (set) => ({
      count: 0,
      carroselstore:0,
      aboutstore:0,
      offerstore:0,
      servicesstore:0,
      staffstore:0,
      testemunhostore:0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      changecarrosel: () => set((state) => ({ carroselstore: state.carroselstore + 1 })),
      changeabout: () => set((state) => ({ aboutstore: state.aboutstore + 1 })),
      changeoffer: () => set((state) => ({ offerstore: state.offerstore + 1 })),
      changeservices: () => set((state) => ({ servicesstore: state.servicesstore + 1 })),
      changestaff: () => set((state) => ({ staffstore: state.staffstore + 1 })),
      changetestemunho: () => set((state) => ({ testemunhostore: state.testemunhostore + 1 })),
      removeAllincrement: () => set({ count: 0 }),
      removeAllcarrosel: () => set({ carroselstore: 0 }),
      removeAllabout: () => set({ aboutstore: 0 }),
      removeAlloffer: () => set({ offerstore: 0 }),
      removeAllservices: () => set({ servicesstore: 0 }),
      removeAllstaff: () => set({ staffstore: 0 }),
      removeAlltestemunho: () => set({ testemunhostore: 0 }),
    }),
    {
      name: 'shared-storage', // Key for LocalStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// 2. Sync changes across tabs/terminals
window.addEventListener('storage', (event) => {
  if (event.key === 'shared-storage') {
      useStore.persist.rehydrate();
  }
});

