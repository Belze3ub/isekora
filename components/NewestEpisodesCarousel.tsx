import { NewestEpisode } from '@/database/types/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import Link from 'next/link';
import CoverImage from './CoverImage';
import placeholder from '@/public/images/no-image-placeholder.svg'

const chunk = (arr: NewestEpisode[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const NewestEpisodesCarousel = ({ episodes }: { episodes: NewestEpisode[] }) => {
  const chunks = chunk(episodes, 12);
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full relative"
    >
      <CarouselContent>
        {chunks.map((chunk, index) => (
          <CarouselItem key={index} className="w-full">
            <div className="grid grid-cols-6 grid-rows-2 gap-2">
              {chunk.map((anime) => (
                <Link
                  href={`/anime/${anime.title_romaji_slug}/${anime.episode_number}`}
                  key={anime.episode_id}
                >
                  <CoverImage
                    src={anime.cover_extra_large_image || placeholder}
                    alt={anime.title_romaji || 'Unknown title'}
                    title={anime.title_romaji || 'Unknown title'}
                    episodeNumber={anime.episode_number}
                  />
                </Link>
              ))}
            </div>
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

export default NewestEpisodesCarousel;
