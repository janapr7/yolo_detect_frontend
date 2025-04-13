import { create } from "zustand";

interface DetectionStoreProps {
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
}

export const useDetectionStore = create<DetectionStoreProps>((set) => ({
  imageUrl: "",
  setImageUrl: (imageUrl) => set({ imageUrl }),
}));
