import AnimeCarousel from '@/components/AnimeCarousel';
import EpisodeCarousel from '@/components/EpisodeCarousel';
import NewestEpisodesCarousel from '@/components/NewestEpisodesCarousel';
import { SeasonIcon } from '@/components/SeasonIcon';
import TranslatorCarousel from '@/components/TranslatorCarousel';
import { fetchAnimeBySeason } from '@/database/anime';
import { fetchNewestEpisodes } from '@/database/episode';
import { fetchTranslators } from '@/database/translator';
import { getCurrentSeasonAndYear, seasonTranslations } from '@/lib/utils';

export default async function Home() {
  const { season, year } = getCurrentSeasonAndYear();
  const translatedSeason = seasonTranslations[season];
  const anime = await fetchAnimeBySeason(season, year);
  const episodes = await fetchNewestEpisodes(36);
  const translators = await fetchTranslators();
  return (
    <>
      <div>
        <h2 className="h1-bold w-full flex justify-center items-center gap-2 mb-2">
          <SeasonIcon season={season} />
          {translatedSeason} {year}
        </h2>
        <AnimeCarousel anime={anime} />
      </div>
      <div>
        <h2 className="h1-bold w-full flex justify-center items-center gap-2 mb-2">
          Ostatnio dodane
        </h2>
        {episodes.length > 12 ? (
          <>
            <div className="hidden lg:block">
              <NewestEpisodesCarousel episodes={episodes} />
            </div>
            <div className="lg:hidden">
              <EpisodeCarousel episodes={episodes} />
            </div>
          </>
        ) : (
          <EpisodeCarousel episodes={episodes} />
        )}
      </div>
      <div>
        <h2 className="h1-bold w-full flex justify-center items-center gap-2 mb-2">
          Grupy Suberskie
        </h2>
        <TranslatorCarousel translators={translators} />
      </div>
    </>
  );
}
