import CoverImage from '@/components/CoverImage';
import GenreList from '@/components/GenreList';
import PaginationComponent from '@/components/PaginationComponent';
import { fetchAnime, fetchTotalPages } from '@/database/anime';
import { fetchGenres } from '@/database/genre';
import { Anime } from '@/database/types/types';
import Link from 'next/link';
import placeholder from '@/public/images/no-image-placeholder.svg';
import FormatSelect from '@/components/FormatSelect';

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

  animes = await fetchAnime(format, genres, page, pageSize);
  const totalPages = await fetchTotalPages(format, genres, pageSize);
  const allGenres = await fetchGenres();
  return (
    <div className="container">
      <GenreList genres={allGenres} />
      <FormatSelect />
      <PaginationComponent
        page={page}
        totalPages={totalPages}
        genres={searchParams?.genres ? searchParams?.genres : ''}
        format={searchParams?.format ? searchParams.format : ''}
      />
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-3">
        {animes.map((anime) => (
          <Link href={`/anime/${anime.title_romaji_slug}`} key={anime.anime_id}>
            <CoverImage
              src={anime.cover_extra_large_image || placeholder}
              alt={anime.title_romaji || anime.title_english || 'Title Unknown'}
              title={
                anime.title_romaji || anime.title_english || 'Title Unknown'
              }
            />
          </Link>
        ))}
      </div>
      <PaginationComponent
        page={page}
        totalPages={totalPages}
        genres={searchParams?.genres ? searchParams?.genres : ''}
        format={searchParams?.format ? searchParams.format : ''}
      />
    </div>
  );
};

export default AnimeListPage;
