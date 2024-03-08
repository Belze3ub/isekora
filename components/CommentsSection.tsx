import { fetchEpisodeBySlugAndNumber } from '@/database/episode';
import CommentForm from './CommentForm';
import { fetchCommentsForEpisode } from '@/database/comment';
import RealTimeComments from './RealTimeComments';

interface Props {
  slug: string;
  episodeNumber: string;
}

const CommentsSection = async ({ slug, episodeNumber }: Props) => {
  const episode = await fetchEpisodeBySlugAndNumber(slug, episodeNumber);
  const comments = episode ? await fetchCommentsForEpisode(episode?.episode_id) : [];
  return (
    <div className="bg-primary flex flex-col gap-3 rounded-lg p-3 mt-5">
      <CommentForm episodeId={episode?.episode_id!} />
      {comments.length !== 0 ? (
        <RealTimeComments comments={comments} />
      ) : <p className='text-center'>Brak komentarzy</p>}
    </div>
  );
};

export default CommentsSection;
