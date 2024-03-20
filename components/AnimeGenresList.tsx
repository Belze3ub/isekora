'use client';
import { Anilist } from '@/database/types/types';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';

const AnimeGenresList = ({ anime }: { anime: Anilist }) => {
  return (
    <>
      {anime.genres.map((genre) => (
        <Link key={genre} href={`/anime?genres=${genre}`}>
          <Button>{genre}</Button>
        </Link>
      ))}
    </>
  );
};

export default AnimeGenresList;