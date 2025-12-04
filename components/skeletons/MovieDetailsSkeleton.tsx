import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function MovieDetailsSkeleton() {
  return (
    <View style={styles.container}>
      {/* Subtitle */}
      <View style={[styles.subtitle, styles.shimmer]} />

      {/* Description block */}
      <View style={[styles.descLine, styles.shimmer]} />
      <View style={[styles.descLine, styles.shimmer]} />
      <View style={[styles.descLineShort, styles.shimmer]} />

      {/* Second subtitle */}
      <View style={[styles.subtitle, styles.shimmer, { marginTop: 24 }]} />

      {/* Stats cards */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, styles.shimmer]} />
        <View style={[styles.statCard, styles.shimmer]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  shimmer: {
    backgroundColor: Colors.primary500,
    opacity: 0.3,
    borderRadius: 8,
  },
  subtitle: {
    width: 80,
    height: 12,
  },
  descLine: {
    marginTop: 8,
    width: "100%",
    height: 10,
  },
  descLineShort: {
    marginTop: 8,
    width: "70%",
    height: 10,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  statCard: {
    width: 136,
    height: 32,
    borderRadius: 8,
  },
});


