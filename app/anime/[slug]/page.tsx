import AnimeGenresList from '@/components/AnimeGenresList';
import CoverImage from '@/components/CoverImage';
import EpisodeCard from '@/components/EpisodeCard';
import EpisodeList from '@/components/EpisodeList';
import NextEpisodeCard from '@/components/NextEpisodeCard';
import { fetchAnimeByAnilistId, fetchAnimeBySlug } from '@/database/anime';
import { fetchEpisodesBySlug } from '@/database/episode';
import { RecommendedAnime, RelatedAnime } from '@/database/types/types';
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
  const recommendedAnime: RecommendedAnime[] = [];
  await Promise.all(anime.relations.edges.map(async (edge) => {
    const foundAnime = await fetchAnimeByAnilistId(edge.node.id);
    foundAnime &&
      relatedAnime.push({
        ...edge,
        title_romaji_slug: foundAnime.title_romaji_slug,
      });
  }));
  await Promise.all(anime.recommendations.nodes.map(async (node) => {
    const foundAnime = await fetchAnimeByAnilistId(node.mediaRecommendation?.id);
    foundAnime &&
      recommendedAnime.push({
        ...node,
        title_romaji_slug: foundAnime.title_romaji_slug,
      });
  }));
  relatedAnime.sort((a, b) => {
    let titleA = a.node.title.romaji.toLowerCase();
    let titleB = b.node.title.romaji.toLowerCase();
    return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
  });
  recommendedAnime.sort((a: RecommendedAnime, b: RecommendedAnime) => {
    let titleA = a.mediaRecommendation.title.romaji.toLowerCase();
    let titleB = b.mediaRecommendation.title.romaji.toLowerCase();
    return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
  });
  return (
    <div>
      <h1 className="h1-bold">{anime.title.romaji}</h1>
      <h2 className="h2-semibold">{anime.title.english}</h2>
      <h3 className="h3-semibold mt-4 mb-2">Opis</h3>
      <p dangerouslySetInnerHTML={{ __html: `${anime.description}` }} />
      <h3 className="h3-semibold mt-4 mb-2">Gatunki</h3>
      <div className="flex gap-1 flex-wrap">
        <AnimeGenresList anime={anime} />
      </div>
      {relatedAnime.length !== 0 && (
        <div>
          <h3 className="h3-semibold mt-4 mb-2">Powiązane serie</h3>
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
                        alt={
                          `Zdjęcie okładki dla tytułu: ${anime.node.title.romaji}` ||
                          'Zdjęcie okładki dla nieznanego tytułu'
                        }
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-slate-300">{anime.relationType}</p>
                      <p className="font-bold line-clamp-2">
                        {anime.node.title.romaji}
                      </p>
                      <p className="line-clamp-2">{anime.node.title.english}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      <h3 className="h3-bold mt-4 mb-2">Odcinki</h3>
      <EpisodeList slug={slug} anime={anime} initialEpisodes={episodes} />
      {/* <div className="grid gap-3 md:grid-cols-[repeat(2,minmax(100px,500px))] lg:grid-cols-[repeat(3,minmax(100px,500px))] xl:grid-cols-[repeat(4,minmax(100px,500px))]">
        {episodes.map((episode) => (
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
      </div> */}
      {recommendedAnime.length !== 0 && (
        <div>
          <h3 className="h3-semibold mt-4 mb-2">Podobne serie</h3>
          <div className="grid gap-3 md:grid-cols-[repeat(2,minmax(100px,500px))] lg:grid-cols-[repeat(3,minmax(100px,500px))] xl:grid-cols-[repeat(4,minmax(100px,500px))]">
            {recommendedAnime.map((anime) => {
              return (
                <Link
                  href={`/anime/${anime.title_romaji_slug}`}
                  key={anime.mediaRecommendation.id}
                >
                  <div className="flex bg-primary rounded-lg hover:bg-secondary h-full">
                    <div className="min-w-[5rem] grid items-center">
                      <CoverImage
                        src={anime.mediaRecommendation.coverImage.medium}
                        alt={
                          `Zdjęcie okładki dla tytułu: ${anime.mediaRecommendation.title.romaji}` ||
                          'Zdjęcie okładki dla nieznanego tytułu'
                        }
                      />
                    </div>
                    <div className="p-2 w-full flex flex-col justify-between">
                      <div>
                        <p className="font-bold line-clamp-2">
                          {anime.mediaRecommendation.title.romaji}
                        </p>
                        <p className="line-clamp-2">
                          {anime.mediaRecommendation.title.english}
                        </p>
                      </div>
                      <div className="flex flex-between">
                        <p>
                          {anime.mediaRecommendation.format},{' '}
                          {anime.mediaRecommendation.seasonYear}
                        </p>
                        <p>{anime.mediaRecommendation.episodes}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeDetailPage;
