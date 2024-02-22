import AnimeGenresList from '@/components/AnimeGenresList';
import EpisodeCard from '@/components/EpisodeCard';
import NextEpisodeCard from '@/components/NextEpisodeCard';
import { fetchAnimeBySlug } from '@/database/anime';
import { fetchEpisodesBySlug } from '@/database/episode';
import fetchAnimeInfo from '@/lib/anilistQuery';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

const AnimeDetailPage = async ({ params: { slug } }: Props) => {
  const dbAnime = await fetchAnimeBySlug(slug);
  const anime = dbAnime && (await fetchAnimeInfo(dbAnime.mal_id));
  const episodes = await fetchEpisodesBySlug(slug);
  if (!anime) notFound();
  return (
    <div className="">
      <h1 className="h1-bold">{anime.title.romaji}</h1>
      <h2 className="h2-semibold">{anime.title.english}</h2>
      <h3 className="h3-semibold my-5">Opis anime</h3>
      <p dangerouslySetInnerHTML={{ __html: `${anime.description}` }} />
      <div className="flex gap-1">
        <AnimeGenresList anime={anime} />
      </div>
      <h3 className="font-bold">Odcinki</h3>
      <div className="grid gap-3 md:grid-cols-[repeat(3,minmax(100px,500px))] lg:grid-cols-[repeat(4,minmax(100px,500px))]">
        {episodes.map((episode) => (
          <EpisodeCard
            key={episode.episode_id}
            episode={episode}
            title_english={anime.title.english}
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
    </div>
  );
};

export default AnimeDetailPage;
