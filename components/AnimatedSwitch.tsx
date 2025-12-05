import { StyleSheet, Animated, Pressable } from "react-native";
import { useEffect, useRef } from "react";
import * as SwitchPrimitives from "@rn-primitives/switch";
import { Colors } from "../constants/colors";

interface AnimatedSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function AnimatedSwitch({
  checked,
  onCheckedChange,
}: AnimatedSwitchProps) {
  const translateX = useRef(new Animated.Value(checked ? 30 : 2)).current;
  const backgroundColor = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: checked ? 30 : 2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundColor, {
        toValue: checked ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [checked, translateX, backgroundColor]);

  const bgColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.secondary, Colors.primary700],
  });

  return (
    <SwitchPrimitives.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      asChild
    >
      <Pressable>
        <Animated.View
          style={[styles.switchContainer, { backgroundColor: bgColor }]}
        >
          <Animated.View
            style={[
              styles.thumb,
              {
                transform: [{ translateX }],
              },
            ]}
          />
        </Animated.View>
      </Pressable>
    </SwitchPrimitives.Root>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    width: 66,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    padding: 2,
  },
  thumb: {
    width: 28,
    height: 28,
    backgroundColor: Colors.primary100,
    borderRadius: 16,
  },
});
