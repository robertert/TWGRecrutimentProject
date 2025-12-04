import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../../constants/colors";
import SearchBar from "../../../../components/SearchBar";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { FlashList, FlashListRef } from "@shopify/flash-list";
import SearchResultItem from "../../../../components/SearchResultItem";
import SearchResultItemSkeleton from "../../../../components/skeletons/SearchResultItemSkeleton";
import { VideoItem } from "../../../../types/types";
import { useVideoSearch } from "../../../../hooks/useVideoSearch";
import { mapSortBy } from "../../../../utils/functions";
import FilterModal from "../../../../components/FilterModal";

export default function Search() {
  const { searchQuery } = useLocalSearchParams();

  const flashListRef = useRef<FlashListRef<VideoItem>>(null);

  const [search, setSearch] = useState<string>((searchQuery as string) || "");
  const [query, setQuery] = useState<string>(search);
  const [sortBy, setSortBy] = useState<string>("Most popular");
  const [sortByText, setSortByText] = useState<string>("Most popular");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const {
    videos,
    totalResults,
    isLoading,
    error,
    hasMore,
    isLoadingMore,
    loadMore,
    searchVideos,
  } = useVideoSearch(query, mapSortBy(sortBy) || "viewCount");

  const searchFunction = (query: string) => {
    setQuery(query);
  };

  const renderSearchResultItem = ({ item }: { item: VideoItem }) => (
    <SearchResultItem video={item} />
  );

  const closeFilterModal = (confirm: boolean) => {
    if (confirm) {
      setSortBy(sortBy);
      setSortByText(sortBy);
      searchVideos();
      flashListRef.current?.scrollToIndex({ index: 0 });
    }
    setIsFilterModalVisible(false);
  };

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
            <Pressable onPress={() => setIsFilterModalVisible(true)}>
              <Text style={styles.sortByText}>
                Sort by: <Text style={styles.sortBySpan}>{sortByText}</Text>
              </Text>
            </Pressable>
          </>
        )}
        {query.length === 0 ? (
          <View style={styles.searchResultListEmpty}>
            <Text style={styles.searchResultListEmptyText}>
              Please enter a search query
            </Text>
          </View>
        ) : (
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
                ref={flashListRef}
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
        )}
      </View>
      <FilterModal
        visible={isFilterModalVisible}
        onClose={closeFilterModal}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
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
  searchResultListEmpty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchResultListEmptyText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: Colors.primary700,
  },
});
