'use client';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { FaImages, FaPlay } from 'react-icons/fa';
import { Episode } from '@/database/types/types';
import { timestampToDate } from '@/lib/utils';

interface EpisodeProps {
  episode: Episode;
  titleSlug: string;
  title_english: string;
  title_romaji: string;
}

const EpisodeCard = ({
  episode: { episode_number, episode_thumbnail, create_date },
  titleSlug,
  title_english,
  title_romaji,
}: EpisodeProps) => {
  const [imgSrc, setImgSrc] = useState(episode_thumbnail);
  const date = create_date && timestampToDate(create_date);
  return (
    <Link href={`/anime/${titleSlug}/${episode_number}`}>
      <div className="group bg-primary overflow-hidden rounded-xl transition-all hover:bg-secondary">
        <div className="relative w-full aspect-video">
          {imgSrc ? (
            <Image
              src={imgSrc}
              onError={() => setImgSrc(null)}
              fill
              sizes="(max-width: 600px) 100vw, 600px"
              className="object-cover"
              alt={`Miniaturka do odcinka numer ${episode_number} dla tytułu ${title_romaji || title_english}`}
            />
          ) : (
            <div className="absolute z-10 inset-0 place-items-center text-2xl grid">
              <FaImages />
            </div>
          )}
          <div className="absolute z-10 inset-0 place-items-center text-2xl hidden transition-all group-hover:grid">
            <FaPlay />
          </div>
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>
        <div className="p-3">
          <h4 className='font-bold'>Odcinek {episode_number}</h4>
          <h5 className='body-medium text-gray-300'>{date}</h5>
        </div>
      </div>
    </Link>
  );
};

export default EpisodeCard;
