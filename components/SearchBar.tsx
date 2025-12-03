import { StyleSheet, TextInput, View } from "react-native";
import { Image } from "expo-image";
import { Colors } from "../constants/colors";
import { useEffect, useRef, useState } from "react";

export default function SearchBar({
  value = "",
  setValue,
  searchFunction,
}: {
  value?: string;
  setValue?: (text: string) => void;
  searchFunction?: (query: string) => void;
}) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (value.length > 0) {
        searchFunction?.(value);
      }
    }, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);

  const onChangeText = (text: string) => {
    setValue?.(text);
  };

  return (
    <View style={styles.searchBar}>
      <Image
        source={require("../assets/icons/search-icon.svg")}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search videos"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: Colors.primary700,
    borderRadius: 16,
    flexShrink: 1,
    flexGrow: 0,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  searchInput: {
    marginLeft: 12,
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: Colors.primary700,
  },
});
