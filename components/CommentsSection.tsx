import { fetchCommentsForEpisode } from '@/database/comment';
import { fetchEpisodeBySlugAndNumber } from '@/database/episode';
import { getServerSession } from 'next-auth';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

interface Props {
  slug: string;
  episodeNumber: string;
}

const CommentsSection = async ({ slug, episodeNumber }: Props) => {
  const session = await getServerSession(authOptions);
  const episode = await fetchEpisodeBySlugAndNumber(slug, episodeNumber);
  const comments =
    episode && (await fetchCommentsForEpisode(episode.episode_id));
  const mainComments = comments
    ? comments?.filter((comment) => !comment.parent_id)
    : [];
  const replies = comments
    ? comments
        ?.filter((comment) => comment.parent_id)
        .sort(
          (a, b) =>
            new Date(a.create_date!).getTime() -
            new Date(b.create_date!).getTime()
        )
    : [];

  return (
    <div className="bg-primary flex flex-col gap-3 rounded-lg p-3 mt-5">
      {session?.user?.id ? (
        <CommentForm episodeId={episode?.episode_id!} />
      ) : (
        <p className="text-center py-5">Zaloguj się aby dodać komentarz</p>
      )}
      {mainComments?.map((comment) => (
        <Comment
          key={comment.comment_id}
          comment={comment}
          replies={replies}
          session={session}
        />
      ))}
    </div>
  );
};

export default CommentsSection;
