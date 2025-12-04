import { View, StyleSheet, Text } from "react-native";
import Video from "react-native-video";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "../../../../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Controls from "../../../../../components/Controls";
import { useVideoPlayer } from "../../../../../hooks/useVideoPlayer";
import { Image } from "expo-image";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DetailsScreen from "./details";
import NotesScreen from "./notes";
import { useVideoStore } from "../../../../../store/videoStore";
import { useEffect } from "react";

const videoSource = require("../../../../../assets/video/broadchurch.mp4");

const dummyMovie = {
  id: 1,
  name: "Movie 1, This is a long movie name, This is a long movie name, This is a long movie name",
  author: "Author 1",
  thumbnailUrl: "https://via.placeholder.com/150",
  date: "2025-01-01",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  views: 20000000,
  likes: 20000000,
};

const VideoTabs = createMaterialTopTabNavigator();

export default function VideoScreen() {
  const { id } = useLocalSearchParams();

  const safeAreaInsets = useSafeAreaInsets();

  const { setVideo } = useVideoStore();

  useEffect(() => {
    setVideo(dummyMovie);
  }, []);

  const {
    videoRef,
    paused,
    currentTime,
    duration,
    controlsVisible,
    controlsOpacity,
    sliderProgress,
    togglePlayPause,
    toggleControls,
    resetControlsTimeout,
    handleSeek,
    handleSeekStart,
    handleSeekEnd,
    handleVideoProgress,
    handleVideoLoad,
  } = useVideoPlayer();

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={videoSource}
          style={styles.videoPlayer}
          controls={false}
          resizeMode="contain"
          paused={paused}
          onProgress={(data) => handleVideoProgress(data.currentTime)}
          onLoad={(data) => handleVideoLoad(data.duration)}
        />
        <Controls
          videoRef={videoRef}
          isPaused={paused}
          controlsVisible={controlsVisible}
          controlsOpacity={controlsOpacity}
          resetControlsTimeout={resetControlsTimeout}
          sliderProgress={sliderProgress}
          currentTime={currentTime}
          duration={duration}
          handleSeek={handleSeek}
          handleSeekStart={handleSeekStart}
          handleSeekEnd={handleSeekEnd}
          toggleControls={toggleControls}
          togglePlayPause={togglePlayPause}
        />
      </View>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.movieName}>
        {dummyMovie.name}
      </Text>
      <View style={styles.movieAuthorContainer}>
        <View style={styles.movieAuthorIconContainer}>
          <Image
            source={require("../../../../../assets/icons/person-icon.svg")}
            style={styles.movieAuthorIcon}
            contentFit="scale-down"
          />
        </View>
        <Text style={styles.movieAuthor}>{dummyMovie.author}</Text>
      </View>
      <View style={styles.materialTopTabsContainer}>
        <VideoTabs.Navigator
          screenOptions={{
            tabBarIndicatorStyle: {
              backgroundColor: Colors.primary700,
              height: 2,
              top: 23,
            },
            tabBarActiveTintColor: Colors.primary700,
            tabBarInactiveTintColor: Colors.primary700,
            tabBarLabelStyle: {
              fontFamily: "Poppins-SemiBold",
              fontSize: 12,
              textTransform: "none",
              marginTop: 0,
              marginBottom: 0,
            },
            tabBarItemStyle: {
              height: 23,
              justifyContent: "flex-start",
              paddingVertical: 5,
            },
            tabBarStyle: {
              height: 25,
              borderTopColor: Colors.secondary,
              backgroundColor: Colors.primary100,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 2,
              borderBottomColor: Colors.secondary,
            },
          }}
        >
          <VideoTabs.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: "Details" }}
          />
          <VideoTabs.Screen
            name="Notes"
            component={NotesScreen}
            options={{ title: "Notes" }}
          />
        </VideoTabs.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  videoPlayer: {
    flex: 1,
  },
  movieName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: Colors.primary700,
    marginTop: 20,
    marginHorizontal: 16,
  },
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
  materialTopTabsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tabBarIndicator: {
    backgroundColor: Colors.primary100,
    height: 3,
  },
});
