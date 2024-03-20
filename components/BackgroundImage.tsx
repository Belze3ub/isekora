import Image from 'next/image';
import React from 'react';

interface Props {
  cover: string | null;
  banner: string | null;
  alt: string | null;
}

const BackgroundImage = ({ cover, banner, alt }: Props) => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 h-[40vh] md:h-[60vh] lg:h-[75vh]">
      {(banner || cover) && (
        <Image
          alt={`Tło dla tytułu: ${alt}`}
          className="object-cover blur-[5px]"
          src={banner || cover || ''}
          fill
          sizes="100vw"
          quality={1}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-background" />
    </div>
  );
};

export default BackgroundImage;
