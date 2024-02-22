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
import { NewestEpisode } from '@/database/types/types';
import placeholder from '@/public/images/no-image-placeholder.svg';

interface Props {
  episodes: NewestEpisode[];
}

const EpisodeCarousel = ({ episodes }: Props) => {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full relative"
    >
      <CarouselContent className="-ml-2">
        {episodes.map((episode) => (
          <CarouselItem
            key={episode.episode_id}
            className="basis-1/2 pl-2 sm:basis-1/3 md:basis-1/5 lg:basis-1/6 xl:basis-1/7"
          >
            <Link href={`/anime/${episode.title_romaji_slug}`}>
              <CoverImage
                src={episode.cover_extra_large_image || placeholder}
                alt={episode.title_romaji || 'Unknown title'}
                title={episode.title_romaji || 'Unknown title'}
                episodeNumber={episode.episode_number}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className="absolute left-2 hover:bg-cyan-300"
        variant="default"
      />
      <CarouselNext
        className="absolute right-1 hover:bg-cyan-300"
        variant="default"
      />
    </Carousel>
  );
};

export default EpisodeCarousel;
