import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function CategoryItemSkeleton() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <View style={[styles.pill, styles.title]} />
        <View style={[styles.pill, styles.smallPill]} />
      </View>
      <View style={styles.listRow}>
        <View style={[styles.thumbnail, styles.shimmer]} />
        <View style={[styles.thumbnail, styles.shimmer]} />
        <View style={[styles.thumbnail, styles.shimmer]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: Colors.primary100,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  pill: {
    backgroundColor: Colors.primary500,
    opacity: 0.4,
    borderRadius: 999,
  },
  title: {
    width: 140,
    height: 18,
  },
  smallPill: {
    width: 70,
    height: 12,
  },
  listRow: {
    marginTop: 12,
    flexDirection: "row",
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  thumbnail: {
    width: 100,
    height: 64,
    borderRadius: 12,
  },
  shimmer: {
    backgroundColor: Colors.primary500,
    opacity: 0.35,
  },
});
