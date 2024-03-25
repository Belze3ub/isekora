'use client'
import { Genre } from '@/database/types/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Toggle } from './ui/toggle';
import { updateURLParams } from '@/lib/utils';

const GenreList = ({ genres }: { genres: Genre[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const genresFromQuery = searchParams.get('genres')?.split(',') || [];

  const handleToggle = (genre: string) => {
    let newSelectedGenres;
    if (genresFromQuery.includes(genre)) {
      newSelectedGenres = genresFromQuery.filter(
        (selectedGenre) => selectedGenre !== genre
      );
      updateURLParams(router, pathname, {
        genres: newSelectedGenres.join(','),
        page: '',
      });
    } else {
      newSelectedGenres = [...genresFromQuery, genre];
      updateURLParams(router, pathname, {
        genres: newSelectedGenres.join(','),
        page: '',
      });
    }
  };

  return (
    <div className="bg-primary flex flex-wrap gap-2 p-4 rounded-xl">
      {genres.map(({ genre_id, genre }) => (
        <Toggle
          key={genre_id}
          onClick={() => handleToggle(genre)}
          className="bg-secondary"
          aria-pressed={genresFromQuery.includes(genre) ? true : false}
          data-state={`${genresFromQuery.includes(genre) ? 'on' : 'off'}`}
        >
          {genre}
        </Toggle>
      ))}
    </div>
  );
};

export default GenreList;
