import supabase from './dbConfig';
import { CommentUser } from './types/types';

export const fetchCommentsForEpisode = async (episode_id: number): Promise<CommentUser[]> => {
  let comments: CommentUser[] = [];
  try {
    const { data, error } = await supabase
      // .from('comment')
      // .select('*')
      // .eq('episode_id', episode_id);
      .rpc('fetch_comments_with_users', {
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
