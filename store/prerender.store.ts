import { create } from 'zustand';

type PrerenderStore = {
  isBackgroundImagePrerendered: boolean;
  setIsBackgroundImagePrerendered: (value: boolean) => void;
};

export const usePrerenderStore = create<PrerenderStore>((set) => ({
  isBackgroundImagePrerendered: false,
  setIsBackgroundImagePrerendered: (value) => {
    set((state) => ({ ...state, isBackgroundImagePrerendered: value }));
  },
}));
