import { useInfiniteQuery } from "@tanstack/react-query";
import {
  safeValidateArray,
  VideoItem,
  VideoItemResponseSchema,
  VideoItemSchema,
} from "../types/types";
import { useMemo } from "react";

const BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;

const mapYouTubeResponse = (items: any[]): VideoItem[] => {
  return items.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.medium.url,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
  }));
};

const fetchVideos = async ({
  pageParam,
  query,
}: {
  pageParam: string;
  query: string;
}) => {
  if (!query) return { items: [], nextPageToken: null };

  let url = `${BASE_URL}?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(
    query
  )}&key=${API_KEY}`;

  if (pageParam) {
    url += `&pageToken=${pageParam}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  const validatedVideoItemsResponse = VideoItemResponseSchema.safeParse(data);

  if (!validatedVideoItemsResponse.success) {
    throw new Error(validatedVideoItemsResponse.error.message);
  }

  const validatedVideoItems = safeValidateArray(VideoItemSchema, data.items);

  if (!validatedVideoItems.success) {
    throw new Error(validatedVideoItems.errors.join(", "));
  }

  if (data.error) {
    throw new Error(data.error.message || "Błąd API YouTube");
  }

  return {
    items: mapYouTubeResponse(validatedVideoItems.data),
    nextPageToken: validatedVideoItemsResponse.data.nextPageToken || null,
    totalResults: validatedVideoItemsResponse.data.pageInfo.totalResults,
  };
};

export function useVideoSearch(query: string) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["videoSearch", query],
    queryFn: ({ pageParam }) => fetchVideos({ pageParam, query }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
  });

  const videos = useMemo(() => {
    if (!data) return [];

    const allVideos = data.pages.flatMap((page) => page.items);

    const seen = new Set();
    return allVideos.filter((video) => {
      if (seen.has(video.id)) return false;
      seen.add(video.id);
      return true;
    });
  }, [data]);

  return {
    videos,
    isLoading: isPending,
    isLoadingMore: isFetchingNextPage,
    totalResults: data?.pages[0]?.totalResults || 0,
    error: error ? error.message : null,
    searchVideos: refetch,
    loadMore: fetchNextPage,
    hasMore: hasNextPage,
  };
}
