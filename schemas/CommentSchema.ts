import { z } from 'zod';

export const CommentSchema = z.object({
  commentText: z.string().min(1, {message: 'Komentarz nie może być pusty'}).max(800),
  spoiler: z.boolean().default(false).optional(),
  episodeId: z.number(),
  userId: z.string(),
  parentId: z.number().optional(),
});

export type Inputs = z.infer<typeof CommentSchema>;

