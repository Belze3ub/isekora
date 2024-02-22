import Image from 'next/image';
import React from 'react';

interface Props {
  cover: string | null;
  banner: string | null;
  alt: string | null;
}

const BackgroundImage = ({ cover, banner, alt }: Props) => {
  return (
    // <div className="absolute w-screen aspect-square md:aspect-[2/1] lg:aspect-[3/1] xl:aspect-[4/1] overflow-hidden -z-10">
    <div className="absolute w-full h-[75%] overflow-hidden -z-10">
      {(banner || cover) && (
        <Image
          alt={`Tło dla ${alt}`}
          className="object-cover blur-[5px] "
          src={banner || cover || ''}
          fill
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-background to-90%" />
    </div>
  );
};

export default BackgroundImage;
