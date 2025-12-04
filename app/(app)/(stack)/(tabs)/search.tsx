import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../../constants/colors";
import SearchBar from "../../../../components/SearchBar";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import SearchResultItem from "../../../../components/SearchResultItem";
import SearchResultItemSkeleton from "../../../../components/skeletons/SearchResultItemSkeleton";
import { VideoItem } from "../../../../types/types";
import { useVideoSearch } from "../../../../hooks/useVideoSearch";

export default function Search() {
  const { searchQuery } = useLocalSearchParams();
  const [search, setSearch] = useState<string>((searchQuery as string) || "");
  const [query, setQuery] = useState<string>(search);
  const [sortBy, setSortBy] = useState<string>("Most popular");

  const {
    videos,
    totalResults,
    isLoading,
    error,
    hasMore,
    isLoadingMore,
    loadMore,
  } = useVideoSearch(query);

  const searchFunction = (query: string) => {
    setQuery(query);
  };

  const renderSearchResultItem = ({ item }: { item: VideoItem }) => (
    <SearchResultItem video={item} />
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.content}>
        <SearchBar
          value={search}
          setValue={setSearch}
          searchFunction={searchFunction}
        />
        {videos.length > 0 && (
          <>
            <Text style={styles.searchResultText}>
              {totalResults} results found for{" "}
              <Text style={styles.searchQuery}>"{search}"</Text>
            </Text>
            <Pressable>
              <Text style={styles.sortByText}>
                Sort by: <Text style={styles.sortBySpan}>{sortBy}</Text>
              </Text>
            </Pressable>
          </>
        )}
        <View style={styles.searchResultList}>
          {isLoading ? (
            <View>
              <SearchResultItemSkeleton />
              <SearchResultItemSkeleton />
              <SearchResultItemSkeleton />
            </View>
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            <FlashList
              data={videos}
              renderItem={renderSearchResultItem}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              onEndReached={() => {
                if (hasMore) {
                  loadMore();
                }
              }}
              onEndReachedThreshold={0.5}
              ListFooterComponent={() =>
                isLoadingMore ? <SearchResultItemSkeleton /> : null
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  searchResultText: {
    marginTop: 10,
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: Colors.primary700,
  },
  searchQuery: {
    fontFamily: "Poppins-SemiBold",
  },
  sortByText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: Colors.primary700,
    textAlign: "right",
  },
  sortBySpan: {
    fontFamily: "Poppins-SemiBold",
  },
  searchResultList: {
    flex: 1,
    marginTop: 20,
  },
});
