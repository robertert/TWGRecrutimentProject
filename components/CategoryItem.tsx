import { Category, Movie } from "../types/types";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { Colors } from "../constants/colors";
import MovieItem from "./MovieItem";
import { router } from "expo-router";

export default function CategoryItem({
  category,
  isLast,
}: {
  category: Category;
  isLast: boolean;
}) {
  const movies = [
    {
      id: 1,
      name: "Movie 1, This is a long movie",
      thumbnailUrl: "https://via.placeholder.com/150",
      date: "2025-01-01",
    },
    {
      id: 2,
      name: "Movie 2, This is a long movie name, This is a long movie name, This is a long movie name",
      thumbnailUrl: "https://via.placeholder.com/150",
      date: "2025-01-01",
    },
    {
      id: 3,
      name: "Movie 3, This is a long movie name, This is a long movie name, This is a long movie name",
      thumbnailUrl: "https://via.placeholder.com/150",
      date: "2025-01-01",
    },
  ];

  const renderMovieItem = ({ item, index }: { item: Movie; index: number }) => (
    <MovieItem
      movie={item}
      isFirst={index === 0}
      isLast={index === movies.length - 1}
    />
  );
  return (
    <>
      <View style={styles.categoryItem}>
        <View style={styles.topSection}>
          <Text style={styles.categoryItemTitle}>{category.name}</Text>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "./search",
                params: {
                  searchQuery: category.name,
                },
              })
            }
          >
            <Text style={styles.showMoreText}>Show more</Text>
          </Pressable>
        </View>
        <View style={styles.moviesListContainer}>
          <FlatList
            data={movies}
            renderItem={({ item, index }) => renderMovieItem({ item, index })}
            contentContainerStyle={{ gap: 20 }}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      {!isLast && <View style={styles.separator} />}
    </>
  );
}

const styles = StyleSheet.create({
  categoryItem: {
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: Colors.primary100,
  },
  topSection: {
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  showMoreText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: Colors.primary700,
    textDecorationLine: "underline",
  },
  categoryItemTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: Colors.primary700,
  },
  separator: {
    height: 2,
    backgroundColor: Colors.primary700,
    width: "100%",
  },
  moviesListContainer: {
    marginTop: 12,
  },
});
