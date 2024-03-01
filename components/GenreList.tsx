// 'use client';
// import { Genre } from '@/database/types/types';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { useEffect } from 'react';
// import { Toggle } from './ui/toggle';
// import { useSelectedGenres } from '@/contexts/genre';
// import { updateURLParams } from '@/lib/utils';

// const GenreList = ({ genres }: { genres: Genre[] }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { selectedGenres, setSelectedGenres } = useSelectedGenres();
//   const searchParams = useSearchParams();
//   const genre = searchParams.get('genres');

//   useEffect(() => {
//     setSelectedGenres(genre ? [genre] : []);
//   }, [])

//   useEffect(() => {
//     const newParam = { genres: selectedGenres.join(','), page: '' };
//     updateURLParams(router, pathname, newParam);
//   }, [selectedGenres, router, pathname]);

//   const handleToggle = (genre: string) => {
//     if (selectedGenres.includes(genre)) {
//       const newSelectedGenres = selectedGenres.filter(
//         (selectedGenre) => selectedGenre !== genre
//       );
//       setSelectedGenres(newSelectedGenres);
//     } else {
//       setSelectedGenres([...selectedGenres, genre]);
//     }
//   };
//   return (
//     <div className="bg-primary flex flex-wrap gap-2 p-4 rounded-xl my-5">
//       {genres.map(({ genre_id, genre }) => (
//         <Toggle
//           key={genre_id}
//           onClick={() => handleToggle(genre)}
//           className="border"
//           aria-pressed={selectedGenres.includes(genre) ? true : false}
//           data-state={`${selectedGenres.includes(genre) ? 'on' : 'off'}`}
//         >
//           {genre}
//         </Toggle>
//       ))}
//     </div>
//   );
// };

// export default GenreList;
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
    <div className="bg-primary flex flex-wrap gap-2 p-4 rounded-xl my-5">
      {genres.map(({ genre_id, genre }) => (
        <Toggle
          key={genre_id}
          onClick={() => handleToggle(genre)}
          className="border"
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
