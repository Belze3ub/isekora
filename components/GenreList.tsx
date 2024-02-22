'use client';
import { Genre } from '@/database/types/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Toggle } from './ui/toggle';
import { useSelectedGenres } from '@/contexts/genre';
import { Params, updateURLParams } from './FormatSelect';

const GenreList = ({ genres }: { genres: Genre[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const format = searchParams.get('format') || '';
  const {selectedGenres, setSelectedGenres} = useSelectedGenres();
  // useEffect(() => {
  //   if (selectedGenres.length === 0) {
  //     router.push(`${pathname}${format ? '?format=' + format : ''}`);
  //   } else {
  //     router.push(`${pathname}?genres=${selectedGenres.join(',')}`);
  //     router.push(
  //       `${pathname}?genres=${selectedGenres}${
  //         format ? '&format=' + format : ''
  //       }`
  //     );
  //   }

  // }, [selectedGenres, router, pathname, format]);

  useEffect(() => {
    const params: Params = { genres: selectedGenres.join(','), format };
    updateURLParams(router, pathname, params);
  }, [selectedGenres, router, pathname, format]);

  
  const handleToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      const newSelectedGenres = selectedGenres.filter(
        (selectedGenre) => selectedGenre !== genre
      );
      setSelectedGenres(newSelectedGenres);
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };
  return (
    <div className="bg-primary flex flex-wrap gap-2 p-4 rounded-xl my-5">
      {genres.map(({ genre_id, genre }) => (
        <Toggle
          key={genre_id}
          onClick={() => handleToggle(genre)}
          className="border"
          aria-pressed={selectedGenres.includes(genre) ? true : false}
          data-state={`${selectedGenres.includes(genre) ? 'on' : 'off'}`}
        >
          {genre}
        </Toggle>
      ))}
    </div>
  );
};

export default GenreList;
