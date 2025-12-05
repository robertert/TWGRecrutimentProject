import { View, StyleSheet, Text } from "react-native";
import Video from "react-native-video";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "../../../../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Controls from "../../../../../components/Controls";
import { useVideoPlayer } from "../../../../../hooks/useVideoPlayer";
import { useVideoSearchDetails } from "../../../../../hooks/useVideoSearchDetails";
import UserSkeleton from "../../../../../components/skeletons/UserSkeleton";
import VideoTabsComponent from "../../../../../components/VideoTabs";
import { useVideoStore } from "../../../../../store/videoStore";
import { useEffect } from "react";
import ProfileInfo from "../../../../../components/ProfileInfo";
import ErrorMessage from "../../../../../components/ErrorMessage";

const videoSource = require("../../../../../assets/video/broadchurch.mp4");

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

  const setCurrentTime = useVideoStore((state) => state.setCurrentTime);

  const setVideoRef = useVideoStore((state) => state.setVideoRef);

  useEffect(() => {
    if (videoRef) {
      setVideoRef(videoRef);
    }
  }, [videoRef, setVideoRef]);

  if (error) {
    return (
      <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
        <ErrorMessage message={error} onRetry={refresh} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={videoSource}
          allowsExternalPlayback={true}
          ignoreSilentSwitch="ignore"
          playInBackground={true}
          style={styles.videoPlayer}
          controls={false}
          resizeMode="contain"
          paused={paused}
          onProgress={(data) => {
            handleVideoProgress(data.currentTime);
            setCurrentTime(data.currentTime);
          }}
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
          <ProfileInfo channelTitle={videoDetails?.channelTitle || ""} />
        </>
      )}
      <View style={styles.materialTopTabsContainer}>
        <VideoTabsComponent />
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
  materialTopTabsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tabBarIndicator: {
    backgroundColor: Colors.primary100,
    height: 3,
  },
});
