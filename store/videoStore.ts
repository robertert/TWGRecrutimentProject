import { create } from "zustand";
import { VideoItem } from "../types/types";

interface VideoState {
  video: VideoItem | null;
  setVideo: (video: VideoItem) => void;
  resetVideo: () => void;
}

export const useVideoStore = create<VideoState>()((set) => ({
  video: null,
  setVideo: (video: VideoItem) => set({ video }),
  resetVideo: () => set({ video: null }),
}));
