import CoverImage from '@/components/CoverImage';
import GenreList from '@/components/GenreList';
import PaginationComponent from '@/components/PaginationComponent';
import {
  fetchAnime,
  fetchAnimeFormats,
  fetchTotalPages,
} from '@/database/anime';
import { fetchGenres } from '@/database/genre';
import { Anime } from '@/database/types/types';
import Link from 'next/link';
import placeholder from '@/public/images/no-image-placeholder.svg';
import FormatSelect from '@/components/FormatSelect';
import { Metadata } from 'next';
import AnimeSubscription from './AnimeSubscription';

interface Props {
  searchParams?: {
    page?: string;
    pageSize?: string;
    genres?: string;
    format?: string;
  };
}

const AnimeListPage = async ({ searchParams }: Props) => {
  const page = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.pageSize) || 25;
  const genres = searchParams?.genres ? searchParams.genres.split(',') : [];
  const format = searchParams?.format ? searchParams.format : '';
  let animes: Anime[] = [];

  animes = await fetchAnime('', pageSize, format, genres, page);
  const totalPages = await fetchTotalPages(format, genres, pageSize);
  const allGenres = await fetchGenres();
  const formats = await fetchAnimeFormats();
  return (
    <div className="container">
      <AnimeSubscription />
      <GenreList genres={allGenres} />
      <div className="mb-5">
        <FormatSelect formats={formats} />
      </div>
      {animes.length !== 0 ? (
        <>
          <PaginationComponent page={page} totalPages={totalPages} />
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-3">
            {animes.map((anime, index) => (
              <Link
                href={`/anime/${anime.title_romaji_slug}`}
                key={anime.anime_id}
              >
                <CoverImage
                  src={anime.cover_extra_large_image || placeholder}
                  alt={
                    `Zdjęcie okładki dla tytułu: ${
                      anime.title_romaji || anime.title_english
                    }` || 'Zdjęcie okładki dla nieznanego tytułu'
                  }
                  title={
                    anime.title_romaji ||
                    anime.title_english ||
                    'Nieznany tytuł'
                  }
                  priority={index === 0}
                />
              </Link>
            ))}
          </div>
          <PaginationComponent page={page} totalPages={totalPages} />
        </>
      ) : (
        <p className="text-center mt-5">Nie znaleziono</p>
      )}
    </div>
  );
};

export const metadata: Metadata = {
  title: 'Wszystkie serie anime - Isekora',
  description: 'Lista wszystkich dostępnych serii anime na naszym serwisie'
}

export default AnimeListPage;
