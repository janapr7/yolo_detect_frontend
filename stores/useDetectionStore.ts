import { create } from "zustand";

interface DetectionStoreProps {
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isLoadingRule: boolean;
  setIsLoadingRule: (isLoading: boolean) => void;
}

export const useDetectionStore = create<DetectionStoreProps>((set) => ({
  imageUrl: "",
  setImageUrl: (imageUrl) => set({ imageUrl }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  isLoadingRule: false,
  setIsLoadingRule: (isLoadingRule) => set({ isLoadingRule }),
}));
