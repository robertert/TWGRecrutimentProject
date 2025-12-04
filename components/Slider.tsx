import { PanResponder, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Colors } from "../constants/colors";
import * as PrimitiveSlider from "@rn-primitives/slider";

interface VideoSliderProps {
  progress: number;
  onSeek: (nextProgress: number) => void;
  onSeekStart?: () => void;
  onSeekEnd?: () => void;
  style?: StyleProp<ViewStyle>;
  resetControlsTimeout: () => void;
}

const THUMB_SIZE = 12;

export default function VideoSlider({
  progress,
  onSeek,
  onSeekStart,
  onSeekEnd,
  style,
  resetControlsTimeout,
}: VideoSliderProps) {
  const [sliderWidth, setSliderWidth] = useState(0);

  const clampProgress = useCallback((value: number) => {
    if (!Number.isFinite(value)) return 0;
    return Math.min(Math.max(value, 0), 1);
  }, []);

  const updateProgressFromLocation = useCallback(
    (locationX: number) => {
      if (!sliderWidth) return;
      const nextProgress = clampProgress(locationX / sliderWidth);
      onSeek(nextProgress);
    },
    [clampProgress, onSeek, sliderWidth]
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
          onSeekStart?.();
          updateProgressFromLocation(evt.nativeEvent.locationX);
        },
        onPanResponderMove: (evt) => {
          resetControlsTimeout?.();
          updateProgressFromLocation(evt.nativeEvent.locationX);
        },
        onPanResponderRelease: () => {
          onSeekEnd?.();
        },
        onPanResponderTerminate: () => {
          onSeekEnd?.();
        },
      }),
    [onSeekEnd, onSeekStart, updateProgressFromLocation]
  );

  const clampedProgress = clampProgress(progress);
  const thumbLeft = sliderWidth
    ? clampedProgress * sliderWidth - THUMB_SIZE / 2
    : -THUMB_SIZE / 2;

  return (
    <PrimitiveSlider.Root
      style={[styles.wrapper, style]}
      value={progress}
      onLayout={(event) => setSliderWidth(event.nativeEvent.layout.width)}
      {...panResponder.panHandlers}
    >
      <PrimitiveSlider.Track pointerEvents="none" style={styles.track}>
        <PrimitiveSlider.Range
          pointerEvents="none"
          style={[styles.range, { width: `${clampedProgress * 100}%` }]}
        />
        <PrimitiveSlider.Thumb
          pointerEvents="none"
          style={[styles.thumb, { left: thumbLeft }]}
        />
      </PrimitiveSlider.Track>
    </PrimitiveSlider.Root>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.secondary,
  },
  range: {
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.red,
  },
  thumb: {
    position: "absolute",
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: Colors.red,
    top: "50%",
    marginTop: -(THUMB_SIZE / 2),
  },
});
