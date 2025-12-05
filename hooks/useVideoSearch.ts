import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { searchVideos } from "../services/youtubeApiService";
import { categories } from "../constants/categories";
import { UseVideoSearchResponse } from "../types/types";

/**
 * Hook to search videos on YouTube
 * @param query - search query
 * @param sortBy - sort by field
 * @returns {UseVideoSearchResponse} - response from hook
 */

export function useVideoSearch(
  query: string,
  sortBy: string
): UseVideoSearchResponse {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["videoSearch", query, sortBy],
    queryFn: ({ pageParam }) =>
      searchVideos({
        query,
        sortBy,
        pageToken: pageParam as string | undefined,
      }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    enabled: !!query,
    staleTime: categories.some((category) => category.name === query)
      ? 1000 * 60 * 60 * 24
      : 1000 * 60 * 5,
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
