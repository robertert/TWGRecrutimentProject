import { create } from "zustand";
import { Movie } from "../types/types";

interface VideoState {
  video: Movie | null;
  setVideo: (video: Movie) => void;
  resetVideo: () => void;
}

export const useVideoStore = create<VideoState>()((set) => ({
  video: null,
  setVideo: (video: Movie) => set({ video }),
  resetVideo: () => set({ video: null }),
}));
