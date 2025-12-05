import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../../constants/colors";
import { Image } from "expo-image";
import SearchBar from "../../../../components/SearchBar";
import CategoryItem from "../../../../components/CategoryItem";
import { router } from "expo-router";
import { useState } from "react";
import { categories } from "../../../../constants/categories";

export default function Home() {
  const [search, setSearch] = useState<string>("");

  const searchFunction = (query: string) => {
    router.replace({
      pathname: "./search",
      params: {
        searchQuery: query,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView>
        <View style={styles.topSection}>
          <SearchBar
            value={search}
            setValue={setSearch}
            searchFunction={searchFunction}
          />
          <Pressable onPress={() => router.replace("/(app)/(stack)/settings")}>
            <Image
              source={require("../../../../assets/icons/settings-icon.svg")}
              style={styles.settingsIcon}
            />
          </Pressable>
        </View>
        <View style={styles.categoriesSection}>
          {categories.map((category, index) => (
            <CategoryItem
              key={category.id}
              category={category}
              isLast={index === categories.length - 1}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 24,
  },
  settingsIcon: {
    marginLeft: 12,
    width: 32,
    height: 32,
  },
  categoriesSection: {
    marginTop: 20,
  },
  categoriesTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    color: Colors.primary700,
  },
});
