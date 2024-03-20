'use server';

import { createComment } from '@/database/comment';
import { CommentSchema, Inputs } from '@/schemas/CommentSchema';
import { revalidatePath } from 'next/cache';

export const addComment = async (data: Inputs) => {
  const result = CommentSchema.safeParse(data);
  if (!result.success) {
    throw new Error('Nie udało się dodać komentarza')
  }
  try {
    await createComment(
      result.data.commentText,
      result.data.episodeId,
      result.data.userId,
      result.data.spoiler,
      result.data.parentId
    );
    revalidatePath('/anime/[slug]/[episodeNumber]', 'page');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('Wystąpił nieznany błąd')
    }
  }
};
