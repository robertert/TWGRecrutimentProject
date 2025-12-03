import { View, StyleSheet, Text, Pressable } from "react-native";
import { Movie } from "../types/types";
import { Image } from "expo-image";
import { Colors } from "../constants/colors";
import { router } from "expo-router";

export default function MovieItem({
  movie,
  isFirst,
  isLast,
}: {
  movie: Movie;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <Pressable onPress={() => router.push(`/video/${movie.id}`)}>
      <View
        style={[
          styles.movieItem,
          { marginLeft: isFirst ? 24 : 0 },
          { marginRight: isLast ? 24 : 0 },
        ]}
      >
        <Image
          source={require("../assets/placeholder_thumbnail.png")}
          style={styles.movieItemThumbnail}
          contentFit="cover"
        />
        <Text
          numberOfLines={2}
          style={styles.movieItemName}
          ellipsizeMode="tail"
        >
          {movie.name}
        </Text>
        <Text style={styles.movieItemDate}>{movie.date}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  movieItem: {
    flex: 1,
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
