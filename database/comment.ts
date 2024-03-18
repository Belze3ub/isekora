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

export const fetchCommentById = async (
  comment_id: number
): Promise<CommentUser | null> => {
  let comment: CommentUser | null = null;
  try {
    const { data, error } = await supabase.rpc('fetch_comment_by_id', {
      comm_id: comment_id,
    });
    if (error) {
      console.error(
        `Error fetching comment with comment_id: ${comment_id} - ${error.message}`
      );
    } else {
      comment = data[0];
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Error fetching comment with comment_id: ${comment_id} - ${error.message}`
      );
    }
  }
  return comment;
};

export const createComment = async (
  commentText: string,
  episodeId: number,
  userId: string,
  spoiler?: boolean,
  parentId?: number
) => {
  try {
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
      throw new Error(
        `Error inserting comment: ${commentText} to database - ${error.message}`
      );
    } else {
      return data;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error inserting comment: ${commentText} to database - ${error.message}`
      );
    }
  }
};
