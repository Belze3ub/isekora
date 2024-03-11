import supabase from './dbConfig';
import { CommentUser } from './types/types';

export const fetchCommentsForEpisode = async (
  episode_id: number
): Promise<CommentUser[]> => {
  let comments: CommentUser[] = [];
  try {
    const { data, error } = await supabase.rpc('fetch_comments_with_users', {
      ep_id: episode_id,
    });
    if (error) {
      console.error(
        `Error fetching comments from episode_id: ${episode_id} - ${error.message}`
      );
    } else {
      comments = data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Error fetching comments from episode_id: ${episode_id} - ${error.message}`
      );
    }
  }
  return comments;
};

export const createComment = async (
  commentText: string,
  episodeId: number,
  userId: string,
  spoiler?: boolean,
  parentId?: number
) => {
  const { data, error } = await supabase.from('comment').insert([
    {
      episode_id: episodeId,
      user_id: userId,
      comment_text: commentText,
      spoiler: spoiler,
      parent_id: parentId || null,
    },
  ]);
  if (error) {
    console.error(error);
  } else {
    return data;
  }
};
