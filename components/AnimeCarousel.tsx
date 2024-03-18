import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import Link from 'next/link';
import CoverImage from './CoverImage';
import { Anime } from '@/database/types/types';
import placeholder from '@/public/images/no-image-placeholder.svg';

interface Props {
  anime: Anime[];
}

const AnimeCarousel = ({ anime }: Props) => {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full relative"
    >
      <CarouselContent className="-ml-2">
        {anime.map((anime) => (
          <CarouselItem
            key={anime.anime_id}
            className="basis-1/2 pl-2 sm:basis-1/3 md:basis-1/5 lg:basis-1/6"
          >
            <Link href={`/anime/${anime.title_romaji_slug}`}>
              <CoverImage
                src={anime.cover_extra_large_image || placeholder}
                alt={
                  `Zdjęcie okładki dla tytułu: ${anime.title_romaji}` ||
                  'Zdjęcie okładki dla nieznanego tytułu'
                }
                title={anime.title_romaji || 'Nieznany tytuł'}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className="absolute left-2 hover:bg-accent"
        variant="default"
      />
      <CarouselNext
        className="absolute right-2 hover:bg-accent"
        variant="default"
      />
    </Carousel>
  );
};

export default AnimeCarousel;
