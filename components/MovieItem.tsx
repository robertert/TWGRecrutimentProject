import { View, StyleSheet, Text, Pressable } from "react-native";
import { VideoItem } from "../types/types";
import { Image } from "expo-image";
import { Colors } from "../constants/colors";
import { router } from "expo-router";
import { formatDateString } from "../utils/functions";

export default function MovieItem({
  video,
  isFirst,
}: {
  video: VideoItem;
  isFirst: boolean;
}) {
  return (
    <Pressable onPress={() => router.push(`/(app)/(stack)/video/${video.id}`)}>
      <View style={[styles.movieItem, { marginLeft: isFirst ? 24 : 0 }]}>
        <Image
          source={{ uri: video.thumbnail }}
          style={styles.movieItemThumbnail}
          contentFit="cover"
          placeholder={require("../assets/placeholder_thumbnail.png")}
          placeholderContentFit="cover"
        />
        <Text
          numberOfLines={2}
          style={styles.movieItemName}
          ellipsizeMode="tail"
        >
          {video.title}
        </Text>
        <Text style={styles.movieItemDate}>
          {formatDateString(video.publishedAt)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  movieItem: {
    flex: 1,
    marginRight: 24,
  },
  movieItemThumbnail: {
    width: 180,
    height: 112,
    borderRadius: 16,
    overflow: "hidden",
  },
  movieItemName: {
    width: 180,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: Colors.primary700,
    marginTop: 4,
  },
  movieItemDate: {
    marginTop: 4,
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: Colors.primary500,
    alignSelf: "flex-end",
  },
});
