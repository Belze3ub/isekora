import CommentsSection from '@/components/CommentsSection';
import EpisodeUrlList from '@/components/EpisodeUrlList';
import { fetchAnimeBySlug } from '@/database/anime';
import {
  fetchEpisodeBySlugAndNumber,
  fetchEpisodesBySlug,
} from '@/database/episode';
import { fetchEpisodeUrls } from '@/database/url';
import { notFound } from 'next/navigation';
import EpisodeUrlsSubscription from './EpisodeUrlsSubscription';

interface Props {
  params: {
    slug: string;
    episodeNumber: string;
  };
}

const EpisodePage = async ({ params: { slug, episodeNumber } }: Props) => {
  const players = await fetchEpisodeUrls(slug, episodeNumber);
  const episodes = await fetchEpisodesBySlug(slug);
  const episode = await fetchEpisodeBySlugAndNumber(slug, episodeNumber);
  if (players.length === 0) notFound();
  return (
    <div>
      {episode && <EpisodeUrlsSubscription episodeId={episode?.episode_id} />}
      <EpisodeUrlList
        slug={slug}
        episodeNumber={episodeNumber}
        initialPlayers={players}
        episodes={episodes}
      />
      {episode && (
        <CommentsSection
          episode={episode}
        />
      )}
    </div>
  );
};

export async function generateMetadata({ params }: Props) {
  const dbAnime = await fetchAnimeBySlug(params.slug);
  return {
    title: `Odcinek ${params.episodeNumber} - ${dbAnime?.title_romaji} (ang. ${dbAnime?.title_english}) | Napisy pl`,
    description: `Odcinek ${params.episodeNumber} serii ${dbAnime?.title_romaji} (ang. ${dbAnime?.title_english}) za darmo z polskimi napisami.`,
  };
}

export default EpisodePage;
