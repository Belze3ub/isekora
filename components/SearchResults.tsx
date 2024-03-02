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
  const [isSearching, setIsSearching] = useState(false);
  const fetchData = useCallback(
    _.debounce(async (searchQuery) => {
      const anime = await fetchAnime(searchQuery, 5);
      setAnime(anime);
      setIsSearching(false);
    }, 1000),
    []
  );

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      fetchData(searchQuery);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery, fetchData]);

  return (
    <div className="bg-primary rounded-lg max-h-[80%] overflow-auto flex flex-col">
      {anime.map((a) => (
        <Link
          href={`/anime/${a.title_romaji_slug}`}
          key={a.anime_id}
          onClick={() => setSearchQuery('')}
        >
          <DialogClose className="flex gap-5 py-2 px-5 items-center hover:bg-secondary w-full">
            <div className="min-w-[3rem] min-h-[3rem]">
              <CoverImage
                src={a.cover_medium_image || placeholder}
                alt={a.title_romaji || 'Unknown title'}
              />
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-left line-clamp-2">{a.title_romaji}</h4>
              <h5 className="text-left truncate">
                {a.episodes} {a.episodes === 1 ? 'odcinek' : 'odcinków'}
              </h5>
            </div>
          </DialogClose>
        </Link>
      ))}
      {anime.length === 0 && (
        <p className="text-center p-2">
          {isSearching
            ? 'Wyszukiwanie...'
            : searchQuery && anime.length === 0
            ? 'Nic nie znaleziono'
            : ''}
        </p>
      )}
    </div>
  );
};

export default SearchResults;
