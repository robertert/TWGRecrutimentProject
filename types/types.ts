import { z } from "zod";

export type Category = {
  id: number;
  name: string;
};

export const YouTubeRawVideoItemSchema = z.object({
  id: z.string(),
  snippet: z.object({
    title: z.string(),
    description: z.string(),
    thumbnails: z.object({
      medium: z.object({
        url: z.string(),
      }),
    }),
    channelTitle: z.string(),
    publishedAt: z.string(),
  }),
  statistics: z.object({
    viewCount: z.string(),
    likeCount: z.string(),
  }),
});

export type YouTubeRawVideoItem = z.infer<typeof YouTubeRawVideoItemSchema>;

export const YouTubeRawItemSchema = z.object({
  id: z.object({
    videoId: z.string(),
  }),
  snippet: z.object({
    title: z.string(),
    description: z.string(),
    thumbnails: z.object({
      medium: z.object({
        url: z.string(),
      }),
    }),
    channelTitle: z.string(),
    publishedAt: z.string(),
  }),
  statistics: z
    .object({
      viewCount: z.string(),
      likeCount: z.string(),
    })
    .optional(),
});

export type YouTubeRawItem = z.infer<typeof YouTubeRawItemSchema>;

export const YouTubeSearchResponseSchema = z.object({
  items: z.array(YouTubeRawItemSchema),
  nextPageToken: z.string().optional(),
  pageInfo: z.object({
    totalResults: z.number(),
  }),
  error: z.object({ message: z.string() }).optional(),
});

export type YouTubeSeachResponse = z.infer<typeof YouTubeSearchResponseSchema>;

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  views?: string;
  likes?: string;
}
