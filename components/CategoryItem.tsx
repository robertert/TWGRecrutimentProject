import { Category, VideoItem } from "../types/types";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../constants/colors";
import MovieItem from "./MovieItem";
import { router } from "expo-router";
import { useVideoSearch } from "../hooks/useVideoSearch";
import CategoryItemSkeleton from "./skeletons/CategoryItemSkeleton";
import ErrorMessage from "./ErrorMessage";
import { FlashList } from "@shopify/flash-list";

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
  }) => <MovieItem video={item} isFirst={index === 0} />;
  if (isLoading) {
    return <CategoryItemSkeleton />;
  }
  if (error) {
    return (
      <View style={styles.categoryItem}>
        <Text style={styles.categoryItemTitle}>{category.name}</Text>
        <ErrorMessage message={error} onRetry={loadMore} />
      </View>
    );
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
          <FlashList
            data={videos}
            renderItem={({ item, index }) => renderMovieItem({ item, index })}
            keyExtractor={(item) => item.id}
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
