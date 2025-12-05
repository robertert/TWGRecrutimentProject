import { create } from "zustand";
import { VideoItem } from "../types/types";
import { VideoRef } from "react-native-video";

interface VideoState {
  video: VideoItem | null;
  videoRef: React.RefObject<VideoRef | null> | null;
  currentTime: number;
  setVideo: (video: VideoItem) => void;
  setVideoRef: (ref: React.RefObject<VideoRef | null> | null) => void;
  setCurrentTime: (time: number) => void;
  resetVideo: () => void;
}

export const useVideoStore = create<VideoState>()((set) => ({
  video: null,
  videoRef: null,
  currentTime: 0,
  setVideo: (video: VideoItem) => set({ video }),
  setVideoRef: (ref: React.RefObject<VideoRef | null> | null) =>
    set({ videoRef: ref }),
  setCurrentTime: (time: number) => set({ currentTime: time }),
  resetVideo: () => set({ video: null, currentTime: 0, videoRef: null }),
}));
