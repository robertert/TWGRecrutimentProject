import { StyleSheet, TextInput, View } from "react-native";
import { Image } from "expo-image";
import { Colors } from "../constants/colors";

export default function SearchBar() {
  return (
    <View style={styles.searchBar}>
      <Image
        source={require("../assets/icons/search-icon.svg")}
        style={styles.searchIcon}
      />
      <TextInput style={styles.searchInput} placeholder="Search videos" />
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
    width: "85%",
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
