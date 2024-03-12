'use server';

import { createComment } from '@/database/comment';
import { CommentSchema, Inputs } from '@/schemas/CommentSchema';
import { revalidatePath } from 'next/cache';

// export const addComment = async (formData: FormData) => {
//   const commentText = formData.get('commentText');
//   const episodeId = formData.get('episodeId');
//   const userId = formData.get('userId');
//   const spoiler = !formData.get('spoiler') ? false : true;
//   const parentId = formData.get('parentId');
//   if (!commentText || !episodeId) return;
//   try {
//     await createComment(
//       commentText as string,
//       Number(episodeId),
//       userId as string,
//       spoiler,
//       Number(parentId)
//     );
//   } catch (error) {
//     if (error instanceof Error) {
//       return { error: error.message || 'Nie udało się dodać komentarza'};
//     }
//   } finally {
//     revalidatePath('/anime/[slug]/[episodeNumber]', 'page');
//   }
// };

export const addComment = async (data: Inputs) => {
  const result = CommentSchema.safeParse(data);
  // const commentText = formData.get('commentText');
  // const episodeId = formData.get('episodeId');
  // const userId = formData.get('userId');
  // const spoiler = !formData.get('spoiler') ? false : true;
  // const parentId = formData.get('parentId');
  // if (!commentText || !episodeId) return;
  try {
    await createComment(
      data.commentText,
      data.episodeId,
      data.userId,
      data.spoiler,
      data.parentId
    );
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message || 'Nie udało się dodać komentarza' };
    }
  } finally {
    revalidatePath('/anime/[slug]/[episodeNumber]', 'page');
  }
};
