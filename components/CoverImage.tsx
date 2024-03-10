import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  title?: string;
  episodeNumber?: string;
  ratioClass?: string;
  radiusClass?: string;
  centerClass?: boolean;
  priority?: boolean;
}

const CoverImage = ({
  src,
  alt,
  title,
  episodeNumber,
  ratioClass,
  radiusClass,
  centerClass,
  priority,
}: Props) => {
  return (
    <div
      className={`${
        (title || episodeNumber) && 'group transition-all'
      } relative ${ratioClass ? ratioClass : 'aspect-[2.1/3]'} ${
        radiusClass ? radiusClass : 'rounded-lg'
      } overflow-hidden`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={
          'object-cover transition-all group-hover:blur-[1px] duration-300'
        }
        sizes="(max-width: 768px) 100vw, 33vw"
        priority={priority ? priority : false}
      />
      {title && (
        <>
          <div className="absolute bg-gradient-to-b from-transparent to-black inset-0 opacity-50" />
          <div
            className={`absolute p-2 ${
              centerClass ? 'text-center inset-x-0 bottom-2' : 'bottom-0'
            }`}
          >
            <h3
              className={`font-bold text-sm md:text-md lg:text-md overflow-hidden text-ellipsis group-hover:text-accent duration-300 `}
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              }}
            >
              {title}
            </h3>
            {episodeNumber && (
              <h4>
                Odcinek{' '}
                <span className="text-slate-50 font-bold">{episodeNumber}</span>
              </h4>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CoverImage;
