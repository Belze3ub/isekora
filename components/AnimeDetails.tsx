import { Anilist } from '@/database/types/types';
import { SeasonIcon } from './SeasonIcon';
import { seasonTranslations, statusTranslations } from '@/lib/utils';

const AnimeDetails = ({ anime }: { anime: Anilist }) => {
  const translatedSeason = seasonTranslations[anime.season?.toLowerCase()];
  const translatedStatus = statusTranslations[anime.status?.toLowerCase()];
  return (
    <div>
      <h3 className="h3-bold mb-2">Informacje o anime</h3>
      <div className="bg-primary flex flex-col gap-3 rounded-lg p-3">
        {translatedStatus && (
          <div>
            <h4 className="font-bold">Status</h4>
            <div>{translatedStatus}</div>
          </div>
        )}
        {anime.format && (
          <div>
            <h4 className="font-bold">Rodzaj</h4>
            <div>{anime.format}</div>
          </div>
        )}
        {anime.episodes && (
          <div>
            <h4 className="font-bold">Odcinki</h4>
            <div>{anime.episodes}</div>
          </div>
        )}
        {anime.startDate.day && (
          <div>
            <h4 className="font-bold">Początek Emisji</h4>
            <div>
              {`${String(anime.startDate.day).padStart(2, '0')}.${String(
                anime.startDate.month
              ).padStart(2, '0')}.${anime.startDate.year}`}
            </div>
          </div>
        )}
        {anime.endDate.day && (
          <div>
            <h4 className="font-bold">Koniec Emisji</h4>
            <div>
              {`${String(anime.endDate.day).padStart(2, '0')}.${String(
                anime.endDate.month
              ).padStart(2, '0')}.${anime.endDate.year}`}
            </div>
          </div>
        )}
        {anime.season && anime.seasonYear && translatedSeason && (
          <div>
            <h4 className="font-bold">Sezon</h4>
            <div className="flex items-center gap-1">
              <SeasonIcon season={anime.season} />
              {translatedSeason} {anime.seasonYear}
            </div>
          </div>
        )}
        {anime.duration && (
          <div>
            <h4 className="font-bold">Długość odcinków</h4>
            <div>{anime.duration} min</div>
          </div>
        )}
        {anime.averageScore && (
          <div>
            <h4 className="font-bold">Średnia ocena</h4>
            <div>{anime.averageScore}%</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeDetails;
