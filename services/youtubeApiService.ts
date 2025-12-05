import {
  VideoItem,
  YouTubeSeachResponse,
  YouTubeSearchResponseSchema,
  YouTubeRawVideoItemSchema,
  YouTubeRawVideoItem,
} from "../types/types";
import { SearchVideosResponse } from "../types/types";

const SEARCH_BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const VIDEOS_BASE_URL = "https://www.googleapis.com/youtube/v3/videos";
const API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;

export interface SearchVideosParams {
  query: string;
  sortBy?: string;
  pageToken?: string;
  maxResults?: number;
}

const mapSearchResponse = (
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

const mapVideoDetailsResponse = (item: YouTubeRawVideoItem): VideoItem => {
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

/**
 * Wyszukuje filmy w YouTube API
 */
export async function searchVideos({
  query,
  sortBy = "viewCount",
  pageToken,
  maxResults = 10,
}: SearchVideosParams): Promise<SearchVideosResponse> {
  if (!query) {
    return { items: [], nextPageToken: undefined, totalResults: 0 };
  }

  let url = `${SEARCH_BASE_URL}?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(
    query
  )}&key=${API_KEY}`;

  if (pageToken) {
    url += `&pageToken=${pageToken}`;
  }

  if (sortBy) {
    url += `&order=${sortBy}`;
  }

  let response: Response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error(
      "Brak połączenia z internetem. Sprawdź swoje połączenie i spróbuj ponownie."
    );
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message ||
        `Błąd serwera: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json().catch((error) => {
    throw new Error("Nie udało się przetworzyć odpowiedzi serwera.");
  });

  const validatedVideoItemsResponse =
    YouTubeSearchResponseSchema.safeParse(data);

  if (!validatedVideoItemsResponse.success) {
    throw new Error("Nieprawidłowy format danych. Spróbuj ponownie później.");
  }

  return {
    items: mapSearchResponse(validatedVideoItemsResponse.data.items),
    nextPageToken: validatedVideoItemsResponse.data.nextPageToken || undefined,
    totalResults: validatedVideoItemsResponse.data.pageInfo.totalResults,
  };
}

/**
 * Pobiera szczegóły filmu z YouTube API
 */
export async function getVideoDetails(
  videoId: string
): Promise<VideoItem | null> {
  if (!videoId) return null;

  const url = `${VIDEOS_BASE_URL}?part=snippet,statistics&type=video&id=${encodeURIComponent(
    videoId
  )}&key=${API_KEY}`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error(
      "Brak połączenia z internetem. Sprawdź swoje połączenie i spróbuj ponownie."
    );
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message ||
        `Błąd serwera: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json().catch((error) => {
    throw new Error("Nie udało się przetworzyć odpowiedzi serwera.");
  });

  if (data.error) {
    throw new Error(data.error.message || "Błąd API YouTube");
  }

  if (!data.items || data.items.length === 0) {
    throw new Error("Nie znaleziono wideo");
  }

  const validatedVideoItems = YouTubeRawVideoItemSchema.safeParse(
    data.items[0]
  );
  if (!validatedVideoItems.success) {
    throw new Error("Nieprawidłowy format danych. Spróbuj ponownie później.");
  }

  return mapVideoDetailsResponse(validatedVideoItems.data);
}
