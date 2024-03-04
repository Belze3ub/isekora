import AnimeGenresList from '@/components/AnimeGenresList';
import CoverImage from '@/components/CoverImage';
import EpisodeCard from '@/components/EpisodeCard';
import NextEpisodeCard from '@/components/NextEpisodeCard';
import { fetchAnimeByAnilistId, fetchAnimeBySlug } from '@/database/anime';
import { fetchEpisodesBySlug } from '@/database/episode';
import { RelatedAnime } from '@/database/types/types';
import fetchAnimeInfo from '@/lib/anilistQuery';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

const AnimeDetailPage = async ({ params: { slug } }: Props) => {
  const dbAnime = await fetchAnimeBySlug(slug);
  const anime = dbAnime && (await fetchAnimeInfo(dbAnime.anilist_id));
  const episodes = await fetchEpisodesBySlug(slug);
  if (!anime) notFound();
  const relatedAnime: RelatedAnime[] = [];
  await Promise.all(anime.relations.edges.map(async (edge) => {
    const foundAnime = await fetchAnimeByAnilistId(edge.node.id);
    foundAnime &&
      relatedAnime.push({
        ...edge,
        title_romaji_slug: foundAnime.title_romaji_slug,
      });
  }));
  return (
    <div className="">
      <h1 className="h1-bold">{anime.title.romaji}</h1>
      <h2 className="h2-semibold">{anime.title.english}</h2>
      <h3 className="h3-semibold my-5">Opis anime</h3>
      <p dangerouslySetInnerHTML={{ __html: `${anime.description}` }} />
      <div className="flex gap-1 flex-wrap">
        <AnimeGenresList anime={anime} />
      </div>
      {relatedAnime.length !== 0 && (
        <div>
          <h3 className="h3-bold">Powiązane serie</h3>
          <div className="grid gap-3 md:grid-cols-[repeat(2,minmax(100px,500px))] xl:grid-cols-[repeat(3,minmax(100px,500px))]">
            {relatedAnime.map((anime) => {
              return (
                <Link
                  href={`/anime/${anime.title_romaji_slug}`}
                  key={anime.node.id}
                >
                  <div className="flex bg-primary rounded-lg hover:bg-secondary h-full">
                    <div className="min-w-[5rem] grid items-center">
                      <CoverImage
                        src={anime.node.coverImage.medium}
                        alt={anime.node.title.romaji}
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-slate-300">{anime.relationType}</p>
                      <p className="font-bold line-clamp-2">
                        {anime.node.title.romaji}
                      </p>
                      <p className="line-clamp-2">
                        {anime.node.title.english}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
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
