import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/colors";
import { router } from "expo-router";
import { Image } from "expo-image";

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Image
          source={require("../../../assets/icons/leftarrow-icon.svg")}
          style={styles.backIcon}
        />
      </Pressable>
      <Text style={styles.title}>Settings</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    color: Colors.primary700,
  },
});
