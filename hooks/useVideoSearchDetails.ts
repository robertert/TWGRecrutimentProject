import { useQuery } from "@tanstack/react-query";
import { useVideoStore } from "../store/videoStore";
import { useEffect } from "react";
import { getVideoDetails } from "../services/youtubeApiService";
import { UseVideoSearchDetailsResponse } from "../types/types";

/**
 * Hook to fetch video details from YouTube API
 * @param videoId - video id
 * @returns {UseVideoSearchDetailsResponse} - response from hook
 */
export function useVideoSearchDetails(
  videoId: string
): UseVideoSearchDetailsResponse {
  const setVideo = useVideoStore((state) => state.setVideo);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["videoDetails", videoId],
    queryFn: () => getVideoDetails(videoId),
    enabled: !!videoId,
    staleTime: 1000 * 60 * 1, // 1 minute
  });

  useEffect(() => {
    if (data) {
      setVideo(data);
    }
  }, [data, setVideo]);

  return {
    videoDetails: data || null,
    isLoading,
    error: error ? (error as Error).message : null,
    refresh: refetch,
  };
}
