'use client';

import { fetchAnime } from '@/database/anime';
import { Anime } from '@/database/types/types';
import placeholder from '@/public/images/no-image-placeholder.svg';
import { DialogClose } from '@radix-ui/react-dialog';
import _ from 'lodash';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import CoverImage from './CoverImage';

interface Props {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

const SearchResults = ({ searchQuery, setSearchQuery }: Props) => {
  const [anime, setAnime] = useState<Anime[]>([]);
  const fetchData = useCallback(
    _.debounce(async (searchQuery) => {
      const anime = await fetchAnime(searchQuery, 5);
      setAnime(anime);
    }, 1000),
    []
  );

  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery, fetchData]);

  return (
    <div className="bg-primary rounded-lg max-h-[80%] overflow-auto flex flex-col">
      {anime.map((a) => (
        <Link
          href={`/anime/${a.title_romaji_slug}`}
          key={a.anime_id}
          onClick={() => setSearchQuery('')}
        >
          <DialogClose className="flex gap-5 py-2 px-5 items-center border-b hover:bg-secondary w-full">
            <div className="min-w-[3rem] min-h-[3rem]">
              <CoverImage
                src={a.cover_extra_large_image || placeholder}
                alt={a.title_romaji || 'Unknown title'}
                // ratioClass="aspect-square"
              />
            </div>
            <div className="flex flex-col items-start">
              <h4 className="font-bold">{a.title_romaji}</h4>
              <h5>
                {a.episodes} {a.episodes === 1 ? 'odcinek' : 'odcinków'}
              </h5>
            </div>
          </DialogClose>
        </Link>
      ))}
      {anime.length === 0 && searchQuery ? 'Nothing found' : ''}
    </div>
  );
};

export default SearchResults;
