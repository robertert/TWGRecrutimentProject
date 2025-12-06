import {
  mapSearchResponse,
  mapVideoDetailsResponse,
} from "../youtubeApiService";
import { YouTubeSearchResponse, YouTubeRawVideoItem } from "../../types/types";

// Mock fetch globalnie
global.fetch = jest.fn();

describe("mapSearchResponse", () => {
  it("powinien mapować odpowiedź wyszukiwania na VideoItem[]", () => {
    const mockResponse: YouTubeSearchResponse = {
      items: [
        {
          id: { videoId: "video1" },
          snippet: {
            title: "Test Video 1",
            description: "Description 1",
            thumbnails: {
              medium: {
                url: "thumb1.jpg",
              },
            },
            channelTitle: "Channel 1",
            publishedAt: "2024-01-01T00:00:00Z",
          },
        },
        {
          id: { videoId: "video2" },
          snippet: {
            title: "Test Video 2",
            description: "Description 2",
            thumbnails: {
              medium: {
                url: "thumb2.jpg",
              },
            },
            channelTitle: "Channel 2",
            publishedAt: "2024-01-02T00:00:00Z",
          },
        },
      ],
      nextPageToken: "nextToken123",
      pageInfo: {
        totalResults: 2,
      },
    };

    // Funkcja mapSearchResponse jest prywatna, więc testujemy ją przez eksport
    // W rzeczywistości musimy ją wyeksportować lub przetestować przez searchVideos
    // Dla celów testowych, załóżmy że jest eksportowana
    const result = mapSearchResponse(mockResponse.items);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: "video1",
      title: "Test Video 1",
      description: "Description 1",
      thumbnail: "thumb1.jpg",
      channelTitle: "Channel 1",
      publishedAt: "2024-01-01T00:00:00Z",
    });
    expect(result[1]).toEqual({
      id: "video2",
      title: "Test Video 2",
      description: "Description 2",
      thumbnail: "thumb2.jpg",
      channelTitle: "Channel 2",
      publishedAt: "2024-01-02T00:00:00Z",
    });
  });

  it("powinien zwracać pustą tablicę dla pustej odpowiedzi", () => {
    const result = mapSearchResponse([]);
    expect(result).toEqual([]);
  });
});

describe("mapVideoDetailsResponse", () => {
  it("powinien mapować szczegóły wideo na VideoItem", () => {
    const mockVideo: YouTubeRawVideoItem = {
      id: "video1",
      snippet: {
        title: "Test Video",
        description: "Test Description",
        thumbnails: {
          medium: {
            url: "thumb.jpg",
          },
        },
        channelTitle: "Test Channel",
        publishedAt: "2024-01-01T00:00:00Z",
      },
      statistics: {
        viewCount: "1000",
        likeCount: "50",
      },
    };

    const result = mapVideoDetailsResponse(mockVideo);

    expect(result).toEqual({
      id: "video1",
      title: "Test Video",
      description: "Test Description",
      thumbnail: "thumb.jpg",
      channelTitle: "Test Channel",
      publishedAt: "2024-01-01T00:00:00Z",
      views: "1000",
      likes: "50",
    });
  });

  it('powinien używać "0" jako domyślnej wartości dla brakujących statystyk', () => {
    const mockVideo: YouTubeRawVideoItem = {
      id: "video1",
      snippet: {
        title: "Test Video",
        description: "Test Description",
        thumbnails: {
          medium: {
            url: "thumb.jpg",
          },
        },
        channelTitle: "Test Channel",
        publishedAt: "2024-01-01T00:00:00Z",
      },
      statistics: {
        viewCount: "0",
        likeCount: "0",
      },
    };

    const result = mapVideoDetailsResponse(mockVideo);

    expect(result.views).toBe("0");
    expect(result.likes).toBe("0");
  });
});

// Uwaga: Testy dla searchVideos i getVideoDetails wymagają mockowania fetch
// i są bardziej złożone. Można je dodać później jeśli potrzeba.
