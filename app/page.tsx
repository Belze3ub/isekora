import AnimeCarousel from '@/components/AnimeCarousel';
import EpisodeCarousel from '@/components/EpisodeCarousel';
import NewestEpisodesCarousel from '@/components/NewestEpisodesCarousel';
import { SeasonIcon } from '@/components/SeasonIcon';
import TranslatorCarousel from '@/components/TranslatorCarousel';
import { Separator } from '@/components/ui/separator';
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
    <div className="p-[1rem]">
      <div className="text-center">
        <h2 className="h1-bold mb-2 flex items-center justify-center gap-2">
          <SeasonIcon season={season} />
          {translatedSeason} {year}
        </h2>
        <AnimeCarousel anime={anime} />
      </div>
      <Separator
        orientation="horizontal"
        className="my-20 w-[50%] mx-auto h-1 rounded-full"
      />
      <div>
        <h2 className="h1-bold mb-2 text-center">Ostatnio dodane</h2>
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
      <Separator
        orientation="horizontal"
        className="my-20 w-[50%] mx-auto h-1 rounded-full"
      />
      <div>
        <h2 className="h1-bold mb-2 text-center">Grupy Suberskie</h2>
        <TranslatorCarousel translators={translators} />
      </div>
    </div>
  );
}
