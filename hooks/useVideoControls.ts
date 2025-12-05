import { useState } from "react";
import type { VideoRef } from "react-native-video";
import { formatTime } from "../utils/functions";
import { logger } from "../utils/logger";

interface UseVideoControlsParams {
  videoRef: React.RefObject<VideoRef | null>;
  currentTime: number;
  duration: number;
  resetControlsTimeout: () => void;
}

export function useVideoControls({
  videoRef,
  currentTime,
  duration,
  resetControlsTimeout,
}: UseVideoControlsParams) {
  const [volume, setVolume] = useState(1);

  const seekBackward = () => {
    resetControlsTimeout();
    if (!videoRef.current) return;
    const nextTime = Math.max(0, currentTime - 10);
    videoRef.current.seek(nextTime);
  };

  const seekForward = () => {
    resetControlsTimeout();
    if (!videoRef.current || !duration) return;
    const nextTime = Math.min(duration, currentTime + 10);
    videoRef.current.seek(nextTime);
  };

  const toggleFullscreen = () => {
    videoRef.current?.setFullScreen(true);
  };

  const toggleAirplay = () => {
    // tutaj możesz później dodać natywną obsługę AirPlay
    logger.log("toggleAirplay");
  };

  const toggleVolume = () => {
    const isMuted = volume === 0;
    setVolume(isMuted ? 1 : 0);
    if (videoRef.current) {
      videoRef.current.setVolume(isMuted ? 100 : 0);
    }
  };

  return {
    seekBackward,
    seekForward,
    toggleFullscreen,
    toggleAirplay,
    toggleVolume,
  };
}
