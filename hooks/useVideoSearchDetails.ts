import { useQuery } from "@tanstack/react-query";
import { VideoItem, VideoItemSchema } from "../types/types";
import { useVideoStore } from "../store/videoStore";
import { useEffect } from "react";

const BASE_URL = "https://www.googleapis.com/youtube/v3/videos";
const API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;

// Helper do mapowania
const mapYouTubeResponse = (item: any): VideoItem => {
  return {
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.medium.url,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    views: item.statistics?.viewCount || "0",
    likes: item.statistics?.likeCount || "0",
  };
};

const fetchVideoDetails = async (videoId: string) => {
  if (!videoId) return null;

  const url = `${BASE_URL}?part=snippet,statistics&type=video&id=${encodeURIComponent(
    videoId
  )}&key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  const validatedVideoItems = VideoItemSchema.safeParse(data.items[0]);
  if (!validatedVideoItems.success) {
    throw new Error(validatedVideoItems.error.message);
  }
  if (data.error) {
    throw new Error(data.error.message || "Błąd API YouTube");
  }

  if (!data.items || data.items.length === 0) {
    throw new Error("Nie znaleziono wideo");
  }

  return mapYouTubeResponse(validatedVideoItems.data);
};

export function useVideoSearchDetails(videoId: string) {
  const setVideo = useVideoStore((state) => state.setVideo);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["videoDetails", videoId],
    queryFn: () => fetchVideoDetails(videoId),
    enabled: !!videoId,
    staleTime: 1000 * 60 * 10,
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
