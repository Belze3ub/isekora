import BackgroundImage from '@/components/BackgroundImage';
import Breadcrumbs from '@/components/Breadcrumbs';
import CoverImage from '@/components/CoverImage';
import NewestEpisodesFromTranslator from '@/components/NewestEpisodesFromTranslator';
import { fetchAnimeByTranslatorName } from '@/database/anime';
import { fetchNewestEpisodesFromTranslator } from '@/database/episode';
import { fetchTranslatorByName } from '@/database/translator';
import placeholder from '@/public/images/no-image-placeholder.svg';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import TranslatorEpisodesSubscription from './TranslatorEpisodesSubscription';

interface Props {
  params: {
    translatorName: string;
  };
}

const fetchTranslator = cache((translator_name: string) => {
  return fetchTranslatorByName(translator_name);
});

const TranslatorDetailPage = async ({ params: { translatorName } }: Props) => {
  const translator_name = translatorName.replace('%20', ' ');
  const translator = await fetchTranslator(translator_name);
  const translatorAnime = await fetchAnimeByTranslatorName(translator_name);
  const animeCount = translatorAnime.length;
  const newestEpisodes = await fetchNewestEpisodesFromTranslator(
    translator_name,
    10
  );
  if (!translator) notFound();
  return (
    <>
      <TranslatorEpisodesSubscription translatorId={translator.translator_id} />
      <BackgroundImage
        banner={translator?.translator_banner}
        cover={translator?.translator_logo}
        alt={translator?.translator_name}
      />
      <div className="container">
        <div className=" flex flex-wrap py-2">
          <Breadcrumbs title={translator_name} />
        </div>
        <div className="grid gap-5 md:grid-cols-5">
          <div className="gap-5 md:col-span-1 self-start">
            <CoverImage
              src={translator.translator_logo || placeholder}
              alt={
                `Logo grupy suberskiej ${translator.translator_name}` ||
                'Logo nieznanej grupy suberskiej'
              }
              ratioClass="aspect-square"
              radiusClass="rounded-[100vw]"
              centerClass={true}
            />
            <div>
              <h3 className="h3-bold mb-2">Informacje o Tłumaczu</h3>
              <div className="break-all bg-primary flex flex-col gap-3 rounded-lg p-3">
                {translator?.translator_website && (
                  <div>
                    <h4 className="font-bold">Strona</h4>
                    <Link href={translator?.translator_website}>
                      {translator?.translator_website}
                    </Link>
                  </div>
                )}
                {translator?.translator_discord && (
                  <div>
                    <h4 className="font-bold">Discord</h4>
                    <Link href={translator?.translator_discord}>
                      {translator?.translator_discord}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="grid md:col-span-4">
            <div className="">
              <div className="rounded-[100vw] bg-accent p-2 inline-block">
                Przetłumaczone anime: {animeCount}
              </div>
              <h1 className="h1-bold">{translator?.translator_name}</h1>
              <h3 className="h3-semibold mt-4 mb-2">Opis</h3>
              {translator.translator_info ? (
                <p
                  dangerouslySetInnerHTML={{
                    __html: `${translator?.translator_info}`,
                  }}
                />
              ) : (
                <p className="text-center">Brak Opisu</p>
              )}
            </div>
            <div>
              <h3 className="h3-bold mt-4 mb-2">Najnowsze Odcinki</h3>
              {newestEpisodes.length !== 0 ? (
                <NewestEpisodesFromTranslator newestEpisodes={newestEpisodes} />
              ) : (
                <p className="text-center">Brak odcinków</p>
              )}
            </div>
            <h3 className="h3-bold mt-4 mb-2">Wszystkie anime</h3>
            {translatorAnime.length !== 0 ? (
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-3">
                {translatorAnime.map((anime) => (
                  <Link
                    href={`/anime/${anime.title_romaji_slug}`}
                    key={anime.anime_id}
                  >
                    <CoverImage
                      src={anime.cover_extra_large_image || placeholder}
                      alt={
                        `Zdjęcie okładki dla tytułu: ${
                          anime.title_romaji || anime.title_english
                        }` || 'Zdjęcie okładki dla nieznanego tytułu'
                      }
                      title={
                        anime.title_romaji ||
                        anime.title_english ||
                        'Nieznany tytuł'
                      }
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center">Brak odcinków</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export async function generateMetadata({ params }: Props) {
  const translator_name = params.translatorName.replace('%20', ' ');
  const translator = await fetchTranslatorByName(translator_name);
  return {
    title: `Grupa tłumaczy ${translator?.translator_name} - Isekora`,
    description: translator?.translator_info
      ? `${translator?.translator_info}`
      : `Grupa tłumaczy ${translator?.translator_name}`,
  };
}

export default TranslatorDetailPage;
