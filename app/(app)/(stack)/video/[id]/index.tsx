import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
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
import { useVideoSearchDetails } from "../../../../../hooks/useVideoSearchDetails";
import UserSkeleton from "../../../../../components/skeletons/UserSkeleton";

const videoSource = require("../../../../../assets/video/broadchurch.mp4");

const VideoTabs = createMaterialTopTabNavigator();

export default function VideoScreen() {
  const { id } = useLocalSearchParams();

  const { videoDetails, isLoading, error, refresh } = useVideoSearchDetails(
    id as string
  );

  const safeAreaInsets = useSafeAreaInsets();

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

  if (error) {
    return <Text>{error}</Text>;
  }

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
      {isLoading ? (
        <UserSkeleton />
      ) : (
        <>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.movieName}>
            {videoDetails?.title}
          </Text>
          <View style={styles.movieAuthorContainer}>
            <View style={styles.movieAuthorIconContainer}>
              <Image
                source={require("../../../../../assets/icons/person-icon.svg")}
                style={styles.movieAuthorIcon}
                contentFit="scale-down"
              />
            </View>
            <Text style={styles.movieAuthor}>{videoDetails?.channelTitle}</Text>
          </View>
        </>
      )}
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
            options={{
              title: "Details",
              lazy: false,
            }}
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
