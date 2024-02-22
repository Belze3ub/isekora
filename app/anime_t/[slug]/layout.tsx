import AnimeDetails from "@/components/AnimeDetails";
import BackgroundImage from "@/components/BackgroundImage";
import CoverImage from "@/components/CoverImage";
import { fetchAnimeBySlug } from "@/database/anime";
import fetchAnimeInfo from "@/lib/anilistQuery";
import { notFound } from "next/navigation";

interface Props {
  // anime: Anilist;
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

const AnimePageLayout = async ({ children, params: { slug } }: Props) => {
  const dbAnime = await fetchAnimeBySlug(slug);
  const data = dbAnime && (await fetchAnimeInfo(dbAnime.mal_id));
  const anime = data && data.Media;
  if (!anime) notFound();
  return (
    <>
      <BackgroundImage
        banner={anime.bannerImage}
        cover={anime.coverImage.extraLarge}
        alt={anime.title.romaji || anime.title.english}
      />
      <div className="pt-5">
        {/* <div className="relative flex container flex-wrap py-5">
        <Breadcrumbs title={anime.title.romaji} />
      </div> */}
        <div className="relative grid container md:grid-cols-5 gap-4">
          <div className="grid gap-3 md:col-span-1">
            <CoverImage
              src={anime.coverImage.extraLarge}
              alt={anime.title.romaji || anime.title.english}
            />
            <AnimeDetails anime={anime} />
          </div>
          <div className="md:col-span-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AnimePageLayout;
