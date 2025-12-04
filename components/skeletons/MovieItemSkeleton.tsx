import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

interface MovieItemSkeletonProps {
  isFirst?: boolean;
  isLast?: boolean;
}

export default function MovieItemSkeleton({
  isFirst,
  isLast,
}: MovieItemSkeletonProps) {
  return (
    <View
      style={[
        styles.container,
        { marginLeft: isFirst ? 24 : 0 },
        { marginRight: isLast ? 24 : 0 },
      ]}
    >
      <View style={[styles.thumbnail, styles.shimmer]} />
      <View style={[styles.line, styles.shimmer]} />
      <View style={[styles.smallLine, styles.shimmer]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thumbnail: {
    width: 180,
    height: 112,
    borderRadius: 16,
  },
  line: {
    marginTop: 8,
    width: 180,
    height: 12,
    borderRadius: 8,
  },
  smallLine: {
    marginTop: 6,
    width: 80,
    height: 8,
    borderRadius: 8,
    alignSelf: "flex-end",
  },
  shimmer: {
    backgroundColor: Colors.primary500,
    opacity: 0.35,
  },
});
