export const dynamic = 'force-dynamic';
import { Anilist, Episode } from '@/database/types/types';
import EpisodeCard from './EpisodeCard';
import NextEpisodeCard from './NextEpisodeCard';

interface Props {
  slug: string;
  anime: Anilist;
  initialEpisodes: Episode[];
}

const EpisodeList = ({ slug, anime, initialEpisodes }: Props) => {
  return (
    <div className="grid gap-3 md:grid-cols-[repeat(2,minmax(100px,500px))] lg:grid-cols-[repeat(3,minmax(100px,500px))] xl:grid-cols-[repeat(4,minmax(100px,500px))]">
      {initialEpisodes
        .sort((a, b) => Number(a.episode_number) - Number(b.episode_number))
        .map((episode) => (
          <EpisodeCard
            key={episode.episode_id}
            episode={episode}
            title_english={anime.title.english}
            title_romaji={anime.title.romaji}
            titleSlug={slug}
          />
        ))}
      {anime.nextAiringEpisode && (
        <NextEpisodeCard
          episodeNumber={anime.nextAiringEpisode.episode}
          timeUntilAiring={anime.nextAiringEpisode.airingAt}
        />
      )}
    </div>
  );
};

export default EpisodeList;
