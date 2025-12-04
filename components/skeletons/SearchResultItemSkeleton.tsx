import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function SearchResultItemSkeleton() {
  return (
    <View style={styles.container}>
      <View style={[styles.thumbnail, styles.shimmer]} />
      <View style={styles.info}>
        <View style={[styles.author, styles.shimmer]} />
        <View style={[styles.title, styles.shimmer]} />
        <View style={[styles.titleShort, styles.shimmer]} />
        <View style={[styles.date, styles.shimmer]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    alignItems: "center",
  },
  thumbnail: {
    width: 345,
    height: 200,
    borderRadius: 16,
  },
  info: {
    width: "90%",
    marginTop: 12,
  },
  author: {
    width: "40%",
    height: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  title: {
    width: "100%",
    height: 14,
    borderRadius: 8,
    marginBottom: 4,
  },
  titleShort: {
    width: "70%",
    height: 14,
    borderRadius: 8,
    marginBottom: 6,
  },
  date: {
    width: 60,
    height: 10,
    borderRadius: 6,
    alignSelf: "flex-end",
  },
  shimmer: {
    backgroundColor: Colors.primary500,
    opacity: 0.35,
  },
});
