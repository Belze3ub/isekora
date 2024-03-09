import { fetchEpisodeBySlugAndNumber } from '@/database/episode';
import CommentForm from './CommentForm';
import { fetchCommentsForEpisode } from '@/database/comment';
import RealTimeComments from './RealTimeComments';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { fetchEmojis } from '@/database/emoji';

interface Props {
  slug: string;
  episodeNumber: string;
}

const CommentsSection = async ({ slug, episodeNumber }: Props) => {
  const session = await getServerSession(authOptions);
  const episode = await fetchEpisodeBySlugAndNumber(slug, episodeNumber);
  const emojis = await fetchEmojis();
  const comments = episode
    ? await fetchCommentsForEpisode(episode?.episode_id)
    : [];

  return (
    <div className="bg-primary flex flex-col gap-3 rounded-lg p-3 mt-5">
      {session?.user?.id ? (
        <CommentForm episodeId={episode?.episode_id!} />
      ) : (
        <p className="text-center py-5">Zaloguj się aby dodać komentarz</p>
      )}
      {comments.length !== 0 ? (
        <RealTimeComments comments={comments} emojis={emojis} />
      ) : (
        <p className="text-center">Brak komentarzy</p>
      )}
    </div>
  );
};

export default CommentsSection;
