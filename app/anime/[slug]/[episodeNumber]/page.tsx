import EpisodeUrlList from '@/components/EpisodeUrlList';
import { fetchAnimeBySlug } from '@/database/anime';
import { fetchEpisodesBySlug } from '@/database/episode';
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
  const episodes = await fetchEpisodesBySlug(slug);
  if (players.length === 0) notFound();
  return (
    <div className="flex flex-col gap-5">
      <EpisodeUrlList
        slug={slug}
        episodeNumber={episodeNumber}
        players={players}
        episodes={episodes}
      />
    </div>
  );
};

export async function generateMetadata({params}: Props) {
  const dbAnime = await fetchAnimeBySlug(params.slug);
  return {
    title: `Odcinek ${params.episodeNumber} - ${dbAnime?.title_romaji} (ang. ${dbAnime?.title_english}) | Napisy pl`,
    description: `Odcinek ${params.episodeNumber} serii ${dbAnime?.title_romaji} (ang. ${dbAnime?.title_english}) za darmo z polskimi napisami.`,
  };
};

export default EpisodePage;
