import EpisodeUrlList from '@/components/EpisodeUrlList';
import { fetchEpisodeUrls } from '@/database/url';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
    episodeNumber: string;
  };
}

const EpisodePage = async ({ params: { slug, episodeNumber } }: Props) => {
  const players = await fetchEpisodeUrls(slug, episodeNumber);
  if (players.length === 0) notFound();
  return (
    <div className='flex flex-col gap-5'>
      <EpisodeUrlList
        slug={slug}
        episodeNumber={episodeNumber}
        players={players}
      />
    </div>
  );
};

export default EpisodePage;
