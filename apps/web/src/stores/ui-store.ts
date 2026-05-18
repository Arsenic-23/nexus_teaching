import { create } from 'zustand';

interface UIState {
  sidebarCollapsed: boolean;
  activeModal: string | null;
  soundEnabled: boolean;
}

interface UIActions {
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  toggleSound: () => void;
}

export const useUIStore = create<UIState & UIActions>((set) => ({
  sidebarCollapsed: false,
  activeModal: null,
  soundEnabled: true,

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  openModal: (modalId) => set({ activeModal: modalId }),

  closeModal: () => set({ activeModal: null }),

  toggleSound: () =>
    set((state) => ({ soundEnabled: !state.soundEnabled })),
}));
