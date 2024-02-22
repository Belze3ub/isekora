'use client'
import { Anilist } from '@/database/types/types';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { useSelectedGenres } from '@/contexts/genre';

const AnimeGenresList = ({anime}: {anime: Anilist}) => {
  const {selectedGenres, setSelectedGenres} = useSelectedGenres();
  return (
    <>
      {anime.genres.map((genre) => (
        <Link key={genre} href={`/anime?genres=${selectedGenres}`}>
          <Button onClick={() => setSelectedGenres([genre])}>
            {genre}
          </Button>
        </Link>
      ))}
    </>
  );
}

export default AnimeGenresList