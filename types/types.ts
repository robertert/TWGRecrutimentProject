import { z } from "zod";

export type Category = {
  id: number;
  name: string;
};

export const VideoItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  channelTitle: z.string(),
  publishedAt: z.string(),
  views: z.number().optional(),
  likes: z.number().optional(),
});

export type VideoItem = z.infer<typeof VideoItemSchema>;

export const VideoItemResponseSchema = z.object({
  items: z.array(VideoItemSchema),
  nextPageToken: z.string().optional(),
  pageInfo: z.object({
    totalResults: z.number(),
  }),
});

export type VideoItemResponse = z.infer<typeof VideoItemResponseSchema>;

export const safeValidateArray = <T>(
  schema: z.ZodSchema<T>,
  data: T[]
): { success: boolean; errors: string[]; data: T[] } => {
  if (!Array.isArray(data)) {
    return { success: false, errors: ["Data is not an array"], data: [] };
  }
  const errors: string[] = [];
  const results = data.map((item) => {
    const result = schema.safeParse(item);
    if (!result.success) {
      errors.push(result.error.message);
    }
    return result.data;
  });
  if (errors.length > 0) {
    return { success: false, errors, data: [] };
  }
  return {
    success: true,
    errors,
    data: results.filter((result) => result !== undefined) as T[],
  };
};
