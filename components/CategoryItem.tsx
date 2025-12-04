import { Category, VideoItem } from "../types/types";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { Colors } from "../constants/colors";
import MovieItem from "./MovieItem";
import { router } from "expo-router";
import { useVideoSearch } from "../hooks/useVideoSearch";
import CategoryItemSkeleton from "./skeletons/CategoryItemSkeleton";

export default function CategoryItem({
  category,
  isLast,
}: {
  category: Category;
  isLast: boolean;
}) {
  const { videos, isLoading, error, hasMore, loadMore } = useVideoSearch(
    category.name,
    "viewCount"
  );

  const renderMovieItem = ({
    item,
    index,
  }: {
    item: VideoItem;
    index: number;
  }) => (
    <MovieItem
      video={item}
      isFirst={index === 0}
      isLast={index === videos.length - 1}
    />
  );
  if (isLoading) {
    return <CategoryItemSkeleton />;
  }
  if (error) {
    return <Text>{error}</Text>;
  }

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
            data={videos}
            renderItem={({ item, index }) => renderMovieItem({ item, index })}
            contentContainerStyle={{ gap: 20 }}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            onEndReached={() => {
              if (hasMore) {
                loadMore();
              }
            }}
            onEndReachedThreshold={0.5}
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
