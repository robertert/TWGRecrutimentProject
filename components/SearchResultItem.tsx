import { router } from "expo-router";
import { Movie } from "../types/types";
import { Pressable, View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { Colors } from "../constants/colors";

export default function SearchResultItem({ movie }: { movie: Movie }) {
  return (
    <Pressable onPress={() => router.push(`/video/${movie.id}`)}>
      <View style={styles.searchResultItem}>
        <Image
          source={require("../assets/placeholder_thumbnail.png")}
          style={styles.searchResultItemThumbnail}
        />
        <View style={styles.searchResultItemInfo}>
          <Text style={styles.searchResultItemAuthor}>{movie.author}</Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.searchResultItemName}
          >
            {movie.name}
          </Text>
        </View>
        <Text style={styles.searchResultItemDate}>{movie.date}</Text>
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
