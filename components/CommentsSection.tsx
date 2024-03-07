import { fetchEpisodeBySlugAndNumber } from '@/database/episode';
import CommentForm from './CommentForm';
import { fetchCommentsForEpisode } from '@/database/comment';
import Image from 'next/image';
import { timeAgo } from '@/lib/utils';

interface Props {
  slug: string;
  episodeNumber: string;
}

const CommentsSection = async ({ slug, episodeNumber }: Props) => {
  const episode = await fetchEpisodeBySlugAndNumber(slug, episodeNumber);
  const comments = episode && await fetchCommentsForEpisode(episode?.episode_id);
  return (
    <div className="bg-primary flex flex-col gap-3 rounded-lg p-3 mt-5">
      <CommentForm episodeId={episode?.episode_id!} />
      {comments?.map((comment) => (
        <div key={comment.comment_id} className='flex gap-3'>
          <div className="relative w-[30px] h-[30px]  rounded-full overflow-hidden">
            <Image
              src={comment.image}
              fill
              className='object-cover'
              alt={`${comment.name} avatar`}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <div className="flex gap-2 py-1">
              <div className='font-medium'>{comment.name}</div>
              <div className='text-gray-400'>{timeAgo(new Date(comment.update_date!))}</div>
            </div>
            <div>{comment.comment_text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;
