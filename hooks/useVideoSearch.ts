import { useInfiniteQuery } from "@tanstack/react-query";
import {
  VideoItem,
  YouTubeSeachResponse,
  YouTubeSearchResponseSchema,
} from "../types/types";
import { useMemo } from "react";

const BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;

const mapYouTubeResponse = (
  items: YouTubeSeachResponse["items"]
): VideoItem[] => {
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
  sortBy,
}: {
  pageParam?: string;
  query: string;
  sortBy: string;
}) => {
  if (!query) return { items: [], nextPageToken: null };

  let url = `${BASE_URL}?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(
    query
  )}&key=${API_KEY}`;

  if (pageParam) {
    url += `&pageToken=${pageParam}`;
  }

  if (sortBy) {
    url += `&order=${sortBy}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  const validatedVideoItemsResponse =
    YouTubeSearchResponseSchema.safeParse(data);

  if (!validatedVideoItemsResponse.success) {
    throw new Error(validatedVideoItemsResponse.error.message);
  }

  return {
    items: mapYouTubeResponse(validatedVideoItemsResponse.data.items),
    nextPageToken: validatedVideoItemsResponse.data.nextPageToken || null,
    totalResults: validatedVideoItemsResponse.data.pageInfo.totalResults,
  };
};

export function useVideoSearch(query: string, sortBy: string) {
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
    queryFn: ({ pageParam }) => fetchVideos({ pageParam, query, sortBy }),
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
