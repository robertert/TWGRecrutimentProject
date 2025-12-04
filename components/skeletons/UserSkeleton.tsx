import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function UserSkeleton() {
  return (
    <View>
      {/* Skeleton tytułu filmu */}
      <View style={styles.titleWrapper}>
        <View style={[styles.titleLine, styles.shimmer]} />
      </View>

      {/* Skeleton użytkownika */}
      <View style={styles.container}>
        <View style={[styles.avatar, styles.shimmer]} />
        <View style={styles.textWrapper}>
          <View style={[styles.nameLine, styles.shimmer]} />
          <View style={[styles.subLine, styles.shimmer]} />
        </View>
      </View>
    </View>
  );
}

const AVATAR_SIZE = 40;

const styles = StyleSheet.create({
  titleWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  titleLine: {
    width: "70%",
    height: 16,
    borderRadius: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  textWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  nameLine: {
    width: "40%",
    height: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  subLine: {
    width: "25%",
    height: 10,
    borderRadius: 6,
  },
  shimmer: {
    backgroundColor: Colors.primary500,
    opacity: 0.35,
  },
});
