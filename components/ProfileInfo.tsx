import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../constants/colors";
import { Image } from "expo-image";

export default function ProfileInfo({
  channelTitle,
  alignSelf = "flex-start",
}: {
  channelTitle: string;
  alignSelf?: "center" | "flex-start";
}) {
  return (
    <View style={[styles.movieAuthorContainer, { alignSelf }]}>
      <View style={styles.movieAuthorIconContainer}>
        <Image
          source={require("../assets/icons/person-icon.svg")}
          style={styles.movieAuthorIcon}
          contentFit="scale-down"
        />
      </View>
      <Text style={styles.movieAuthor}>{channelTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  movieAuthorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 12,
  },
  movieAuthor: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: Colors.primary700,
  },
  movieAuthorIconContainer: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    backgroundColor: Colors.primary700,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  movieAuthorIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.primary100,
  },
});
