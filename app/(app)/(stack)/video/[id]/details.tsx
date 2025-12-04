import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../../../../constants/colors";
import { Image } from "expo-image";
import { useVideoStore } from "../../../../../store/videoStore";
import { formatNumber } from "../../../../../utils/functions";
import MovieDetailsSkeleton from "../../../../../components/skeletons/MovieDetailsSkeleton";

export default function DetailsScreen() {
  const { video } = useVideoStore();

  if (!video) {
    return <MovieDetailsSkeleton />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Description</Text>
      <Text style={styles.descriptionText}>{video?.description}</Text>
      <Text style={styles.subtitle}>Statistics</Text>
      <View style={styles.statisticsContainer}>
        <View style={styles.statisticsItem}>
          <Image
            source={require("../../../../../assets/icons/views-icon.svg")}
            style={styles.statisticsItemIcon}
            contentFit="scale-down"
          />
          <Text style={styles.statisticsItemValue}>
            {formatNumber(video?.views || 0)} views
          </Text>
        </View>
        <View style={styles.statisticsItem}>
          <Image
            source={require("../../../../../assets/icons/likes-icon.svg")}
            style={styles.statisticsItemIcon}
            contentFit="scale-down"
          />
          <Text style={styles.statisticsItemValue}>
            {formatNumber(video?.likes || 0)} likes
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  subtitle: {
    paddingTop: 16,
    fontFamily: "Poppins-SemiBold",
    fontSize: 10,
    color: Colors.primary700,
  },
  descriptionText: {
    marginTop: 8,
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: Colors.primary700,
  },
  statisticsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  statisticsItem: {
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    width: 136,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primary700,
    justifyContent: "space-between",
  },
  statisticsItemIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.primary100,
  },
  statisticsItemValue: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontSize: 10,
    color: Colors.primary100,
  },
});
