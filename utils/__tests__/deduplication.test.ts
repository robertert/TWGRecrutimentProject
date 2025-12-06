import { VideoItem } from "../../types/types";

/**
 * Funkcja deduplikacji z useVideoSearch
 * Testujemy logikę, która usuwa duplikaty wideo na podstawie ID
 */
function deduplicateVideos(videos: VideoItem[]): VideoItem[] {
  const seen = new Set<string>();
  return videos.filter((video) => {
    if (seen.has(video.id)) return false;
    seen.add(video.id);
    return true;
  });
}

describe("deduplicateVideos", () => {
  const mockVideo1: VideoItem = {
    id: "video1",
    title: "Test Video 1",
    description: "Description 1",
    thumbnail: "thumb1.jpg",
    channelTitle: "Channel 1",
    publishedAt: "2024-01-01",
  };

  const mockVideo2: VideoItem = {
    id: "video2",
    title: "Test Video 2",
    description: "Description 2",
    thumbnail: "thumb2.jpg",
    channelTitle: "Channel 2",
    publishedAt: "2024-01-02",
  };

  const mockVideo3: VideoItem = {
    id: "video3",
    title: "Test Video 3",
    description: "Description 3",
    thumbnail: "thumb3.jpg",
    channelTitle: "Channel 3",
    publishedAt: "2024-01-03",
  };

  it("powinien zwracać pustą tablicę dla pustej tablicy wejściowej", () => {
    expect(deduplicateVideos([])).toEqual([]);
  });

  it("powinien zwracać tę samą tablicę gdy nie ma duplikatów", () => {
    const videos = [mockVideo1, mockVideo2, mockVideo3];
    const result = deduplicateVideos(videos);
    expect(result).toEqual(videos);
    expect(result).toHaveLength(3);
  });

  it("powinien usuwać duplikaty na podstawie ID", () => {
    const videos = [mockVideo1, mockVideo2, mockVideo1, mockVideo3];
    const result = deduplicateVideos(videos);
    expect(result).toHaveLength(3);
    expect(result[0].id).toBe("video1");
    expect(result[1].id).toBe("video2");
    expect(result[2].id).toBe("video3");
  });

  it("powinien zachować pierwsze wystąpienie duplikatu", () => {
    const duplicate1 = { ...mockVideo1, title: "First Title" };
    const duplicate2 = { ...mockVideo1, title: "Second Title" };
    const videos = [duplicate1, duplicate2];
    const result = deduplicateVideos(videos);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("First Title");
  });

  it("powinien obsługiwać wiele duplikatów tego samego wideo", () => {
    const videos = [
      mockVideo1,
      mockVideo1,
      mockVideo2,
      mockVideo1,
      mockVideo3,
      mockVideo2,
    ];
    const result = deduplicateVideos(videos);
    expect(result).toHaveLength(3);
    expect(result.map((v) => v.id)).toEqual(["video1", "video2", "video3"]);
  });

  it("powinien obsługiwać duplikaty na początku i końcu listy", () => {
    const videos = [mockVideo1, mockVideo2, mockVideo3, mockVideo1];
    const result = deduplicateVideos(videos);
    expect(result).toHaveLength(3);
    expect(result[0].id).toBe("video1");
  });
});
