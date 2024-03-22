import { NewestEpisode } from '@/database/types/types';
import placeholder from '@/public/images/no-image-placeholder.svg';
import Link from 'next/link';
import CoverImage from './CoverImage';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

const chunk = (arr: NewestEpisode[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

interface Props {
  episodes: NewestEpisode[];
}

const NewestEpisodesCarousel = ({ episodes }: Props) => {
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
              {chunk.map((anime, i) => (
                <Link
                  href={`/anime/${anime.title_romaji_slug}/${anime.episode_number}`}
                  key={anime.episode_id}
                >
                  <CoverImage
                    src={anime.cover_extra_large_image || placeholder}
                    alt={
                      `Zdjęcie okładki dla tytułu: ${anime.title_romaji}` ||
                      'Zdjęcie okładki dla nieznanego tytułu'
                    }
                    title={anime.title_romaji || 'Nieznany tytuł'}
                    episodeNumber={anime.episode_number}
                    priority={index === 0 && i === 0}
                  />
                </Link>
              ))}
            </div>
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

export default NewestEpisodesCarousel;
