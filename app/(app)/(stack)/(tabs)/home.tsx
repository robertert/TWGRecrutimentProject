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

const categories = [
  { id: 1, name: "Typescript" },
  { id: 2, name: "React" },
  { id: 3, name: "React Native" },
];

export default function Home() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView>
        <View style={styles.topSection}>
          <SearchBar />
          <Pressable onPress={() => router.push("./(stack)/settings")}>
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
