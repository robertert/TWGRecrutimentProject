import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../../constants/colors";
import SearchBar from "../../../../components/SearchBar";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState, useEffect } from "react";
import { FlashList, FlashListRef } from "@shopify/flash-list";
import SearchResultItem from "../../../../components/SearchResultItem";
import SearchResultItemSkeleton from "../../../../components/skeletons/SearchResultItemSkeleton";
import { VideoItem } from "../../../../types/types";
import { useVideoSearch } from "../../../../hooks/useVideoSearch";
import { mapSortBy } from "../../../../utils/functions";
import FilterModal from "../../../../components/FilterModal";
import ErrorMessage from "../../../../components/ErrorMessage";

export default function Search() {
  const { searchQuery } = useLocalSearchParams();

  const flashListRef = useRef<FlashListRef<VideoItem>>(null);

  const [search, setSearch] = useState<string>((searchQuery as string) || "");
  const [query, setQuery] = useState<string>(search);
  const [sortBy, setSortBy] = useState<string>("Most popular");
  const [sortByText, setSortByText] = useState<string>("Most popular");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [tempSortBy, setTempSortBy] = useState<string>(sortBy);

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

  useEffect(() => {
    setSearch(searchQuery as string);
    setQuery(searchQuery as string);
  }, [searchQuery]);

  useEffect(() => {
    if (isFilterModalVisible) {
      setTempSortBy(sortBy);
    }
  }, [isFilterModalVisible, sortBy]);

  const searchFunction = (query: string) => {
    setQuery(query);
  };

  const renderSearchResultItem = ({ item }: { item: VideoItem }) => (
    <SearchResultItem video={item} />
  );

  const handleRefresh = () => {
    searchVideos();
    flashListRef.current?.scrollToIndex({ index: 0 });
  };

  const closeFilterModal = (confirm: boolean) => {
    if (confirm) {
      setSortBy(tempSortBy);
      setSortByText(tempSortBy);
      handleRefresh();
    } else {
      setTempSortBy(sortBy);
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
              <Text style={styles.searchQuery}>"{query}"</Text>
            </Text>
            <Pressable onPress={() => setIsFilterModalVisible(true)}>
              <Text style={styles.sortByText}>
                Sort by: <Text style={styles.sortBySpan}>{sortByText}</Text>
              </Text>
            </Pressable>
          </>
        )}
        {!query || query?.length === 0 ? (
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
              <ErrorMessage message={error} onRetry={() => searchVideos()} />
            ) : (
              <FlashList
                ref={flashListRef}
                data={videos}
                renderItem={renderSearchResultItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                keyboardDismissMode="on-drag"
                onEndReached={() => {
                  if (hasMore) {
                    loadMore();
                  }
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() =>
                  isLoadingMore ? <SearchResultItemSkeleton /> : null
                }
                ListEmptyComponent={() => (
                  <View style={styles.searchResultListEmpty}>
                    <Text style={styles.searchResultListEmptyText}>
                      No results found
                    </Text>
                  </View>
                )}
                refreshing={isLoading}
                onRefresh={handleRefresh}
              />
            )}
          </View>
        )}
      </View>
      <FilterModal
        visible={isFilterModalVisible}
        onClose={closeFilterModal}
        sortBy={tempSortBy}
        setSortBy={setTempSortBy}
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
