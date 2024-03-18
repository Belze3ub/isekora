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
import { Translator } from '@/database/types/types';
import placeholder from '@/public/images/no-image-placeholder.svg';

interface Props {
  translators: Translator[]
}

const TranslatorCarousel = ({ translators }: Props) => {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full relative"
    >
      <CarouselContent className="-ml-2">
        {translators.map((translator) => (
          <CarouselItem
            key={translator.translator_id}
            className="basis-1/2 pl-2 sm:basis-1/3 md:basis-1/5 lg:basis-1/6 xl:basis-1/7"
          >
            <Link href={`/translators/${translator.translator_name}`}>
              <CoverImage
                src={translator.translator_logo || placeholder}
                alt={
                  `Logo grupy suberskiej ${translator.translator_name}` ||
                  'Logo nieznanej grupy suberskiej'
                }
                title={translator.translator_name || 'Nieznana grupa suberska'}
                ratioClass="aspect-square"
                radiusClass="rounded-[100vw]"
                centerClass={true}
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

export default TranslatorCarousel;
