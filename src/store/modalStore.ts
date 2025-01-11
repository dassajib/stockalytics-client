import { create } from 'zustand';

interface ModalState {
    modalType: string | null;
    openModal: (type: string) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    modalType: null,
    openModal: (type: string) => set({ modalType: type }),
    closeModal: () => set({ modalType: null }),
}));
