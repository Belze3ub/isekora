import AnimeDetails from '@/components/AnimeDetails';
import BackgroundImage from '@/components/BackgroundImage';
import Breadcrumbs from '@/components/Breadcrumbs';
import CoverImage from '@/components/CoverImage';
import { Button } from '@/components/ui/button';
import { fetchAnimeBySlug } from '@/database/anime';
import fetchAnimeInfo from '@/lib/anilistQuery';
import { notFound } from 'next/navigation';
import { FaYoutube } from 'react-icons/fa';
import { SiMyanimelist } from 'react-icons/si';
import { SiAnilist } from 'react-icons/si';


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
      <div className="container">
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
            <div>
              <h4 className="base-medium mb-2">Dodatkowe Informacje</h4>
              <div className="flex flex-col gap-1 rounded-lg">
                {anime && anime.trailer && anime.trailer.site === 'youtube' && (
                  <a
                    href={`https://www.youtube.com/watch?v=${anime.trailer.id}`}
                    target="_blank"
                  >
                    <Button className="w-full hover:bg-secondary">
                      <FaYoutube size={20} className="mr-2" />
                      Zwiastun
                    </Button>
                  </a>
                )}
                <a
                  href={`https://myanimelist.net/anime/${anime.idMal}`}
                  target="_blank"
                >
                  <Button className="w-full hover:bg-secondary">
                    <SiMyanimelist size={30} className="mr-2" />
                    MyAnimeList
                  </Button>
                </a>
                <a
                  href={`https://anilist.co/anime/${anime.id}`}
                  target="_blank"
                >
                  <Button className="w-full hover:bg-secondary">
                    <SiAnilist size={20} className="mr-2" />
                    AniList
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="grid md:col-span-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AnimePageLayout;
