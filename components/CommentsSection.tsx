import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { fetchCommentsForEpisode } from '@/database/comment';
import { getServerSession } from 'next-auth';
import Comments from './Comments';
import { Episode } from '@/database/types/types';

interface Props {
  episode: Episode;
}

const CommentsSection = async ({episode }: Props) => {
  const session = await getServerSession(authOptions);
  const initialComments = episode
    ? (await fetchCommentsForEpisode(episode.episode_id)).sort(
        (a, b) =>
          new Date(b.create_date!).getTime() -
          new Date(a.create_date!).getTime()
      )
    : [];

  return (
    <div className="bg-primary flex flex-col gap-3 rounded-lg p-3 mt-5">
      {episode && (
        <Comments
          initialComments={initialComments}
          episodeId={episode?.episode_id}
          session={session}
        />
      )}
    </div>
  );
};

export default CommentsSection;
