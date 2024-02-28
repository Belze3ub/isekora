import AnimeDetails from '@/components/AnimeDetails';
import BackgroundImage from '@/components/BackgroundImage';
import Breadcrumbs from '@/components/Breadcrumbs';
import CoverImage from '@/components/CoverImage';
import { fetchAnimeBySlug } from '@/database/anime';
import fetchAnimeInfo from '@/lib/anilistQuery';
import { notFound } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

const AnimePageLayout = async ({ children, params: { slug } }: Props) => {
  const dbAnime = await fetchAnimeBySlug(slug);
  const anime = dbAnime && (await fetchAnimeInfo(dbAnime.anilist_id));
  if (!anime) notFound();
  return (
    <>
      <BackgroundImage
        banner={anime.bannerImage}
        cover={anime.coverImage.extraLarge}
        alt={anime.title.romaji || anime.title.english}
      />
      <div className='container'>
        <div className=" flex flex-wrap py-2">
          <Breadcrumbs title={anime.title.romaji} />
        </div>
        <div className="grid gap-5 md:grid-cols-5">
          <div className="grid gap-5 md:col-span-1 self-start">
            <CoverImage
              src={anime.coverImage.extraLarge}
              alt={anime.title.romaji || anime.title.english}
              priority={true}
            />
            <AnimeDetails anime={anime} />
          </div>
          <div className='grid md:col-span-4'>{children}</div>
        </div>
      </div>
    </>
  );
};

export default AnimePageLayout;
