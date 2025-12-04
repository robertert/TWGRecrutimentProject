import { Animated, Pressable, StyleSheet, View, Text } from "react-native";
import VideoSlider from "./Slider";
import { Colors } from "../constants/colors";
import { Image } from "expo-image";
import { router } from "expo-router";
import type { VideoRef } from "react-native-video";
import { useVideoControls } from "../hooks/useVideoControls";
import { formatTime } from "../utils/functions";

interface ControlsProps {
  videoRef: React.RefObject<VideoRef | null>;
  isPaused: boolean;
  controlsVisible: boolean;
  controlsOpacity: Animated.Value;
  resetControlsTimeout: () => void;
  sliderProgress: number;
  currentTime: number;
  duration: number;
  handleSeek: (nextProgress: number) => void;
  handleSeekStart: () => void;
  handleSeekEnd: () => void;
  toggleControls: () => void;
  togglePlayPause: () => void;
}

export default function Controls({
  videoRef,
  isPaused,
  controlsVisible,
  controlsOpacity,
  resetControlsTimeout,
  sliderProgress,
  currentTime,
  duration,
  handleSeek,
  handleSeekStart,
  handleSeekEnd,
  toggleControls,
  togglePlayPause,
}: ControlsProps) {
  const {
    seekBackward,
    seekForward,
    toggleFullscreen,
    toggleAirplay,
    toggleVolume,
  } = useVideoControls({
    videoRef,
    currentTime,
    duration,
    resetControlsTimeout,
  });

  return (
    <Pressable
      onPress={toggleControls}
      style={styles.controlsPressableContainer}
    >
      <Animated.View
        style={[styles.controlsContainer, { opacity: controlsOpacity }]}
        pointerEvents={controlsVisible ? "auto" : "none"}
      >
        <Text style={styles.timeLabel}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Text>

        <Pressable
          onPress={seekBackward}
          style={[styles.smallControlButton, styles.controlButton]}
        >
          <Image
            source={require("../assets/icons/backward-icon.svg")}
            style={styles.smallControlIcon}
            tintColor={Colors.primary100}
          />
        </Pressable>

        <Pressable
          onPress={togglePlayPause}
          style={[styles.mediumControlButton, styles.controlButton]}
        >
          <Image
            source={
              isPaused
                ? require("../assets/icons/play-icon.svg")
                : require("../assets/icons/pause-icon.svg")
            }
            style={styles.mediumControlIcon}
            tintColor={Colors.primary100}
          />
        </Pressable>

        <Pressable
          onPress={seekForward}
          style={[styles.smallControlButton, styles.controlButton]}
        >
          <Image
            source={require("../assets/icons/forward-icon.svg")}
            style={styles.mediumControlIcon}
            tintColor={Colors.primary100}
          />
        </Pressable>

        <Pressable
          onPress={toggleFullscreen}
          style={[styles.fullscreenButton, styles.smallControlButton]}
        >
          <Image
            source={require("../assets/icons/fullscreen-icon.svg")}
            style={styles.mediumControlIcon}
            tintColor={Colors.primary100}
          />
        </Pressable>

        <Pressable
          onPress={toggleAirplay}
          style={[
            styles.airplayButton,
            styles.smallControlButton,
            styles.controlButton,
          ]}
        >
          <Image
            source={require("../assets/icons/airplay-icon.svg")}
            style={styles.smallControlIcon}
            tintColor={Colors.primary100}
          />
        </Pressable>

        <Pressable
          onPress={toggleVolume}
          style={[
            styles.volumeButton,
            styles.smallControlButton,
            styles.controlButton,
          ]}
        >
          <Image
            source={require("../assets/icons/volume-icon.svg")}
            style={styles.smallControlIcon}
            tintColor={Colors.primary100}
          />
        </Pressable>

        <Pressable
          onPress={() => router.back()}
          style={[
            styles.backButton,
            styles.smallControlButton,
            styles.controlButton,
          ]}
        >
          <Image
            source={require("../assets/icons/leftarrow-icon.svg")}
            style={styles.smallControlIcon}
            tintColor={Colors.primary100}
          />
        </Pressable>

        <View style={styles.sliderContainer}>
          <VideoSlider
            resetControlsTimeout={resetControlsTimeout}
            progress={sliderProgress}
            onSeek={handleSeek}
            onSeekStart={handleSeekStart}
            onSeekEnd={handleSeekEnd}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  controlsPressableContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  controlsContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  timeLabel: {
    position: "absolute",
    bottom: 16,
    left: 8,
    color: Colors.primary100,
    fontSize: 10,
    fontFamily: "Poppins-SemiBold",
  },
  smallControlButton: {
    width: 32,
    height: 32,
  },
  mediumControlButton: {
    width: 40,
    height: 40,
  },
  controlButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },

  fullscreenButton: {
    position: "absolute",
    bottom: 10,
    right: 5,
  },
  smallControlIcon: {
    width: 20,
    height: 20,
  },
  mediumControlIcon: {
    width: 24,
    height: 24,
  },
  sliderContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  airplayButton: {
    position: "absolute",
    top: 18,
    right: 16,
  },
  volumeButton: {
    position: "absolute",
    top: 18,
    right: 56,
  },
  backButton: {
    position: "absolute",
    top: 18,
    left: 16,
  },
});
