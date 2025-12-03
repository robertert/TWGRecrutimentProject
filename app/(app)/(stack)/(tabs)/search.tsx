import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../../constants/colors";
import SearchBar from "../../../../components/SearchBar";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import SearchResultItem from "../../../../components/SearchResultItem";
import { movies } from "../../../../constants/dummy_data";
import { Movie } from "../../../../types/types";

export default function Search() {
  const { searchQuery } = useLocalSearchParams();

  const [search, setSearch] = useState<string>(searchQuery as string);
  const [sortBy, setSortBy] = useState<string>("Most popular");
  const [searchResult, setSearchResult] = useState<Movie[]>(movies);

  const searchFunction = (query: string) => {
    console.log("searchFunction", query);
  };

  const renderSearchResultItem = ({ item }: { item: Movie }) => (
    <SearchResultItem movie={item} />
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.content}>
        <SearchBar
          value={search}
          setValue={setSearch}
          searchFunction={searchFunction}
        />
        {searchResult.length > 0 && (
          <>
            <Text style={styles.searchResultText}>
              {searchResult.length} results found for{" "}
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
          <FlashList
            data={searchResult}
            renderItem={renderSearchResultItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
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
