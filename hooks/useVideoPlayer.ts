import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import type { VideoRef } from "react-native-video";

export function useVideoPlayer() {
  const videoRef = useRef<VideoRef | null>(null);

  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [sliderProgress, setSliderProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
  const controlsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (controlsVisible) {
      Animated.timing(controlsOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      resetControlsTimeout();
    } else {
      Animated.timing(controlsOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, [controlsVisible, controlsOpacity]);

  const resetControlsTimeout = () => {
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    controlsTimeout.current = setTimeout(() => {
      setControlsVisible(false);
    }, 5000);
  };

  const togglePlayPause = () => {
    resetControlsTimeout();
    setPaused((prev) => !prev);
  };

  const toggleControls = () => {
    setControlsVisible((prev) => {
      const next = !prev;
      if (next) {
        resetControlsTimeout();
      } else if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      return next;
    });
  };

  const clampProgress = (value: number) => {
    if (!Number.isFinite(value)) return 0;
    return Math.min(Math.max(value, 0), 1);
  };

  const handleSeek = (nextProgress: number) => {
    if (!duration || !Number.isFinite(duration)) return;
    const clamped = clampProgress(nextProgress);
    setSliderProgress(clamped);
    const newTime = clamped * duration;
    setCurrentTime(newTime);
    videoRef.current?.seek(newTime);
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
    setControlsVisible(true);
    resetControlsTimeout();
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
    resetControlsTimeout();
  };

  const handleVideoProgress = (time: number) => {
    setCurrentTime(time);
    if (!isSeeking && duration) {
      setSliderProgress(clampProgress(time / duration || 0));
    }
  };

  const handleVideoLoad = (videoDuration: number) => {
    setDuration(videoDuration);
    setSliderProgress(0);
  };

  return {
    videoRef,
    paused,
    currentTime,
    duration,
    controlsVisible,
    controlsOpacity,
    sliderProgress,
    isSeeking,
    // handlers
    resetControlsTimeout,
    togglePlayPause,
    toggleControls,
    handleSeek,
    handleSeekStart,
    handleSeekEnd,
    handleVideoProgress,
    handleVideoLoad,
  };
}
