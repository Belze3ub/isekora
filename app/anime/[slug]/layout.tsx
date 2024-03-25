import AnimeDetails from '@/components/AnimeDetails';
import BackgroundImage from '@/components/BackgroundImage';
import Breadcrumbs from '@/components/Breadcrumbs';
import CoverImage from '@/components/CoverImage';
import { Button } from '@/components/ui/button';
import { fetchAnimeBySlug } from '@/database/anime';
import fetchAnimeInfo from '@/lib/anilistQuery';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { SiMyanimelist } from 'react-icons/si';
import { SiAnilist } from 'react-icons/si';


interface Props {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

const fetchAnime = cache((slug: string) => {
  return fetchAnimeBySlug(slug);
});

const AnimePageLayout = async ({ children, params: { slug } }: Props) => {
  const dbAnime = await fetchAnime(slug);
  const anime = dbAnime && (await fetchAnimeInfo(dbAnime.anilist_id));
  if (!anime) notFound();
  return (
    <>
      <BackgroundImage
        banner={anime.bannerImage}
        cover={anime.coverImage.extraLarge}
        alt={anime.title.romaji || anime.title.english}
      />
      <div className="container my-5">
        <div className=" flex flex-wrap mb-3">
          <Breadcrumbs title={anime.title.romaji} />
        </div>
        <div className="grid gap-5 md:grid-cols-[auto,1fr]">
          <div className="grid gap-5 self-start">
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
                    <Button className="w-full">
                      <FaYoutube size={20} className="mr-2" />
                      Zwiastun
                    </Button>
                  </a>
                )}
                <a
                  href={`https://myanimelist.net/anime/${anime.idMal}`}
                  target="_blank"
                >
                  <Button className="w-full">
                    <SiMyanimelist size={30} className="mr-2" />
                    MyAnimeList
                  </Button>
                </a>
                <a
                  href={`https://anilist.co/anime/${anime.id}`}
                  target="_blank"
                >
                  <Button className="w-full">
                    <SiAnilist size={20} className="mr-2" />
                    AniList
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="grid">{children}</div>
        </div>
      </div>
    </>
  );
};

export async function generateMetadata({params}: Props) {
  const dbAnime = await fetchAnime(params.slug);
  return {
    title: `${dbAnime?.title_romaji} (ang. ${dbAnime?.title_english}) | Anime z polskimi napisami`,
    description: `Oglądaj ${dbAnime?.title_romaji} (ang. ${dbAnime?.title_english}) za darmo z polskimi napisami. Odkryj fascynujący świat ${dbAnime?.title_romaji} już dziś!`,
  };
};

export default AnimePageLayout;
