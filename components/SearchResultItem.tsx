import { router } from "expo-router";
import { VideoItem } from "../types/types";
import { Pressable, View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { Colors } from "../constants/colors";

export default function SearchResultItem({ video }: { video: VideoItem }) {
  return (
    <Pressable onPress={() => router.push(`/(app)/(stack)/video/${video.id}`)}>
      <View style={styles.searchResultItem}>
        <Image
          source={{ uri: video.thumbnail }}
          style={styles.searchResultItemThumbnail}
          contentFit="cover"
          placeholder={require("../assets/placeholder_thumbnail.png")}
          placeholderContentFit="cover"
        />
        <View style={styles.searchResultItemInfo}>
          <Text style={styles.searchResultItemAuthor}>
            {video.channelTitle}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.searchResultItemName}
          >
            {video.title}
          </Text>
        </View>
        <Text style={styles.searchResultItemDate}>{video.publishedAt}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  searchResultItem: {
    marginBottom: 24,
    alignItems: "center",
  },
  searchResultItemThumbnail: {
    width: 345,
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
  },
  searchResultItemAuthor: {
    fontFamily: "Poppins-Bold",
    fontSize: 12,
    color: Colors.primary700,
    marginTop: 12,
  },
  searchResultItemInfo: {
    width: "90%",
  },
  searchResultItemName: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: Colors.primary700,
    marginTop: 4,
  },
  searchResultItemDate: {
    alignSelf: "flex-end",
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: Colors.primary700,
    marginTop: 4,
  },
});
